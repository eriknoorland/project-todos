import { useState } from 'react';
import { ItemData, ItemPriority, ItemStatus } from '../types';
import Item from './Item';
import makeSortItemsByPriority from '../utils/makeSortItemsByPriority';
import itemPriorities from '../data/itemPriorities.json';
import './Column.scss';

interface ColumnProps {
  items: ItemData[];
  status: ItemStatus;
  onItemDrop: (itemId: string, status: string) => void;
  onItemEdit: (item: ItemData) => void;
  onItemDelete: (item: ItemData) => void;
};

const Column = (props: ColumnProps) => {
  const sortItemsByPriority = makeSortItemsByPriority(itemPriorities.map(p => p.value as ItemPriority));
  const filteredItems = props.items.filter(item => item.status === props.status);
  const sortedItems = filteredItems.sort(sortItemsByPriority);
  const [showDropPlaceholder, setShowDropPlaceholder] = useState(false);

  function handleDragEnter() {
    setShowDropPlaceholder(true);
  }

  function handleDragLeave() {
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

  return (
    <div
      className="column"
      data-testid="column"
    >
      <div
        className="column__title"
        data-testid="columnTitle"
      >
        {props.status.replace('_', ' ')} ({ sortedItems.length })
      </div>

      <div
        className={`column__dropZone ${showDropPlaceholder ? 'column__dropZone--active' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-testid="columnDropZone"
      >
        {sortedItems.map(item => {
          return <Item
            className="column__item"
            key={item.id}
            data={item}
            onItemEdit={props.onItemEdit}
            onItemDelete={props.onItemDelete}
          />
        })}
      </div>
    </div>
  );
};

export default Column;