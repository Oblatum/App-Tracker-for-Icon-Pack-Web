export interface ContextMenuConfBaseRecordModel {
  label: string;
  action: (...args: any[]) => void;
}

export interface ContextMenuConfGroupRecordModel {
  title: string;
  items: ContextMenuConfBaseRecordModel[];
}

// TODO 优化点
export interface ContextMenuConfModel {
  [index: number]:
    | ContextMenuConfBaseRecordModel
    | ContextMenuConfGroupRecordModel;
}

export interface ElPosModel {
  x: number;
  y: number;
  origin: string;
}
