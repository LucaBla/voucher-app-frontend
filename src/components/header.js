import { ArrowLeft, User } from "react-feather";
import '../styles/components/header.css';
import { useAuth } from "../authContext";
import ProfileDrawer from "./profileDrawer";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Box, Button, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { AddOutlined, Inventory2Outlined, Logout, LogoutOutlined, PersonOutline, QrCodeScannerOutlined, SettingsOutlined } from "@mui/icons-material";
import { useState } from "react";

function Header({name}) {
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="HeaderWrapper">
      <Link to={`/`} className="HeaderTitle">
        <Typography 
          variant="h1"
          sx={{
            fontSize:'40px', 
            fontWeight:'bold', 
            margin: '10px 0px',
            color: '#c8c8c8'
            }}
        >
          ScanVoucher
        </Typography>
      </Link>
      {authToken?
        <>
          <IconButton color="white" onClick={()=>setDrawerOpen(true)}>
            <PersonOutline/>
          </IconButton>
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
              <List component="nav">
                <ListItemButton component={NavLink} to={`/vouchers/`} end>
                  <ListItemIcon>
                    <Inventory2Outlined/>
                  </ListItemIcon>
                  <ListItemText primary="Overview"/>
                </ListItemButton>
                <ListItemButton component={NavLink} to={`/vouchers/create`}>
                  <ListItemIcon>
                    <AddOutlined/>
                  </ListItemIcon>
                  <ListItemText primary="Create"/>
                </ListItemButton>
                <ListItemButton component={NavLink} to={`/vouchers/scan`}>
                  <ListItemIcon>
                    <QrCodeScannerOutlined/>
                  </ListItemIcon>
                  <ListItemText primary="Scan"/>
                </ListItemButton>
                <ListItemButton component={NavLink} to={`/settings`}>
                  <ListItemIcon>
                    <SettingsOutlined/>
                  </ListItemIcon>
                  <ListItemText primary="Settings"/>
                </ListItemButton>
                <ListItemButton component={NavLink} to={`/login`}>
                  <ListItemIcon>
                    <LogoutOutlined/>
                  </ListItemIcon>
                  <ListItemText primary="LogOut"/>
                </ListItemButton>
              </List>
            </div>
            </Box>
          </Drawer>
        </>
        :
        <></>
      }
    </div>
  );
}

export default Header;