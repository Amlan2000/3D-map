import React, { useState } from "react";
import Header from "./Components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import SignUp from "./Components/SignUp/SignUp";
import MapComponent from "./Components/MapComponent/MapComponent";
import Cuboid from "./Components/3DCuboid";
import ProtectComponent from "./Components/ProtectComponent";

const App = () => {
  const [mapImage, setMapImage] = useState(null);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        {/* Protect the /map route */}
        <Route
          path="/map"
          element={
            <ProtectComponent>
              <div>
                <MapComponent onCapture={(imageUrl) => setMapImage(imageUrl)} />
                {mapImage && <Cuboid mapImageUrl={mapImage} />}
              </div>
            </ProtectComponent>
          }
        />
      </Routes>
    </>
  );
};

export default App;
