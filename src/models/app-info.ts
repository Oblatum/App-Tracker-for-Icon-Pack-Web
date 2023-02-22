export declare namespace GetAppInfo {
  interface Payload {
    q?: string;
    regex?: string;
    page: number;
    per: number;
  }

  interface Item {
    id: string;
    appName: string;
    packageName: string;
    activityName: string;
    requests: {
      appInfo: {
        id: string;
      };
      id: string;
      count: number;
      fromIconPack: {
        id: string;
      };
    }[];
    tags: {
      id: string;
      name: string;
    }[];
    suggestedName: string;
    count: number;
    createdAt: string;
    updatedAt: string;
  }

  interface Metadata {
    page: number;
    per: number;
    total: number;
  }

  interface Response {
    metadata: Metadata;
    items: Item[];
  }
}
