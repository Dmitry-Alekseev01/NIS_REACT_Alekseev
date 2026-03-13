import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieList from './MovieList';
import { Movie } from '../../types/movie';

const mockMovies: Movie[] = [
  { id: 1, title: 'Movie 1', year: 2001, posterUrl: 'url1', isFavourite: false },
  { id: 2, title: 'Movie 2', year: 2002, posterUrl: 'url2', isFavourite: true },
];

const mockToggleFavorite = jest.fn();

describe('MovieList', () => {
  it('renders correct number of MovieCard components', () => {
    render(<MovieList movies={mockMovies} onToggleFavorite={mockToggleFavorite} viewMode="grid" />);

    const movieCards = screen.getAllByRole('img');
    expect(movieCards).toHaveLength(2);
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  it('displays "Фильмов нет" when movies array is empty', () => {
    render(<MovieList movies={[]} onToggleFavorite={mockToggleFavorite} viewMode="grid" />);

    expect(screen.getByText('Фильмов нет')).toBeInTheDocument();
  });

  it('passes viewMode to each MovieCard', () => {
    render(<MovieList movies={mockMovies} onToggleFavorite={mockToggleFavorite} viewMode="list" />);

    const cards = screen.getAllByAltText(/Movie/).map((img) => img.closest('.card'));
    cards.forEach((card) => {
      expect(card).toHaveClass('list');
    });
  });
});
