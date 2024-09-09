import React, { useState } from 'react';
import MapComponent from './Components/MapComponent';
import Cuboid from './Components/3DCuboid';

function App() {
  const [mapImage, setMapImage] = useState(null);

  return (
    <div>
      <MapComponent onCapture={(imageUrl) => setMapImage(imageUrl)} />
      {mapImage && <Cuboid mapImageUrl={mapImage} />}
    </div>
  );
}

export default App;