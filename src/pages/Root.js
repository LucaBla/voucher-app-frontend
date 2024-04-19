import { Link, redirect, useLoaderData } from "react-router-dom";
import { useAuth } from "../authContext";
import Header from "../components/header";
import Home from "./Home";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../index";

export async function loader() {
  const bearerToken = localStorage.getItem('authToken');

  if (bearerToken === undefined || bearerToken === null) {
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


function Root() {
  const {authToken, isValid, setIsValid} = useAuth();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const data = useLoaderData();

  return (
    <div>
      <Header name={data.name}/>
      <Home name={data.name}/>
    </div>
  );
}

export default Root;