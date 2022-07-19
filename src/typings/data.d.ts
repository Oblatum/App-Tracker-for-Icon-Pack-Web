export interface IResultItem {
  activityName: string
  appName: string
  count: number
  id: string
  packageName: string
  signature: string
}

export interface IResultMetaData {
  page: number
  per: number
  total: number
}

export interface IResultData {
  items: IResultItem[]
  metadata: IResultMetaData
}