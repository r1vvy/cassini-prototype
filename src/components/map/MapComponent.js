import { MapContainer, TileLayer, FeatureGroup, Polygon, useMapEvents } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useState } from 'react';

import './MapComponent.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw/dist/leaflet.draw';


function MapComponent() {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [polygons, setPolygons] = useState([]);

  function SearchBox() {
    useMapEvents({
      submit: (event) => {
        event.preventDefault();
        const form = event.target;
        const searchText = form.search.value;
        form.reset();
        searchLocation(searchText);
      }
    });

    async function searchLocation(searchText) {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchText}&format=json`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([lat, lon]);
      }
    }

    return (
      <div className="search-box">
        <form>
          <input type="text" name="search" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }

  return (
    <MapContainer center={position} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <SearchBox />
      <FeatureGroup>
        {polygons.map((polygon, index) => (
          <Polygon key={index} positions={polygon} />
        ))}
        <EditControl
          position="topleft"
          onCreated={(e) => {
            setPolygons([...polygons, e.layer.getLatLngs()]);
          }}
          draw={{
            polyline: false,
            marker: false,
            circle: false,
            circlemarker: false,
            rectangle: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
} export default MapComponent;