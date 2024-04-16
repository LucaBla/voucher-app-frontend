import { User } from "react-feather";
import '../styles/components/header.css';
import { useAuth } from "../authContext";
import ProfileDrawer from "./profileDrawer";
import { Link } from "react-router-dom";

function Header({name}) {
  const authToken = localStorage.getItem('authToken');;

  return (
    <div className="HeaderWrapper">
      <Link to={`/`} className="HeaderTitle">
        <h1>ScanVoucher</h1>
      </Link>
      {authToken?
        <ProfileDrawer name={name}/>
        :
        <></>
      }
    </div>
  );
}

export default Header;