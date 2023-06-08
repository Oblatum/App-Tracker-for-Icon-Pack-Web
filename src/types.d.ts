interface ResItem {
  count: number;
  appName: string;
  activityName: string;
  packageName: string;
  signature: string;
  id: string;
}
interface ResMetadata {
  total: number;
  page: number;
  per: number;
}
export interface appInfoJSON {
  items: ResItem[];
  metadata: ResMetadata;
}
