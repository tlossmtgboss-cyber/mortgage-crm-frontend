import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LeadList from '../components/LeadList';
import leadService from '../services/leadService';

// Mock the leadService
jest.mock('../services/leadService');

describe('LeadList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders LeadList component with title', async () => {
    // Mock successful API call with empty leads
    leadService.getLeads.mockResolvedValue([]);

    render(<LeadList />);

    // Check if the title is rendered
    expect(screen.getByText('Lead Management')).toBeInTheDocument();
  });

  test('renders Add Lead button', async () => {
    leadService.getLeads.mockResolvedValue([]);

    render(<LeadList />);

    // Check if Add Lead button is present
    const addButton = screen.getByText('Add New Lead');
    expect(addButton).toBeInTheDocument();
  });

  test('opens modal when Add Lead button is clicked', async () => {
    leadService.getLeads.mockResolvedValue([]);

    render(<LeadList />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByText('Add New Lead')).toBeInTheDocument();
    });

    // Click Add Lead button
    const addButton = screen.getByText('Add New Lead');
    fireEvent.click(addButton);

    // Check if modal is opened
    await waitFor(() => {
      expect(screen.getByText('Create New Lead')).toBeInTheDocument();
    });
  });

  test('closes modal when close button is clicked', async () => {
    leadService.getLeads.mockResolvedValue([]);

    render(<LeadList />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByText('Add New Lead')).toBeInTheDocument();
    });

    // Open modal
    const addButton = screen.getByText('Add New Lead');
    fireEvent.click(addButton);

    // Wait for modal to appear
    await waitFor(() => {
      expect(screen.getByText('Create New Lead')).toBeInTheDocument();
    });

    // Click close button (×)
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    // Check if modal is closed
    await waitFor(() => {
      expect(screen.queryByText('Create New Lead')).not.toBeInTheDocument();
    });
  });

  test('displays loading state initially', () => {
    leadService.getLeads.mockReturnValue(new Promise(() => {})); // Never resolves

    render(<LeadList />);

    // Check for loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('displays leads when API returns data', async () => {
    const mockLeads = [
      {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        status: 'new',
        loanAmount: 250000,
        propertyType: 'Single Family',
        createdAt: new Date().toISOString(),
      },
    ];

    leadService.getLeads.mockResolvedValue(mockLeads);

    render(<LeadList />);

    // Wait for leads to be displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });

  test('displays empty state when no leads exist', async () => {
    leadService.getLeads.mockResolvedValue([]);

    render(<LeadList />);

    // Wait for empty state to be displayed
    await waitFor(() => {
      expect(screen.getByText(/No leads yet/i)).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    leadService.getLeads.mockRejectedValue(new Error('API Error'));

    render(<LeadList />);

    // Wait for error handling
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });
});
