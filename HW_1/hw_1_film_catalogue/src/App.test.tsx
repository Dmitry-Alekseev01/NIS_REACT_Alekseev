import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App integration tests', () => {
  it('renders all movies initially', () => {
    render(<App />);

    expect(screen.getByText('Зеленая миля')).toBeInTheDocument();
    expect(screen.getByText('Побег из Шоушенка')).toBeInTheDocument();
    expect(screen.getByText('Форрест Гамп')).toBeInTheDocument();
    expect(screen.getByText('Список Шиндлера')).toBeInTheDocument();
  });

  it('filters movies to show only favourites when "Только избранные" clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Только избранные'));

    expect(screen.getByText('Побег из Шоушенка')).toBeInTheDocument();
    expect(screen.getByText('Список Шиндлера')).toBeInTheDocument();
    expect(screen.queryByText('Зеленая миля')).not.toBeInTheDocument();
    expect(screen.queryByText('Форрест Гамп')).not.toBeInTheDocument();
  });

  it('filters movies by search query', () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText('Поиск по названию...');
    fireEvent.change(searchInput, { target: { value: 'форрест' } });

    expect(screen.getByText('Форрест Гамп')).toBeInTheDocument();
    expect(screen.queryByText('Зеленая миля')).not.toBeInTheDocument();
    expect(screen.queryByText('Побег из Шоушенка')).not.toBeInTheDocument();
  });

  it('toggles favorite status when star button clicked', async () => {
    render(<App />);

    const greenMileCard = screen.getByText('Зеленая миля').closest('.card');
    const starButton = greenMileCard?.querySelector('.favorite-btn');
    expect(starButton).not.toHaveClass('active');

    fireEvent.click(starButton!);

    expect(starButton).toHaveClass('active');
    fireEvent.click(screen.getByText('Только избранные'));

    await waitFor(() => {
      expect(screen.getByText('Зеленая миля')).toBeInTheDocument();
    });
  });

  it('changes view mode to list', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Список'));

    const movieListContainer = screen.getByText('Зеленая миля').closest('.movie-list');
    expect(movieListContainer).toHaveClass('list');
  });

  it('displays "Фильмов нет" when no movies match filter and search', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Только избранные'));
    const searchInput = screen.getByPlaceholderText('Поиск по названию...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.getByText('Фильмов нет')).toBeInTheDocument();
  });
});
