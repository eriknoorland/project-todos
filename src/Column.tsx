import { PropsWithChildren, useState } from 'react';
import { ItemData } from './interfaces';
import Item from './Item';
import { ItemStatus } from './types';
import './Column.scss';

interface ColumnProps extends PropsWithChildren {
  items: ItemData[];
  status: ItemStatus;
  onItemDrop: (itemId: string, status: string) => void;
  onItemEdit: (item: ItemData) => void;
};

const Column = (props: ColumnProps) => {
  const filteredItems = props.items.filter(item => item.status === props.status);
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

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="column"
    >
      <div className="column__title">
        {props.status} ({ filteredItems.length })
      </div>

      {filteredItems.map(item => {
        return <Item
          key={item.id}
          data={item}
          status={props.status}
          onItemEdit={props.onItemEdit}
        />
      })}

      {showDropPlaceholder &&
        <div className="column__dropPlaceholder">
          Move item to {props.status}
        </div>
      }
    </div>
  );
};

export default Column;