import { ArrowLeft, User } from "react-feather";
import '../styles/components/header.css';
import { useAuth } from "../authContext";
import ProfileDrawer from "./profileDrawer";
import { Link, useNavigate } from "react-router-dom";
import { Box, Drawer } from "@mui/material";
import { Logout, PersonOutline } from "@mui/icons-material";
import { useState } from "react";

function Header({name}) {
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="HeaderWrapper">
      <Link to={`/`} className="HeaderTitle">
        <h1>ScanVoucher</h1>
      </Link>
      {authToken?
        <>
          <PersonOutline onClick={()=>setDrawerOpen(true)}/>
          <Drawer 
            open={drawerOpen}
            onClose={()=>setDrawerOpen(false)}
            anchor="right"
          >
            <Box>
              <div className="DrawerHeader">
                <div className="LogoWrapper">
                  <img src="/images/logo-placeholder-image.png"/>
                </div>
                <div className="InfoWrapper">
                  {name}
                </div>
            </div>
            <div className="DrawerContent">
              <Link to={`/login`}>
                <Logout/>
                LogOut
              </Link>
            </div>
            </Box>
          </Drawer>
        </>
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