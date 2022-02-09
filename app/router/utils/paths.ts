import {
  DecodedSearchParams,
  encodeSearchParams
} from "app/search/utils/search-params"

export function workspacesPath() {
  return "/workspaces"
}

export function workspacePath(id: string) {
  return `/workspaces/${id}`
}

export function lakeImportPath(workspaceId: string) {
  return `${workspacePath(workspaceId)}/lakes/import`
}

export function lakePath(id: string, workspaceId: string) {
  return `${workspacePath(workspaceId)}/lakes/${id}`
}

type Params = Partial<DecodedSearchParams>
export function poolSearchPath(
  id: string,
  lakeId: string,
  params: Params = {}
) {
  return `${lakePath(id, lakeId)}/search?${encodeSearchParams(params)}`
}

export function releaseNotesPath(workspaceId) {
  if (workspaceId) {
    return `${workspacePath(workspaceId)}/release-notes`
  } else {
    return "/release-notes"
  }
}
