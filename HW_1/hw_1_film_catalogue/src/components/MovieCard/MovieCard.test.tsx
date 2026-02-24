import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from './MovieCard';
import { Movie } from '../../types/movie';

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  year: 2020,
  posterUrl: 'http://test.com/poster.jpg',
  isFavourite: false,
};

const mockToggleFavorite = jest.fn();

describe('MovieCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders movie information correctly', () => {
    render(<MovieCard movie={mockMovie} onToggleFavorite={mockToggleFavorite} viewMode="grid" />);

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    const poster = screen.getByAltText('Test Movie') as HTMLImageElement;
    expect(poster.src).toBe('http://test.com/poster.jpg');
  });

  it('calls onToggleFavorite with correct id when favorite button clicked', () => {
    render(<MovieCard movie={mockMovie} onToggleFavorite={mockToggleFavorite} viewMode="grid" />);

    const favButton = screen.getByRole('button', { name: /⭐/ });
    fireEvent.click(favButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith(1);
  });

  it('applies active class when movie is favorite', () => {
    const favoriteMovie = { ...mockMovie, isFavourite: true };
    render(
      <MovieCard movie={favoriteMovie} onToggleFavorite={mockToggleFavorite} viewMode="grid" />
    );

    const favButton = screen.getByRole('button', { name: /⭐/ });
    expect(favButton).toHaveClass('active');
  });

  it('does not have active class when movie is not favorite', () => {
    render(<MovieCard movie={mockMovie} onToggleFavorite={mockToggleFavorite} viewMode="grid" />);

    const favButton = screen.getByRole('button', { name: /⭐/ });
    expect(favButton).not.toHaveClass('active');
  });
});
