import { ItemPriority, ItemStatus } from './types';

export interface ItemData {
  id: number;
  title: string;
  description: string;
  status: ItemStatus;
  priority: ItemPriority;
}