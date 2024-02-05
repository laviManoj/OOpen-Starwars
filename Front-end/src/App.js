// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './component/LogInPage/LoginPage';
import RegisterPage from './component/RegisterPage';




const App = () => {
  return (
  
    <Router>
      <Routes>
     
        <Route path="/" element={<LoginPage />} />
        <Route path="/User-Register/" element={<RegisterPage />} />
        
      </Routes>
    </Router>
  );
};

export default App;