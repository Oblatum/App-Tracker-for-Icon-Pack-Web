declare module SearchAPIResData {
  export interface ResItem {
    count: number;
    appName: string;
    activityName: string;
    packageName: string;
    signature: string;
    id: string;
  }
  export interface ResMetadata {
    total: number;
  }
  export interface ResRootObject {
    items: ResItem[];
    metadata: ResMetadata;
  }

  export interface IconRootObject {
    image: string;
    name: string;
    url: string;
}
}
