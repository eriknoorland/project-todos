import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Item from './Item';
import { ItemData } from '../types';

const openItemData: ItemData = {
  id: 'uid-1',
  title: 'Lorem',
  description: 'Ipsum',
  type: 'feature',
  status: 'open',
  priority: 'low',
};

afterEach(() => {
  cleanup();
});

test('should render the item component', () => {
  render(<Item
    data={openItemData}
    onItemEdit={() => {}}
    onItemDelete={() => {}}
  />);

  const itemElement = screen.getByTestId('item');
  expect(itemElement).toBeInTheDocument();
});

test('should render the item title', () => {
  render(<Item
    data={openItemData}
    onItemEdit={() => {}}
    onItemDelete={() => {}}
  />);
  
  const itemTitleElement = screen.getByTestId('itemTitle');
  expect(itemTitleElement).toHaveTextContent('Lorem');
});

test('should render the item description', () => {
  render(<Item
    data={openItemData}
    onItemEdit={() => {}}
    onItemDelete={() => {}}
  />);
  
  const itemDescriptionElement = screen.getByTestId('itemDescription');
  expect(itemDescriptionElement).toHaveTextContent('Ipsum');
});

test('should call the delete handle function once', () => {
  const handleDelete = jest.fn();

  render(<Item
    data={openItemData}
    onItemEdit={() => {}}
    onItemDelete={handleDelete}
  />);
  
  const deleteButtonElement = screen.getByTestId('itemDeleteButton');
  fireEvent.click(deleteButtonElement);
  expect(handleDelete).toHaveBeenCalledTimes(1);
});

test('should call the delete handle function with the item data as the parameter', () => {
  const handleDelete = jest.fn();

  render(<Item
    data={openItemData}
    onItemEdit={() => {}}
    onItemDelete={handleDelete}
  />);
  
  const deleteButtonElement = screen.getByTestId('itemDeleteButton');
  fireEvent.click(deleteButtonElement);
  expect(handleDelete).toBeCalledWith(openItemData);
});