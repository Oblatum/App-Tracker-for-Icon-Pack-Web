import { Component } from 'vue';

export interface ContextMenuConfBaseRecordModel {
  label: string | Component;
  binding?: any;
  onclick?: (...args: any[]) => void;
  type?: 'default' | 'custom';
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
