import React from 'react';
import UserList from './components/UserList/UserList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <UserList />
    </div>
  );
};

export default App;