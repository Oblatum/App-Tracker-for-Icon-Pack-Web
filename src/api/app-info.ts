import { GetAppInfo } from '@/models/app-info';
import http from '@/utils/http';

export const appInfoApi = {
  async getAppInfo(payload: GetAppInfo.Payload) {
    return http.get<GetAppInfo.Response>('/api/appinfo', { params: payload });
  },
};
