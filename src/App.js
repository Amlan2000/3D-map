import React, { useState } from 'react';
import MapComponent from './MapComponent';
import Cuboid from './Cuboid';

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