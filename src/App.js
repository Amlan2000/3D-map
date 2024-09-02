import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MapComponent from './Components/MapComponent';
import Cuboid from './Components/3DCuboid';
import Login from './Components/Login';
import axios from 'axios';
import "./App.css";

function App() {
  const [mapImage, setMapImage] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/login/success`, { withCredentials: true });
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Failed to check authentication status', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? (
          <div>
            <MapComponent onCapture={(imageUrl) => setMapImage(imageUrl)} />
            {mapImage && <Cuboid mapImageUrl={mapImage} />}
          </div>
        ) : (
          <Navigate to="/login" />
        )}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Login />}
      />
    </Routes>
  );
}

export default App;
