import { useState, useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup, Polygon, useMap, Marker, Popup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';

import "./MapComponent.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw/dist/leaflet.draw";
import "leaflet-geosearch/assets/css/leaflet.css";	
import "leaflet-geosearch/dist/geosearch.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const provider = new OpenStreetMapProvider();

function MapComponent() {
  const [position] = useState([56.5087919, 21.0104024]);
  const [polygons, setPolygons] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);

  function handleSetPolygons(e) {
    const latLngs = e.layer.getLatLngs();
    const coordinates = latLngs[0].map(coord => `(Lat: ${coord.lat.toFixed(6)}, Lng: ${coord.lng.toFixed(6)})`);
    const popupContent = `<b>Polygon Coordinates:</b><br>${coordinates.join('<br>')}`
      .replace(/"/g, '');
    e.layer.bindPopup(popupContent).openPopup();
    setPolygons([...polygons, latLngs]);
  }
  
  function AddSearchControlToMap() {
    const map = useMap();
    useEffect(() => {
      const searchControl = new GeoSearchControl({
        provider: provider,
        autoComplete: true,
        searchLabel: 'Enter address, city or country',
      });
      map.addControl(searchControl);
      return () => {
        map.removeControl(searchControl);
      }
    }, [map, provider]);

    return null;
  }

  return (
    <MapContainer id="map" center={position} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup>
        {polygons.map((polygon, index) => (
          <Polygon
            key={index}
            positions={polygon}
            eventHandlers={{
              mouseover: () => {
                setPopupOpen(true);
              },
              mouseout: () => {
                setPopupOpen(false);
              },
            }}
            popupOpen={popupOpen}
            popupContent={`Polygon ${index}`}
          />
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
      <AddSearchControlToMap />
    </MapContainer>
);
}
export default MapComponent;
