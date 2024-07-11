import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { useAuth } from "../authContext";
import Header from "../components/header";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../index";
import Footer from "../components/footer";

export async function loader({request}) {
  const bearerToken = getBearerToken();
  const showPattern = /^(https?:\/\/)?[^\/]+\/vouchers\/[0-9a-fA-F\-]+$/;

  if (bearerToken === undefined || bearerToken === null) {
    if(showPattern.test(request.url)){
      return {};
    }
    return redirect(`/login`);
  }

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get(`${backendUrl}/businesses/tokens/info`, {
      headers: headers
    });
    return response.data;
  } catch (error) {
    localStorage.removeItem('authToken');
    return redirect(`/login`);
  }
}

export function getBearerToken(){
  const bearerToken = localStorage.getItem('authToken');

  if(isBearerTokenValid(bearerToken)){
    return bearerToken;
  }
  else{
    const refreshToken = localStorage.getItem('refreshToken');

    if(!refreshToken) {
      return redirect(`/login`);
    }

    const newAuthToken = refreshToken(refreshToken);
    localStorage.setItem('authToken', newAuthToken);

    return newAuthToken;
  }
}

async function refreshToken(refreshToken){
  const headers = {
    'Authorization': `Bearer ${refreshToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(
      `${backendUrl}/businesses/tokens/refresh`, 
      { headers: headers }
    );

    console.log(response);
    return response.token;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function isBearerTokenValid(bearerToken){
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get(
      `${backendUrl}/businesses/tokens/info`, 
      { headers: headers }
    );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}


function Root() {
  const {authToken, isValid, setIsValid} = useAuth();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const data = useLoaderData();

  return (
    <div className="content">
      <Header name={data.name}/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default Root;

//<Home name={data.name}/>