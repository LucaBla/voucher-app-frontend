import { ArrowLeft, User } from "react-feather";
import '../styles/components/header.css';
import { useAuth } from "../authContext";
import ProfileDrawer from "./profileDrawer";
import { Link, useNavigate } from "react-router-dom";

function Header({name}) {
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();

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
      <button
        className="back-button"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowLeft size={"30px"}/>
      </button>
    </div>
  );
}

export default Header;