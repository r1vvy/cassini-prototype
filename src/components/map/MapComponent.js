import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useState } from "react";

import "./MapComponent.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw/dist/leaflet.draw";

function MapComponent() {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [polygons, setPolygons] = useState([]);

  function handleSetPolygons(e) {
    setPolygons([...polygons, e.layer.getLatLngs()]);
  }

  return (
    <MapContainer center={position} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup>
        {polygons.map((polygon, index) => (
          <Polygon key={index} positions={polygon} />
        ))}
        <EditControl
          position="topleft"
          onCreated={handleSetPolygons}
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
}
export default MapComponent;
