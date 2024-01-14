import { ItemPriority, ItemStatus } from './types';

export interface ItemData {
  id: string;
  title: string;
  description: string;
  status: ItemStatus;
  priority: ItemPriority;
}