export interface ListDataRecordModel {
  id: string;
  info: ListDataInfoRecordModel;
}

export interface ListDataInfoRecordModel {
  appName: string;
  packageName: string;
  activityName: string;
  id: string;
  appFilter: string;
}
