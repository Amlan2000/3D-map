import React, { useRef, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import BabylonScene from './Cuboid';
import axios from 'axios';

const MapComponent = () => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: 'AIzaSyCH5Y_nerXn_ssQ8SvG3mz3IcOKKh9amS0' });
  const mapRef = useRef(null);
  const [textureUrl, setTextureUrl] = useState(null);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const captureMap = async () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const lat = center.lat();
      const lng = center.lng();
      const zoom = mapRef.current.getZoom();

      const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=600x300&key=AIzaSyCH5Y_nerXn_ssQ8SvG3mz3IcOKKh9amS0`;

      try {

                  // Fetch the image as a Blob
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const objectURL = URL.createObjectURL(blob);
  
          // Create a link element
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'captured-map.png'; // Specify the filename
  
          // Append the link to the document and trigger a click
          document.body.appendChild(link);
          link.click();
  
          // Clean up and remove the link
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href); // Clean up the object URL


        setTextureUrl(objectURL); // Set the captured image as texture

               // Send the captured image URL and coordinates to the backend
               await axios.post('http://localhost:5000/save', {
                imageUrl,
                coordinates: { lat, lng },
                zoom
              });

      } catch (error) {
        console.error('Failed to capture the map image', error);
      }
    }
  };

  return isLoaded ? (
    <div style={{ position: 'relative' }}>
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={{ width: '50%', height: '400px' }}
        center={{ lat: -34.397, lng: 150.644 }}
        zoom={8}
      >
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      </GoogleMap>
      <button onClick={captureMap} style={{ position: 'absolute', top: '450px', left: '20px', zIndex: 10 }}>
        Capture Map
      </button>
      {textureUrl && <BabylonScene textureUrl={textureUrl} />}
    </div>
  ) : <div>Loading...</div>;
};

export default MapComponent;