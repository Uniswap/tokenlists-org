import type { Octokit } from "@octokit/core";

import { composeCreatePullRequest } from "./compose-create-pull-request";
import { VERSION } from "./version";
import type * as Types from "./types";

/**
 * @param octokit Octokit instance
 */
export function createPullRequest(octokit: Octokit) {
  return {
    createPullRequest: composeCreatePullRequest.bind(null, octokit),
  };
}

export { composeCreatePullRequest } from "./compose-create-pull-request";

createPullRequest.VERSION = VERSION;

export namespace createPullRequest {
  export type Options = Types.Options;
  export type Changes = Types.Changes;
  export type File = Types.File;
  export type UpdateFunctionFile = Types.UpdateFunctionFile;
  export type UpdateFunction = Types.UpdateFunction;
}
