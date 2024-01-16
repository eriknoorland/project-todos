export type ItemStatus = 'open' | 'in_progress' | 'done';

export type ItemPriority = 'low' | 'medium' | 'high';

export interface ItemData {
  id: string;
  title: string;
  description: string;
  status: ItemStatus;
  priority: ItemPriority;
}