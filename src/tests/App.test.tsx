import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import App from '../app/App';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  render(<App />);
  expect(true).toBeTruthy();
});

const add = (a: number, b: number) => a + b;

test('should add two numbers', () => {
  const sum = add(3, 4);
  expect(sum).toBe(7);
});
