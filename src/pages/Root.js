import { Link, redirect } from "react-router-dom";
import { useAuth } from "../authContext";
import Header from "../components/header";
import { useEffect, useState } from "react";
import axios from "axios";

export async function validateToken() {
  const bearerToken = localStorage.getItem('authToken');

  if (bearerToken === undefined || bearerToken === null) {
    return redirect(`/login`);
  }

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    await axios.get('http://127.0.0.1:3000/businesses/tokens/info', {
      headers: headers
    });
    return null;
  } catch (error) {
    localStorage.removeItem('authToken');
    return redirect(`/login`);
  }
}


function Root() {
  const {authToken, isValid, setIsValid} = useAuth();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // useEffect(() => {
  //   async function validateToken() {
  //     const bearerToken = localStorage.getItem('authToken');

  //     if(isFirstLoad){
  //       await new Promise(resolve => setTimeout(resolve, 300));
  //       setIsFirstLoad(false);
  //     }
  
  //     if (bearerToken === undefined || bearerToken === null) {
  //       setIsValid(false);
  //       return redirect(`/login`);
  //     }
  
  //     const headers = {
  //       'Authorization': `Bearer ${bearerToken}`,
  //       'Content-Type': 'application/json',
  //     };
  
  //     try {
  //       await axios.get('http://127.0.0.1:3000/businesses/tokens/info', {
  //         headers: headers
  //       });
  //       setIsValid(true);
  //     } catch (error) {
  //       setIsValid(false);
  //       return redirect(`/login`);
  //     }
  //     return redirect(`/login`);
  //   }
  
  //   validateToken();
  // }, [authToken]);

  return (
    <div>
    <Header/>
      <h2>Home</h2>
    </div>
  );
}

export default Root;