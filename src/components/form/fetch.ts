import { get } from "@/plugins/axios";

export interface ResultMeta {
  page: number
  per: number
  total: number
}

export interface ResultItem {
  activityName: string
  appName: string
  count: number
  id: string
  packageName: string
  signature: string
}

export interface ResultData {
  metadata: ResultMeta
  items: ResultItem[]
}

export async function getSearch({q}: {q: string}): Promise<ResultData> {
  return await get('/api/appInfo', {
    q
  })
}

export async function getRegex({regex}: {regex: string}): Promise<ResultData> {
  return await get('/api/appInfo', {
    regex
  })
}

export async function getSignature({signature}: {signature: string}): Promise<ResultData> {
  return await get(`/api/${signature}/appInfo`, {})
}

export async function getAll(): Promise<ResultData> {
  return await get('/api/appInfo', {})
}

