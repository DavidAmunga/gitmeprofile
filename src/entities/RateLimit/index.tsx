export interface Core {
  limit: number
  remaining: number
  reset: number
  used: number
  resource: string
}

export interface Graphql {
  limit: number
  remaining: number
  reset: number
  used: number
  resource: string
}

export interface IntegrationManifest {
  limit: number
  remaining: number
  reset: number
  used: number
  resource: string
}

export interface Search {
  limit: number
  remaining: number
  reset: number
  used: number
  resource: string
}

export interface Resources {
  core: Core
  graphql: Graphql
  integration_manifest: IntegrationManifest
  search: Search
}

export interface Rate {
  limit: number
  remaining: number
  reset: number
  used: number
  resource: string
}

export interface RateLimit {
  resources: Resources
  rate: Rate
}
