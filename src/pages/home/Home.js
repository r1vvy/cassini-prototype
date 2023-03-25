import { Helmet } from 'react-helmet';
import { Map } from "../../components/map/Map";

import "./Home.css";

const Home = () => {

  return (
    <div>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
          integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
          crossorigin=""
        />
      </Helmet>
      <div className="home">
        <h1>Home</h1>
        <Map />
      </div>
    </div>
  );
};

export default Home;
