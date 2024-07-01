import '../styles/components/header.css';
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { AddOutlined, Inventory2Outlined, LogoutOutlined, PersonOutline, QrCodeScannerOutlined, SettingsOutlined } from "@mui/icons-material";
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
            <PersonOutline sx={{color: '#c8c8c8'}}/>
          </IconButton>
          <Drawer 
            open={drawerOpen}
            onClose={()=>setDrawerOpen(false)}
            anchor="right"
            PaperProps={{
              sx:{
                backgroundColor: "#393D3F",
                color: "white",
                width: "25%",
              }
            }}
          >
            <Box>
              <List component="nav">
                <ListItemButton 
                  component={NavLink} 
                  to={`/vouchers/`} 
                  end
                  size="large"
                >
                  <ListItemIcon>
                    <Inventory2Outlined
                      sx={{color: "white"}}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Overview"/>
                </ListItemButton>
                <ListItemButton component={NavLink} to={`/vouchers/create`}>
                  <ListItemIcon>
                    <AddOutlined
                      sx={{color: "white"}}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Create"/>
                </ListItemButton>
                <ListItemButton component={NavLink} to={`/vouchers/scan`}>
                  <ListItemIcon>
                    <QrCodeScannerOutlined
                      sx={{color: "white"}}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Scan"/>
                </ListItemButton>
                <ListItemButton component={NavLink} to={`/settings`}>
                  <ListItemIcon>
                    <SettingsOutlined
                      sx={{color: "white"}}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Settings"/>
                </ListItemButton>
                <ListItemButton component={NavLink} to={`/login`}>
                  <ListItemIcon>
                    <LogoutOutlined
                      sx={{color: "white"}}
                    />
                  </ListItemIcon>
                  <ListItemText primary="LogOut"/>
                </ListItemButton>
              </List>
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