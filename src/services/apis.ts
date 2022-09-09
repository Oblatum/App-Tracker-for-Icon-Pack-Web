import { API_URL } from '@/constants/meta';
import type { IconMetaModel, SearchModel } from '@/models/data';
import { get } from './base';

export const searchApi = {
  keyword(q: string, page: number, per = 10) {
    return get<SearchModel>(`${API_URL}/api/appInfo`, {
      params: {
        q,
        page,
        per,
      },
    });
  },

  regex(regex: string, page: number, per = 10) {
    return get<SearchModel>(`${API_URL}/api/appInfo`, {
      params: {
        regex,
        page,
        per,
      },
    });

    // TODO signature
  },

  view(page: number, per = 10) {
    return get<SearchModel>(`${API_URL}/api/appInfo`, {
      params: {
        page,
        per,
      },
    });
  },
};

export const iconApi = {
  meta(appId: string) {
    return get<IconMetaModel>(`${API_URL}/api/icon`, {
      params: {
        appId,
      },
    });
  },
};
