import { PropsWithChildren, useState } from 'react';
import { ItemData } from './interfaces';
import { ItemPriority, ItemStatus } from './types';
import Item from './Item';
import './Column.scss';

interface ColumnProps extends PropsWithChildren {
  items: ItemData[];
  status: ItemStatus;
  onItemDrop: (itemId: string, status: string) => void;
  onItemEdit: (item: ItemData) => void;
  onItemDelete: (item: ItemData) => void;
};

const Column = (props: ColumnProps) => {
  const filteredItems = props.items.filter(item => item.status === props.status);
  const sortedItems = [...filteredItems].sort(sortByPriority);
  const [showDropPlaceholder, setShowDropPlaceholder] = useState(false);

  function handleDragEnter(event: React.DragEvent<HTMLDivElement>) {
    setShowDropPlaceholder(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    setShowDropPlaceholder(false);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    const itemId = event.dataTransfer.getData('itemId');

    event.preventDefault();
    props.onItemDrop(itemId, props.status);

    setShowDropPlaceholder(false);
  }

  function sortByPriority(a: ItemData, b: ItemData) {
    const priorities: ItemPriority[] = ['low', 'medium', 'high'];
    const indexA = priorities.indexOf(a.priority);
    const indexB = priorities.indexOf(b.priority);

    if (indexA < indexB) {
      return 1;
    }
    
    if (indexA > indexB) {
      return -1;
    }

    return 0;
  }

  return (
    <div className="column">
      <div className="column__title">
        {props.status.replace('_', ' ')} ({ filteredItems.length })
      </div>

      <div
        className={`column__dropZone ${showDropPlaceholder ? 'column__dropZone--active' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {sortedItems.map(item => {
          return <Item
            className="column__item"
            key={item.id}
            data={item}
            status={props.status}
            onItemEdit={props.onItemEdit}
            onItemDelete={props.onItemDelete}
          />
        })}
      </div>
    </div>
  );
};

export default Column;