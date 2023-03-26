

import MapComponent from "../../components/map/MapComponent";
import "./Home.css";

const Home = () => {

  return (
      <div className="home">
        <div className="map-container">
          <MapComponent />
        </div>
      </div>
  );
};

export default Home;
