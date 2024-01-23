export type ItemType = 'task' | 'feature' | 'bug';

export type ItemStatus = 'open' | 'in_progress' | 'done';

export type ItemPriority = 'low' | 'medium' | 'high';

export interface ItemData {
  id: string;
  title: string;
  description: string;
  type: ItemType;
  status: ItemStatus;
  priority: ItemPriority;
}

export type ItemFormData = Pick<ItemData, 'title' | 'description' | 'priority' | 'type'>;