// import React, { useState } from 'react';
// import MapComponent from './Components/MapComponent';
// import Cuboid from './Components/3DCuboid';

// function App() {
//   const [mapImage, setMapImage] = useState(null);

//   return (
//     <div>
//       <MapComponent onCapture={(imageUrl) => setMapImage(imageUrl)} />
//       {mapImage && <Cuboid mapImageUrl={mapImage} />}
//     </div>
//   );
// }

// export default App;

import React from 'react'
import Header from './Components/Header'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import SignUp from './Components/SignUp'

const App = () => {
  return (
    <>
    <Header></Header>
    <Routes>
      <Route path="/login" element={<Login></Login>}> </Route>
      <Route path="/register" element={<SignUp></SignUp>}> </Route>
      <Route path="/dashboard" element={<Dashboard></Dashboard>}> </Route>
    </Routes>
    </>
  )
}

export default App
