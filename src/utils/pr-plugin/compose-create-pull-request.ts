import type { Octokit } from '@octokit/core'
import type { Changes, Options, State } from './types'

import { createTree } from './create-tree'
import { createCommit } from './create-commit'

export async function composeCreatePullRequest(
  octokit: Octokit,
  {
    owner,
    repo,
    title,
    body,
    base,
    head,
    createWhenEmpty,
    changes: changesOption,
    draft = false,
    forceFork = false,
    update = false,
  }: Options
) {
  if (head === base) {
    throw new Error('[octokit-plugin-create-pull-request] "head" cannot be the same value as "base"')
  }
  const changes = Array.isArray(changesOption) ? changesOption : [changesOption]

  if (changes.length === 0) throw new Error('[octokit-plugin-create-pull-request] "changes" cannot be an empty array')

  const state: State = { octokit, owner, repo }

  // https://developer.github.com/v3/repos/#get-a-repository
  const { data: repository, headers } = await octokit.request('GET /repos/{owner}/{repo}', {
    owner,
    repo,
  })

  const isUser = !!headers['x-oauth-scopes']

  if (!repository.permissions) {
    throw new Error('[octokit-plugin-create-pull-request] Missing authentication')
  }

  if (!base) {
    base = repository.default_branch
  }

  state.ownerOrFork = owner

  if (forceFork || (isUser && !repository.permissions.push)) {
    // https://developer.github.com/v3/users/#get-the-authenticated-user
    const user = await octokit.request('GET /user')

    // https://developer.github.com/v3/repos/forks/#list-forks
    const forks = await octokit.request('GET /repos/{owner}/{repo}/forks', {
      owner,
      repo,
    })
    const hasFork = forks.data.find(
      /* istanbul ignore next - fork owner can be null, but we don't test that */
      (fork) => fork.owner && fork.owner.login === user.data.login
    )

    if (!hasFork) {
      // https://developer.github.com/v3/repos/forks/#create-a-fork
      await octokit.request('POST /repos/{owner}/{repo}/forks', {
        owner,
        repo,
      })
    }

    state.ownerOrFork = user.data.login
  }

  // https://developer.github.com/v3/repos/commits/#list-commits-on-a-repository
  const {
    data: [latestCommit],
  } = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner,
    repo,
    sha: base,
    per_page: 1,
  })
  state.latestCommitSha = latestCommit.sha
  state.latestCommitTreeSha = latestCommit.commit.tree.sha
  const baseCommitTreeSha = latestCommit.commit.tree.sha

  for (const change of changes) {
    let treeCreated = false
    if (change.files && Object.keys(change.files).length) {
      const latestCommitTreeSha = await createTree(state as Required<State>, change as Required<Changes>)

      if (latestCommitTreeSha) {
        state.latestCommitTreeSha = latestCommitTreeSha
        treeCreated = true
      }
    }

    if (treeCreated || change.emptyCommit !== false) {
      state.latestCommitSha = await createCommit(state as Required<State>, treeCreated, change)
    }
  }

  const hasNoChanges = baseCommitTreeSha === state.latestCommitTreeSha
  if (hasNoChanges && createWhenEmpty === false) {
    return null
  }

  const branchInfo: {
    repository: {
      ref: {
        associatedPullRequests: {
          edges: [
            {
              node: {
                url: string
                number: number
              }
            }
          ]
        }
      }
    }
  } = await octokit.graphql(
    `
    query ($owner: String!, $repo: String!, $head: String!) {
      repository(name: $repo, owner: $owner) {
        ref(qualifiedName: $head) {
          associatedPullRequests(first: 1, states: OPEN) {
            edges {
              node {
                id
                number
                url
              }
            }
          }
        }
      }
    }`,
    {
      owner: state.ownerOrFork,
      repo,
      head,
    }
  )

  const branchExists = !!branchInfo.repository.ref
  const existingPullRequest = branchInfo.repository.ref?.associatedPullRequests?.edges?.[0]?.node

  if (existingPullRequest && !update) {
    throw new Error(
      `[octokit-plugin-create-pull-request] Pull request already exists: ${existingPullRequest.url}. Set update=true to enable updating`
    )
  }

  if (branchExists) {
    // https://docs.github.com/en/rest/git/refs#update-a-reference
    await octokit.request('PATCH /repos/{owner}/{repo}/git/refs/{ref}', {
      owner: state.ownerOrFork,
      repo,
      sha: state.latestCommitSha,
      ref: `heads/${head}`,
      force: true,
    })
  } else {
    // https://developer.github.com/v3/git/refs/#create-a-reference
    await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
      owner: state.ownerOrFork,
      repo,
      sha: state.latestCommitSha,
      ref: `refs/heads/${head}`,
    })
  }

  const pullRequestOptions = {
    owner,
    repo,
    head: `${state.ownerOrFork}:${head}`,
    base,
    title,
    body,
    draft,
  }

  if (existingPullRequest) {
    // https://docs.github.com/en/rest/pulls/pulls#update-a-pull-request
    return await octokit.request('PATCH /repos/{owner}/{repo}/pulls/{pull_number}', {
      pull_number: existingPullRequest.number,
      ...pullRequestOptions,
    })
  } else {
    // https://developer.github.com/v3/pulls/#create-a-pull-request
    return await octokit.request('POST /repos/{owner}/{repo}/pulls', pullRequestOptions)
  }
}
