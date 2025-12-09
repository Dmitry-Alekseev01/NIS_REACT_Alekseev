import React, { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { User } from '../../types/user';
import UserForm from '../UserForm/UserForm';
import UserCard from '../UserCard/UserCard';
import AxiosRequest from '../AxiosRequest/AxiosRequest';
import './UserList.css';

const UserList: React.FC = () => {
  const { users, addUser, updateUser, deleteUser, isLoading, error } = useUsers();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreate = async (userData: Partial<User>) => {
    if (!userData.name || !userData.email) {
      showNotification('Name and email are required');
      return;
    }

    setIsProcessing(true);
    try {
      await addUser({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        website: userData.website,
      } as Omit<User, 'id'>);
      setShowForm(false);
      showNotification('User created successfully!');
    } catch (err) {
      console.error('Failed to create user:', err);
      showNotification('Failed to create user');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdate = async (userData: Partial<User> & { id?: number }) => {
    if (!userData.id) {
      showNotification('User ID is required for update');
      return;
    }

    setIsProcessing(true);
    try {
      await updateUser({
        id: userData.id,
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone,
        website: userData.website,
      } as User);
      setEditingUser(null);
      showNotification('User updated successfully!');
    } catch (err) {
      console.error('Failed to update user:', err);
      showNotification('Failed to update user');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setIsProcessing(true);
      try {
        await deleteUser(id);
        showNotification('User deleted successfully!');
      } catch (err) {
        console.error('Failed to delete user:', err);
        showNotification('Failed to delete user');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  if (isLoading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">Error: Failed to load users</div>;

  return (
    <div className="user-list">
      <h1>Users Management (Local State)</h1>
      
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      
      <AxiosRequest />
      
      <div className="controls">
        <button 
          onClick={() => setShowForm(true)} 
          className="add-button"
          disabled={showForm || !!editingUser || isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Добавить нового пользователя'}
        </button>
      </div>
      
      {showForm && (
        <div className="form-container">
          <UserForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
            title="Добавить нового пользователя"
            isSubmitting={isProcessing}
          />
        </div>
      )}
      
      {editingUser && (
        <div className="form-container">
          <UserForm
            initialData={editingUser}
            onSubmit={handleUpdate}
            onCancel={() => setEditingUser(null)}
            title="Отредактировать пользователя"
            isSubmitting={isProcessing}
          />
        </div>
      )}
      
      <div className="users-grid">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={() => setEditingUser(user)}
            onDelete={handleDelete}
            isDeleting={isProcessing}
          />
        ))}
      </div>
      
      <div className="stats">
        <p>Всего пользователей: {users.length}</p>
        <p className="hint">Примечание: изменения хранятся локально (JSONPlaceholder - фальшивое API)</p>
      </div>
    </div>
  );
};

export default UserList;