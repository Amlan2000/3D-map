import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';


const MapComponent = () => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: 'AIzaSyCH5Y_nerXn_ssQ8SvG3mz3IcOKKh9amS0' });
  const mapRef = React.useRef();

  const onLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const captureMap = () => {
    // Function to capture the map as an image
  };

  return isLoaded ? (
    <GoogleMap
      onLoad={onLoad}
      mapContainerStyle={{ width: '400px', height: '400px' }}
      center={{ lat: -34.397, lng: 150.644 }}
      zoom={8}
    >
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
      <button onClick={captureMap}>Capture Map</button>
    </GoogleMap>
  ) : <div>Loading...</div>;
};

export default MapComponent;
