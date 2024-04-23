import { Archive, Eye, Plus } from "react-feather";
import "../styles/pages/Home.css";
import { Link, useLoaderData } from "react-router-dom";

function Home({name}) {
  const data = useLoaderData();
  console.log(data);

  return (
    <div className="HomeWrapper">
    <div className="FullWidthRow">
      <h2>Wilkommen {data.name}</h2>
    </div>
    <div className="ThreeElementsRow">
      <Link to={`/vouchers/create`}>
        <div className="OptionWrapper">
          <Plus size={"28px"}/>
          <span>Create</span>
        </div>
      </Link>
      <Link to={`/vouchers/`}>
        <div className="OptionWrapper">
          <Archive size={"28px"}/>
          <span>Overview</span>
        </div>
      </Link>
      <Link to={`/vouchers/scan`}>
        <div className="OptionWrapper">
          <Eye size={"28px"}/>
          <span>Scan</span>
        </div>
      </Link>
    </div>
    </div>
  );
}

export default Home;