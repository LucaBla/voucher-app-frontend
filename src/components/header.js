import { User } from "react-feather";
import '../styles/components/header.css';
import { useAuth } from "../authContext";
import ProfileDrawer from "./profileDrawer";

function Header() {
  const authToken = localStorage.getItem('authToken');;

  return (
    <div className="HeaderWrapper">
      <h1>ScanVoucher</h1>
      {authToken?
        <ProfileDrawer/>
        :
        <></>
      }
    </div>
  );
}

export default Header;