import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect,Routes, Navigate } from 'react-router-dom';
import MapComponent from './Components/MapComponent';
import Cuboid from './Components/3DCuboid';
import Login from './Components/Login';
import axios from 'axios';
import Home from "./Pages/Home";
// import Login from "./Components/Login";
import "./App.css";

function App() {
  const [mapImage, setMapImage] = useState(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Check authentication status on component mount
  //   const checkAuth = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/auth/status');
  //       setIsAuthenticated(response.data.authenticated);
  //     } catch (error) {
  //       console.error('Failed to check authentication status', error);
  //       setIsAuthenticated(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);


  return (
    <Routes>
       	<Route exact path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />}/>
				<Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />}/>
        {/* <Route path="/map">
          {isAuthenticated ? (
            <div>
              <MapComponent onCapture={(imageUrl) => setMapImage(imageUrl)} />
              {mapImage && <Cuboid mapImageUrl={mapImage} />}
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route> */}
      
    </Routes>
  );
}

export default App;
