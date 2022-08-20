export interface SearchModel {
  metadata: SearchMetadataModel;
  items: SearchItemModel[];
}

export interface SearchItemModel {
  appName: string;
  packageName: string;
  activityName: string;
  id: string;
  signature: string;
  count: number;
}

export interface SearchMetadataModel {
  page: number;
  per: number;
  total: number;
}

export interface IconMetaModel {
  image: string;
  name: string;
  url: string;
}
