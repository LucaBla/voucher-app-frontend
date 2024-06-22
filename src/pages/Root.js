import { Link, Outlet, redirect, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { useAuth } from "../authContext";
import Header from "../components/header";
import Home from "./Home";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../index";
import Footer from "../components/footer";
import { ArrowLeft } from "react-feather";

export async function loader({request}) {
  const bearerToken = localStorage.getItem('authToken');
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