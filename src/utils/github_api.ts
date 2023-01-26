import { Octokit } from '@octokit/core'
import { createPullRequest } from './pr-plugin'
import { Changes } from './pr-plugin/types'

const MyOctokit = Octokit.plugin(createPullRequest)
let token = '<personal access token>'
const octokit = new MyOctokit({
  auth: token,
})

export function uploadFileApi(changes: Changes[]) {

  octokit
    .createPullRequest({
      owner: 'Uniswap',
      repo: 'default-token-list',
      title: 'test pr 2',
      body: 'test',
      head: 'test-octokit',
      base: 'main' /* optional: defaults to default branch */,
      update: true /* optional: set to `true` to enable updating existing pull requests */,
      forceFork: false /* optional: force creating fork even when user has write rights */,
      changes: changes,
    })
    .then((pr) => console.log(pr?.data.number))
}
