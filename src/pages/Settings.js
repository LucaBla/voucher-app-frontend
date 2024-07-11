import { Container } from "@mui/material";
import { backendUrl } from "../index";
import { redirect, useLoaderData, useNavigation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import SettingsSnackbar from "../components/SettingsSnackbar";
import CreateUnitDialog from "../components/CreateUnitDialog";
import UpdateProfileForm from "../components/UpdateProfileForm";
import UnitsList from "../components/UnitsList";
import { getBearerToken } from "./Root";
import '../styles/pages/Settings.css'

export async function loader() {
  const bearerToken = getBearerToken();

  if (bearerToken === undefined || bearerToken === null) {
    return redirect(`/login`);
  }

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get(
      `${backendUrl}/businesses/self`, 
      { headers: headers }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function action({ request, params }){
  const business = await updateBusiness(request, params);

  return redirect(`/settings`);
}

async function updateBusiness(request, params){
  const bearerToken = getBearerToken();

  let formData= Object.fromEntries(await request.formData());

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.put(
      `${backendUrl}/businesses/self`, 
      formData,
      { 
        headers: headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function matchesPattern(url) {
  const pattern = /^\/settings\/units\/\d+\/destroy$/;
  return pattern.test(url);
}

function Settings() {
  const business = useLoaderData();
  const navigation = useNavigation();
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState('');

  const handleSnackbarOpen= ()=>{
    setIsSnackBarOpen(true);
  }

  const handleSnackbarClose = ()=>{
    setIsSnackBarOpen(false);
  }

  const handleModalOpen= ()=>{
    setIsModalOpen(true);
  }

  const handleModalClose = ()=>{
    setIsModalOpen(false);
  }

  const getSnackbarContent = ()=>{
    if(navigation.formAction === '/settings'){
      setSnackbarContent('Profile Updated Successfully.');
    }
    else if(navigation.formAction === '/settings/units/create'){
      setSnackbarContent('New Unit Created Successfully.');
    }
    else if(matchesPattern(navigation.formAction)){
      setSnackbarContent('Unit Deleted.');
    }
    else{
      setSnackbarContent('No Content.');
    }
  }

  if(
    navigation.state === "loading" && 
    navigation.formData != null && 
    !isSnackBarOpen
  ){
    handleSnackbarOpen();
    getSnackbarContent();
  }

  return (
    <Container
      className="settingsContainer"
    >
      <SettingsSnackbar
        isSnackBarOpen={isSnackBarOpen}
        handleSnackbarClose={handleSnackbarClose}
        snackbarContent={snackbarContent}
      />
      <CreateUnitDialog
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      />
      <UpdateProfileForm
        business={business}
         navigation={navigation}
      />
        <UnitsList
          business={business}
          handleModalOpen={handleModalOpen}
        />
    </Container>
  ); 
}

export default Settings;