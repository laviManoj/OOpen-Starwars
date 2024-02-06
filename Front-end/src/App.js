// AppRouter.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './component/LogInPage/LoginPage';
import CharacterList from './component/CharacterListPage/CharacterList';
import CharacterDetails from './component/CharacterDetailsPage/CharacterDetailsPage';
// import Dashboard from './component/DashboardPage/Dashboard';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user, pass) => {
    // Basic validation (you can add more checks)
    if (user === 'demo' && pass === 'password') {
      setLoggedIn(true);
      setUsername(user);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/character-list" /> : <LoginPage handleLogin={handleLogin} />} />
        <Route path="/character-list" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
