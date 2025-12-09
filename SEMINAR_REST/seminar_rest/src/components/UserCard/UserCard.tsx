import React from 'react';
import { User } from '../../types/user';
import './UserCard.css';

export interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
  isDeleting?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete, isDeleting = false }) => {
  return (
    <div className="user-card">
      <div className="card-header">
        <div className="avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="user-info">
          <h3>{user.name}</h3>
          <p className="email">{user.email}</p>
        </div>
      </div>
      <div className="card-body">
        {user.phone && (
          <div className="detail">
            <span className="label">Телефон:</span>
            <span className="value">{user.phone}</span>
          </div>
        )}
        {user.website && (
          <div className="detail">
            <span className="label">Веб-сайт:</span>
            <a 
              href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="value link"
            >
              {user.website}
            </a>
          </div>
        )}
      </div>
      <div className="card-actions">
        <button 
          onClick={() => onEdit(user)}
          className="edit-button"
          disabled={isDeleting}
        >
          Редактировать
        </button>
        <button 
          onClick={() => onDelete(user.id)}
          className="delete-button"
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Удалить'}
        </button>
      </div>
    </div>
  );
};

export default UserCard;