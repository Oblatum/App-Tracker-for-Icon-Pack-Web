import { get } from './base';

const commonConfig = {
  per: 2147483647,
  page: 1
}

export async function keySearch(q: string) {
  return get('/api/appInfo', {
    params: {
      ...commonConfig,
      q
    }
  })
}

export async function regSearch(regex: string) {
  return get('/api/appInfo', {
    params: {
      ...commonConfig,
      regex
    }
  })
}

export async function viewSearch() {
  return get('/api/appInfo', {
    params: {
      ...commonConfig
    }
  })
}

export async function sigSearch(q: string, sig: string) {
  return get(`/api/${sig}appInfo`, {
    params: {
      ...commonConfig,
      q
    }
  })
}

export async function reqIcon(appId: string) {
  return get('/api/icon', {
    params: {
      ...commonConfig,
      appId
    }
  })
}