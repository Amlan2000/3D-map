import React, { useState } from "react";
import Header from "./Components/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import SignUp from "./Components/SignUp/SignUp";
import MapComponent from "./Components/MapComponent/MapComponent";
import Cuboid from "./Components/3DCuboid";

// Utility function to check if the user is logged in
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const App = () => {
  const [mapImage, setMapImage] = useState(null);

  return (
    <>
      <Header />

      <Routes>
        {/* Redirect logged-in users from /login, /register, and /dashboard to /map */}
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/map" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated() ? <Navigate to="/map" /> : <SignUp />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Navigate to="/map" /> : <Dashboard />}
        />
        <Route
          path="/map"
          element={
            <div>
              <MapComponent onCapture={(imageUrl) => setMapImage(imageUrl)} />
              {mapImage && <Cuboid mapImageUrl={mapImage} />}
            </div>
          }
        />
        {/* Redirect root path to /map if logged in, otherwise show Dashboard */}
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/map" /> : <Dashboard />}
        />
      </Routes>
    </>
  );
};

export default App;
