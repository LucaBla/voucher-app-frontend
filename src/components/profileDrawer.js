import { LogOut, User } from "react-feather";
import '../styles/components/header.css';
import { useAuth } from "../authContext";
import { useState } from "react";
import '../styles/components/ProfileDrawer.css'
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

function toggleDrawer(isDrawerOpen, setIsDrawerOpen){
  setIsDrawerOpen(!isDrawerOpen);
}

function ProfileDrawer({name}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {setToken} = useAuth();

  const drawerAnimation = useSpring({
    transform: isDrawerOpen ? 'translateX(0%)' : 'translateX(100%)',
    opacity: isDrawerOpen ? 1 : 0,
    onStart: () =>{
      setDrawerWrapperDisplay('grid');
    },
    onRest: () => {
      if (!isDrawerOpen) {
        setDrawerWrapperDisplay('none');
      }
    },
  });

  const drawerBGAnimation = useSpring({
    opacity: isDrawerOpen ? "100%" : "0%",
  });

  const setDrawerWrapperDisplay = (display) => {
    // Set DrawerWrapper display style
    document.querySelector('.DrawerWrapper').style.display = display;
  };

  return (
    <div>
      <div className="ProfileIcon" onClick={()=>toggleDrawer(isDrawerOpen, setIsDrawerOpen)}>
        <User color={'white'} size={32}/>
      </div>
      <div className="DrawerWrapper">
        <animated.div 
          className="DrawerBG"
          onClick={()=>toggleDrawer(isDrawerOpen, setIsDrawerOpen)}
          style={drawerBGAnimation}
        > 
        </animated.div>
        <animated.div className="Drawer" style={drawerAnimation}>
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
              <LogOut/>
              LogOut
            </Link>
          </div>
        </animated.div>
      </div>
    </div>
  );
}

export default ProfileDrawer;