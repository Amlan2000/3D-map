import React, { useState } from "react";
import Header from "./Components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import SignUp from "./Components/SignUp/SignUp";
import MapComponent from "./Components/MapComponent/MapComponent";
import Cuboid from "./Components/3DCuboid";

const App = () => {
  const [mapImage, setMapImage] = useState(null);

  return (
    <>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>}> </Route>
        <Route path="/login" element={<Login></Login>}>
          {" "}
        </Route>
        <Route path="/register" element={<SignUp></SignUp>}>
          {" "}
        </Route>
        {/* <Route path="/dashboard" element={<Dashboard></Dashboard>}> </Route> */}
        <Route
          path="/map"
          element={
            <div>
              <MapComponent onCapture={(imageUrl) => setMapImage(imageUrl)} />
              {mapImage && <Cuboid mapImageUrl={mapImage} />}
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
