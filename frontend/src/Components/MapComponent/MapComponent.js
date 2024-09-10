import React, { useRef, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import BabylonScene from '../3DCuboid';
import axios from 'axios';
import './MapComponent.css';
import { useNavigate } from 'react-router-dom';

const MapComponent = () => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY });
  const mapRef = useRef(null);
  const [textureUrl, setTextureUrl] = useState(null);
  const navigate= useNavigate();

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
        link.download = 'captured-map.png'; 

        // Append the link to the document and trigger a click
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        setTextureUrl(objectURL); 

        await axios.post(`${process.env.REACT_APP_API_URL}/map/save`, {
          imageUrl,
          coordinates: { lat, lng },
          zoom
          // email: user.email
        });

      } catch (error) {
        console.error('Failed to capture the map image', error);
      }
    }
  };

  return isLoaded ? (
    <div className="container">
      <h2 className="heading">3D Conversion Page</h2>
      <div className="button-container">
        <button onClick={captureMap} className="action-button">Capture Map</button>
        {/* <button onClick={handleLogout} className="action-button">Log Out</button> */}
      </div>
      <div className="content-container">
        <div className="map-container">
          <GoogleMap
            onLoad={onLoad}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={{ lat: -34.397, lng: 150.644 }}
            zoom={8}
          >
            <Marker position={{ lat: -34.397, lng: 150.644 }} />
          </GoogleMap>
        </div>
        <div className="babylon-container">
          {textureUrl && <BabylonScene textureUrl={textureUrl} />}
        </div>
      </div>
    </div>
  ) : <div>Loading...</div>;
};

export default MapComponent;