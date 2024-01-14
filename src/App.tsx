import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ItemData } from './interfaces';
import { ItemStatus } from './types';
import Column from './Column';
import './App.scss';

function App() {
  const initialItemsState = JSON.parse(window.localStorage.getItem('projectTodos') || '[]');
  const columnStatuses = ['open', 'in_progress', 'done'];
  const [items, setItems] = useState<ItemData[]>(initialItemsState);

  useEffect(() => {
    window.localStorage.setItem('projectTodos', JSON.stringify(items));
  }, [items]);

  function handleItemDrop(itemId: string, status: string): void {
    setItems(items.map(item => {
      if (item.id === itemId) {
        item.status = status as ItemStatus;
      }

      return item;
    }));
  }

  function handleItemEdit(editedItem: ItemData) {
    setItems(items.map(item => {
      if (editedItem.id === item.id) {
        return editedItem;
      }

      return item;
    }));
  }

  function handleItemDelete(deleteItem: ItemData) {
    setItems(items.filter(item => item.id !== deleteItem.id));
  }

  function handleCreateClick() {
    const item: ItemData = {
      id: uuidv4(),
      title: '{placeholder_title}',
      description: '{placeholder_description}',
      status: 'open',
      priority: 'low',
    };

    setItems([...items, item]);
  }

  return (
    <div className="app">
      <header className="header">
        <button
          className="createButton"
          onClick={handleCreateClick}
        >
          <FontAwesomeIcon
            className="createButton__icon"
            icon={faPlus}
          />
          
          Create new item
        </button>
      </header>

      <div className="columns">
        {columnStatuses.map(columnStatus => {
          return <Column
            status={columnStatus as ItemStatus}
            key={columnStatus}
            items={items}
            onItemDrop={handleItemDrop}
            onItemEdit={handleItemEdit}
            onItemDelete={handleItemDelete}
          />;
        })}
      </div>
    </div>
  );
}

export default App;
