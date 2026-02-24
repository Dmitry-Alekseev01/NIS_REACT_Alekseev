import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Controls from './Controls';

describe('Controls', () => {
  const mockOnFilterChange = jest.fn();
  const mockOnViewModeChange = jest.fn();
  const mockOnSearchChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders filter buttons and view buttons', () => {
    render(
      <Controls
        filter="all"
        onFilterChange={mockOnFilterChange}
        viewMode="grid"
        onViewModeChange={mockOnViewModeChange}
        onSearchChange={mockOnSearchChange}
      />
    );

    expect(screen.getByText('Все')).toBeInTheDocument();
    expect(screen.getByText('Только избранные')).toBeInTheDocument();
    expect(screen.getByText('Плитка')).toBeInTheDocument();
    expect(screen.getByText('Список')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Поиск по названию...')).toBeInTheDocument();
  });

  it('calls onFilterChange with "all" when "Все" button clicked', () => {
    render(
      <Controls
        filter="all"
        onFilterChange={mockOnFilterChange}
        viewMode="grid"
        onViewModeChange={mockOnViewModeChange}
        onSearchChange={mockOnSearchChange}
      />
    );

    fireEvent.click(screen.getByText('Все'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('all');
  });

  it('calls onFilterChange with "favourites" when "Только избранные" button clicked', () => {
    render(
      <Controls
        filter="all"
        onFilterChange={mockOnFilterChange}
        viewMode="grid"
        onViewModeChange={mockOnViewModeChange}
        onSearchChange={mockOnSearchChange}
      />
    );

    fireEvent.click(screen.getByText('Только избранные'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('favourites');
  });

  it('calls onViewModeChange with "grid" when "Плитка" button clicked', () => {
    render(
      <Controls
        filter="all"
        onFilterChange={mockOnFilterChange}
        viewMode="list"
        onViewModeChange={mockOnViewModeChange}
        onSearchChange={mockOnSearchChange}
      />
    );

    fireEvent.click(screen.getByText('Плитка'));
    expect(mockOnViewModeChange).toHaveBeenCalledWith('grid');
  });

  it('calls onViewModeChange with "list" when "Список" button clicked', () => {
    render(
      <Controls
        filter="all"
        onFilterChange={mockOnFilterChange}
        viewMode="grid"
        onViewModeChange={mockOnViewModeChange}
        onSearchChange={mockOnSearchChange}
      />
    );

    fireEvent.click(screen.getByText('Список'));
    expect(mockOnViewModeChange).toHaveBeenCalledWith('list');
  });

  it('calls onSearchChange with input value when typing', () => {
    render(
      <Controls
        filter="all"
        onFilterChange={mockOnFilterChange}
        viewMode="grid"
        onViewModeChange={mockOnViewModeChange}
        onSearchChange={mockOnSearchChange}
      />
    );

    const input = screen.getByPlaceholderText('Поиск по названию...');
    fireEvent.change(input, { target: { value: 'Avengers' } });
    expect(mockOnSearchChange).toHaveBeenCalledWith('avengers');
  });

  it('highlights active filter button', () => {
    render(
      <Controls
        filter="favourites"
        onFilterChange={mockOnFilterChange}
        viewMode="grid"
        onViewModeChange={mockOnViewModeChange}
        onSearchChange={mockOnSearchChange}
      />
    );

    expect(screen.getByText('Все')).not.toHaveClass('active');
    expect(screen.getByText('Только избранные')).toHaveClass('active');
  });

  it('highlights active view button', () => {
    render(
      <Controls
        filter="all"
        onFilterChange={mockOnFilterChange}
        viewMode="list"
        onViewModeChange={mockOnViewModeChange}
        onSearchChange={mockOnSearchChange}
      />
    );

    expect(screen.getByText('Плитка')).not.toHaveClass('active');
    expect(screen.getByText('Список')).toHaveClass('active');
  });
});
