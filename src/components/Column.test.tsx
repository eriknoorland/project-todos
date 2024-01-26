import { cleanup, render, screen } from '@testing-library/react';
import Column from './Column';
import { ItemData } from '../types';

afterEach(() => {
  cleanup();
});

test('should render the column component', () => {
  render(
    <Column
      items={[]}
      status="open"
      onItemDrop={() => {}}
      onItemEdit={() => {}}
      onItemDelete={() => {}}
    />
  );
  
  const columnElement = screen.getByTestId('column');
  expect(columnElement).toBeInTheDocument();
});

test('should render the correct title based on the given status', () => {
  render(
    <Column
      items={[]}
      status="open"
      onItemDrop={() => {}}
      onItemEdit={() => {}}
      onItemDelete={() => {}}
    />
  );

  const columnTitleElement = screen.getByTestId('columnTitle');
  expect(columnTitleElement).toHaveTextContent('open (0)');
});

test('should render an item in the column', () => {
  const items: ItemData[] = [
    {
      id: 'uid-1',
      title: 'Item 1',
      description: 'Item description 1',
      type: 'task',
      status: 'open',
      priority: 'low',
    }
  ];

  render(
    <Column
      items={items}
      status="open"
      onItemDrop={() => {}}
      onItemEdit={() => {}}
      onItemDelete={() => {}}
    />
  );
  
  const itemElement = screen.getByTestId('item-uid-1');
  expect(itemElement).toBeInTheDocument();
});

// FIXME this test is currently not working because of jsdom limitations regarding dataTransfer.getData
test('should render call the drop handle function once when an item is dropped into this column', () => {
  const items: ItemData[] = [
    {
      id: 'uid-1',
      title: 'Item 1',
      description: 'Item description 1',
      type: 'task',
      status: 'open',
      priority: 'low',
    }
  ];

  const handleItemDrop = jest.fn();

  render(
    <Column
      items={items}
      status="open"
      onItemDrop={handleItemDrop}
      onItemEdit={() => {}}
      onItemDelete={() => {}}
    />
  );
  
  const columnDropZoneElement = screen.getByTestId('columnDropZone');


  // fireEvent.drop(columnDropZoneElement, {
  //   dataTransfer: { itemId: 'uid-1' },
  // });

  // expect(handleItemDrop).toHaveBeenCalledTimes(1);
});
