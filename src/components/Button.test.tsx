import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

afterEach(() => {
  cleanup();
});

test('should render the button component', () => {
  render(<Button />);

  const buttonElement = screen.getByTestId('button');
  expect(buttonElement).toBeInTheDocument();
});

test('should render the button component with the given content', () => {
  render(<Button>Hello world!</Button>);
  
  const buttonElement = screen.getByTestId('button');
  expect(buttonElement).toHaveTextContent('Hello world!');
});

test('should render the button component with the given class name', () => {
  render(<Button className="testButton">Hello world!</Button>);
  
  const buttonElement = screen.getByTestId('button');
  expect(buttonElement).toHaveClass('testButton');
});

test('should call the click handle function once', () => {
  const handleClick = jest.fn();

  render(<Button onClick={handleClick} />);
  
  const buttonElement = screen.getByTestId('button');
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});