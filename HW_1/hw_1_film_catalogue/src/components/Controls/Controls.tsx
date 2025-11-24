import React, { useRef } from 'react';
import { Filter, ViewMode } from '../../types/movie';
import './Controls.css';

interface ControlsProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onSearchChange: (query: string) => void;
}

const Controls: React.FC<ControlsProps> = ({
  filter,
  onFilterChange,
  viewMode,
  onViewModeChange,
  onSearchChange,
}) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    onSearchChange(searchRef.current?.value.toLowerCase() || '');
  };

  return (
    <div className="controls">
      <div className="filter-buttons">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => onFilterChange('all')}
        >
          Все
        </button>
        <button
          className={filter === 'favourites' ? 'active' : ''}
          onClick={() => onFilterChange('favourites')}
        >
          Только избранные
        </button>
      </div>
      
      <div className="search">
        <input
          ref={searchRef}
          type="text"
          placeholder="Поиск по названию..."
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      
      <div className="view-buttons">
        <button
          className={viewMode === 'grid' ? 'active' : ''}
          onClick={() => onViewModeChange('grid')}
        >
          Плитка
        </button>
        <button
          className={viewMode === 'list' ? 'active' : ''} 
          onClick={() => onViewModeChange('list')}
        >
          Список
        </button>
      </div>
    </div>
  );
};

export default Controls;