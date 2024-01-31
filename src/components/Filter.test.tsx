import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Filter from './Filter';
import itemTypes from '../data/itemTypes.json';

afterEach(() => {
  cleanup();
});

test('should render the filter component', () => {
  render(<Filter types={itemTypes} onChange={() => {}}/>);

  const filterElement = screen.getByTestId('filter');
  expect(filterElement).toBeInTheDocument();
});

test('should render the filter component with the given options', () => {
  render(<Filter types={itemTypes} onChange={() => {}}/>);
  
  const filterOptionTaskElement = screen.getByTestId('filter-option-task');
  const filterOptionFeatureElement = screen.getByTestId('filter-option-feature');
  const filterOptionBugElement = screen.getByTestId('filter-option-bug');

  expect(filterOptionTaskElement).toBeInTheDocument();
  expect(filterOptionFeatureElement).toBeInTheDocument();
  expect(filterOptionBugElement).toBeInTheDocument();
});

test('should call the change handle function once', () => {
  const handleChange = jest.fn();

  render(<Filter types={itemTypes} onChange={handleChange} />);
  
  const filterOptionElement = screen.getByTestId('filter-option-bug');
  fireEvent.click(filterOptionElement);
  expect(handleChange).toHaveBeenCalledTimes(1);
});

test('should call the change handle function with the correct parameter', () => {
  const handleChange = jest.fn();

  render(<Filter types={itemTypes} onChange={handleChange} />);
  
  const filterOptionElement = screen.getByTestId('filter-option-bug');
  fireEvent.click(filterOptionElement);
  expect(handleChange).toHaveBeenCalledWith(['bug']);
});