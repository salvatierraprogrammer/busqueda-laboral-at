import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@layout/Header';
import Footer from '@layout/Footer';
import Home from './page/Home';
import { auth } from '@config/Firebase';
import Login from '@auth/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para manejar autenticación

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user); // Actualiza el estado de autenticación
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={<Login setIsAuthenticated={setIsAuthenticated} />} 
        />
      </Routes>
      <Footer/>
    </Router>
  );
}


export default App;