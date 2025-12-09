import { useState, useCallback } from 'react';
import { User } from '../types/user';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      phone: '1-463-123-4447',
      website: 'ramiro.info',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      phone: '493-170-9623 x156',
      website: 'kale.biz',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      phone: '(254)954-1289',
      website: 'demarco.info',
    },
  ]);

  const addUser = useCallback((userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now(),
    };
    setUsers(prev => [newUser, ...prev]);
    return Promise.resolve(newUser);
  }, []);

  const updateUser = useCallback((userData: User) => {
    setUsers(prev => prev.map(user => 
      user.id === userData.id ? { ...user, ...userData } : user
    ));
    return Promise.resolve(userData);
  }, []);

  const deleteUser = useCallback((id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    return Promise.resolve();
  }, []);

  const getUsers = useCallback(() => {
    return Promise.resolve(users);
  }, [users]);

  return {
    users,
    addUser,
    updateUser,
    deleteUser,
    getUsers,
    isLoading: false,
    error: null,
  };
};