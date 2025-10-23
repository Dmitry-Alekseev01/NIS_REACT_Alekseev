import React from 'react';
import { Movie, ViewMode } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

interface MovieListProps {
  movies: Movie[];
  onToggleFavorite: (id: number) => void;
  viewMode: ViewMode;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onToggleFavorite, viewMode }) => {
  if (movies.length === 0) {
    return <p className="no-movies">Фильмов нет</p>;
  }

  return (
    <div className={`movie-list ${viewMode}`}>
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleFavorite={onToggleFavorite}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default MovieList;