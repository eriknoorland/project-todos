import { ItemStatus } from './types';

export interface ItemData {
  id: number;
  title: string;
  description: string;
  status: ItemStatus;
}