import "../styles/pages/Home.css";
import { Link } from "react-router-dom";

function Home({name}) {

  return (
    <div className="HomeWrapper">
    <div className="FullWidthRow">
      <h2>Wilkommen {name}</h2>
    </div>
    <div className="ThreeElementsRow">
      <Link to={`/vouchers`}>
        <div className="OptionWrapper"></div>
      </Link>
      <div className="OptionWrapper"></div>
      <div className="OptionWrapper"></div>
    </div>
    </div>
  );
}

export default Home;