import { Box, Button, Container, Input } from "@mui/material";
import { Form } from "react-router-dom";
import { backendUrl, frontendUrl } from "../index";
import { Link, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";

export async function loader({ params }) {
  const bearerToken = localStorage.getItem('authToken');

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

    console.log(response.data);
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
  const bearerToken = localStorage.getItem('authToken');

  let formData= Object.fromEntries(await request.formData());
  console.log(formData);

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

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function Settings() {
  const business = useLoaderData();

  return (
    <Container>
      <h2>Settings</h2>
      <Form method='put'>
        <label>
          <span>Business Name</span>
          <Input name="name" defaultValue={business.name}></Input>
        </label>
        <label>
          <span>Phone Number</span>
          <Input name="phone_number" defaultValue={business.phone_number}></Input>
        </label>
        <label>
          <span>Email</span>
          <Input name="email" defaultValue={business.email}></Input>
        </label>
        <Box>
          <span>Location</span>
          <label>
            <span>Street</span>
            <Input name="street" defaultValue={business.street}></Input>
          </label>
          <label>
            <span>Apt, Suite, Bldg</span>
            <Input name="apt_suite_bldg" defaultValue={business.apt_suite_bldg}></Input>
          </label>
          <label>
            <span>City</span>
            <Input name="city" defaultValue={business.city}></Input>
          </label>
          <label>
            <span>State</span>
            <Input name="state" defaultValue={business.state}></Input>
          </label>
          <label>
            <span>Zip Code</span>
            <Input name="zip_code" defaultValue={business.zip_code}></Input>
          </label>
          <label>
            <span>Country</span>
            <Input name="country" defaultValue={business.country}></Input>
          </label>
        </Box>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  ); 
}

export default Settings;