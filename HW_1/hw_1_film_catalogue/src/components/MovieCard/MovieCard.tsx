import React from 'react';
import { Movie } from '../../types/movie';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
  onToggleFavorite: (id: number) => void;
  viewMode: 'grid' | 'list';
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onToggleFavorite, viewMode }) => {
  return (
    <div className={`card ${viewMode}`}>
      <img src={movie.posterUrl} alt={movie.title} className="poster" />
      <div className="info"> 
        <h3 className="title">{movie.title}</h3> 
        <p className="year">{movie.year}</p> 
        <button
          className={`favorite-btn ${movie.isFavourite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(movie.id)}
        >
          ⭐
        </button>
      </div>
    </div>
  );
};

export default MovieCard;