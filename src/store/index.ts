import type { IResultData } from '@/typings/data';
import { defineStore } from 'pinia';

export const useStore = defineStore('root', {
  state: () => {
    return {
      __IS_FIRST_TIME: true,
      __LAST_SEARCH_TYPE: '',
      __LAST_KEYWORD: '',
      __LAST_SIGNATURE: '',
      __LAST_RESULT_DATA:  {
        items: [{
          activityName: '',
          appName: '',
          count: 0,
          id: '',
          packageName: '',
          signature: ''
        }],
        metadata: {
          page: 0,
          per: 0,
          total: 0
        }
      }
    }
  },
  actions: {
    updateSearchOptions(type: string, data: IResultData, keyword?: string, signature?: string) {
      this.__LAST_SEARCH_TYPE = type
      this.__LAST_KEYWORD = keyword!
      this.__LAST_SIGNATURE = signature!
      this.__LAST_RESULT_DATA = data
    }
  }
});
