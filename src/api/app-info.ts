import { http } from '@/utils/http';

export type SearchKey = 'q' | 'regex';

interface GetAppInfoPayloadQueryBase {
  page: number;
  per: number;
}

export type GetAppInfoPayloadQuery =
  | (GetAppInfoPayloadQueryBase & {
      q: string;
    })
  | {
      regex: string;
    };

export interface GetAppInfoMetadata {
  page: number;
  per: number;
  total: number;
}

export interface GetAppInfoItem {
  id: string;
  appName: string;
  packageName: string;
  activityName: string;
  tags: {
    id: string;
    name: string;
  };
}

export interface GetAppInfoResponse {
  metadata: GetAppInfoMetadata;
  items: GetAppInfoItem[];
}

export const appInfo = {
  getAppInfo(payload: GetAppInfoPayloadQuery) {
    return http.get<GetAppInfoResponse>('/api/appinfo', {
      params: payload,
    });
  },
};
