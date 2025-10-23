import React, { useState, useMemo } from 'react';
import { Movie, Filter, ViewMode } from './types/movie';
import MovieList from './components/MovieList/MovieList';
import Controls from './components/Controls/Controls';
import './App.css';

const initialMovies: Movie[] = [
  {
    id: 1,
    title: 'Зеленая миля',
    year: 1999,
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_FMjpg_UX1000_.jpg',
    isFavourite: false,
  },
  {
    id: 2,
    title: 'Побег из Шоушенка',
    year: 1994,
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    isFavourite: true,
  },
  {
    id: 3,
    title: 'Форрест Гамп',
    year: 1994,
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    isFavourite: false,
  },
  {
    id: 4,
    title: 'Список Шиндлера',
    year: 1993,
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    isFavourite: true,
  },
];

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [filter, setFilter] = useState<Filter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');

const toggleFavorite = (id: number) => {
  console.log('Toggling favorite for movie id:', id);
  setMovies(prevMovies => {
    const movieIndex = prevMovies.findIndex(movie => movie.id === id);
    if (movieIndex === -1) return prevMovies;
    
    const updatedMovies = [...prevMovies];
    updatedMovies[movieIndex] = {
      ...updatedMovies[movieIndex],
      isFavourite: !updatedMovies[movieIndex].isFavourite
    };
    
    console.log('Updated movies:', updatedMovies);
    return updatedMovies;
  });
};

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesFilter = filter === 'all' || movie.isFavourite;
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery);
      console.log('Movie:', movie.title, 'isFavorite:', movie.isFavourite, 'matchesFilter:', matchesFilter, 'matchesSearch:', matchesSearch);
      return matchesFilter && matchesSearch;
    });
  }, [movies, filter, searchQuery]);

  return (
    <div className="app">
      <h1>Мои фильмы</h1>
      
      <Controls
        filter={filter}
        onFilterChange={setFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onSearchChange={setSearchQuery}
      />
      
      <MovieList
        movies={filteredMovies}
        onToggleFavorite={toggleFavorite}
        viewMode={viewMode}
      />
    </div>
  );
};

export default App;