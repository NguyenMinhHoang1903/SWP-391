import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { toast } from 'react-toastify';
import CreateCombo from './createCombo';

// Mock toast to avoid actual toast messages during testing
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

test('renders CreateCombo component', () => {
  render(<CreateCombo />);
  expect(screen.getByText('Create Combo')).toBeInTheDocument();
});

test('handles input changes correctly', () => {
  render(<CreateCombo />);

  const comboNameInput = screen.getByPlaceholderText('Enter');
  fireEvent.change(comboNameInput, { target: { value: 'Test Combo', id: 'comboName' } });
  expect(comboNameInput.value).toBe('Test Combo');

  const descriptionInput = screen.getByPlaceholderText('Enter', { exact: false });
  fireEvent.change(descriptionInput, { target: { value: 'Test Description', id: 'description' } });
  expect(descriptionInput.value).toBe('Test Description');
});

test('handles date changes correctly', () => {
  render(<CreateCombo />);

  const startDateInput = screen.getByPlaceholderText('Enter', { exact: false });
  fireEvent.change(startDateInput, { target: { value: '2024-06-23', id: 'startDate' } });
  expect(startDateInput.value).toBe('2024-06-23');

  const endDateInput = screen.getByPlaceholderText('Enter', { exact: false });
  fireEvent.change(endDateInput, { target: { value: '2024-06-24', id: 'endDate' } });
  expect(endDateInput.value).toBe('2024-06-24');
});

test('validates date correctly', async () => {
  render(<CreateCombo />);

  const startDateInput = screen.getByPlaceholderText('Enter', { exact: false });
  fireEvent.change(startDateInput, { target: { value: '2024-06-24', id: 'startDate' } });

  const endDateInput = screen.getByPlaceholderText('Enter', { exact: false });
  fireEvent.change(endDateInput, { target: { value: '2024-06-23', id: 'endDate' } });

  const submitButton = screen.getByText('Submit');
  fireEvent.click(submitButton);

  expect(toast.error).toHaveBeenCalledWith("End date cannot be before start date");
});

test('validates price correctly', async () => {
  render(<CreateCombo />);

  const priceInput = screen.getByPlaceholderText('Enter price');
  fireEvent.change(priceInput, { target: { value: '-1000', id: 'price' } });

  const submitButton = screen.getByText('Submit');
  fireEvent.click(submitButton);

  expect(toast.error).toHaveBeenCalledWith("Price must be a positive number in the format 000.000.000");
});
