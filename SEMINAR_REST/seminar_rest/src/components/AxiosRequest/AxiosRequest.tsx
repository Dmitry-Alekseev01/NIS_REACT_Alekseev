import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../services/axios/axiosInstance';
import { User } from '../../types/user';

const AxiosRequest: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchUsersWithAxios = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get<User[]>('users', {
        signal: abortControllerRef.current.signal,
      });
      setUsers(response.data.slice(0, 5));
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to fetch users');
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="axios-request">
      <h3>Axios Request Demo</h3>
      <button onClick={fetchUsersWithAxios} disabled={loading}>
        {loading ? 'Загрузка...' : 'Вывести все пользователей'}
      </button>
      <button onClick={cancelRequest} disabled={!loading}>
        Отмена загрузки
      </button>
      {error && <div className="error">{error}</div>}
      {users.length > 0 && (
        <div>
          <h4>Users fetched:</h4>
          {users.map((user) => (
            <div key={user.id}>
              <strong>{user.name}</strong> - {user.email}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AxiosRequest;