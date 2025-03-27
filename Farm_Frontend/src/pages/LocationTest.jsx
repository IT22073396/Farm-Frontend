import React, { useState, useEffect } from 'react';
import loadGoogleMaps from '../components/loadGoogleMaps'; // Adjust the import path as necessary

const GeoLocationTest = () => {
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [map, setMap] = useState(null);

  useEffect(() => {
    const fetchLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setCoordinates({ latitude, longitude });
          },
          error => {
            console.error("Error getting location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by your browser");
      }
    };

    fetchLocation(); // Fetch location immediately on component mount

    const intervalId = setInterval(fetchLocation, 7200000); // Fetch location every 1 minute

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      loadGoogleMaps(() => {
        if (!map) {
          const newMap = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: coordinates.latitude, lng: coordinates.longitude },
            zoom: 15
          });
          new window.google.maps.Marker({
            position: { lat: coordinates.latitude, lng: coordinates.longitude },
            map: newMap,
            title: 'Current Location'
          });
          setMap(newMap);
        } else {
          map.setCenter({ lat: coordinates.latitude, lng: coordinates.longitude });
          new window.google.maps.Marker({
            position: { lat: coordinates.latitude, lng: coordinates.longitude },
            map: map,
            title: 'Current Location'
          });
        }
      });
    }
  }, [coordinates, map]);

  return (
    <div> 
      <h2>Live Location Tracker</h2>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
      <p>Latitude: {coordinates.latitude} | Longitude: {coordinates.longitude}</p>
    </div>
  );
};

export default GeoLocationTest;
