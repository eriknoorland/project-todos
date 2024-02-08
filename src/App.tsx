import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ItemData, ItemStatus, ItemType } from './types';
import CreateItemModal from './components/CreateItemModal';
import Column from './components/Column';
import Button from './components/Button';
import Filter from './components/Filter';
import itemTypes from './data/itemTypes.json';
import './App.scss';

function App() {
  const columnStatuses = ['open', 'in_progress', 'done'];
  const initialItemsState = JSON.parse(window.localStorage.getItem('projectTodos') || '[]');
  const [items, setItems] = useState<ItemData[]>(initialItemsState);
  const [selectedFilters, setSelectedFilters] = useState<ItemType[]>([]);
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('projectTodos', JSON.stringify(items));
  }, [items]);

  const handleFilterChange = useCallback((filters: ItemType[]) => {
    setSelectedFilters(filters);
  }, [setSelectedFilters]);

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

  function handleItemAdd(item: ItemData) {
    setItems([...items, item]);
    setIsCreateItemModalOpen(false);
  }

  function handleCreateItemCancel() {
    setIsCreateItemModalOpen(false);
  }

  function handleCreateClick() {
    setIsCreateItemModalOpen(true);
  }

  function handleCreateItemModalClose() {
    setIsCreateItemModalOpen(false);
  }

  const filteredItems = items.filter(({ type }) => {
    if (!selectedFilters.length) {
      return true;
    }

    return selectedFilters.includes(type);
  });

  return (
    <div className="app">
      <header className="header">
        <Button
          modifiers="action"
          className="createButton"
          onClick={handleCreateClick}
          data-testid="createButton"
        >
          <FontAwesomeIcon
            className="createButton__icon"
            icon={faPlus}
          />
          
          Create new item
        </Button>

        <Filter
          types={itemTypes}
          onChange={handleFilterChange}
        />
      </header>

      <div className="columns">
        {columnStatuses.map(columnStatus => {
          return <Column
            status={columnStatus as ItemStatus}
            key={columnStatus}
            items={filteredItems}
            onItemDrop={handleItemDrop}
            onItemEdit={handleItemEdit}
            onItemDelete={handleItemDelete}
          />;
        })}
      </div>

      <CreateItemModal
        isOpen={isCreateItemModalOpen}
        onClose={handleCreateItemModalClose}
        onItemAdd={handleItemAdd}
        onCancel={handleCreateItemCancel}
      />
    </div>
  );
}

export default App;
