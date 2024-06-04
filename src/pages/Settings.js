import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Input, List, ListItem, ListItemText, Snackbar, TextField } from "@mui/material";
import { Form } from "react-router-dom";
import { backendUrl, frontendUrl } from "../index";
import { Link, redirect, useLoaderData, useNavigation } from "react-router-dom";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { AddOutlined, Delete, DeleteOutline, SaveOutlined } from "@mui/icons-material";
import { useState } from "react";

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

  console.log(navigation.state);

  if(
    navigation.state === "loading" && 
    navigation.formData != null && 
    //navigation.formAction === navigation.location.pathname &&
    !isSnackBarOpen
  ){
    handleSnackbarOpen();
    getSnackbarContent();
    console.log(navigation.formAction);
  }

  return (
    <Container>
      <Snackbar
        open={isSnackBarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        sx={{ top: { xs: 0, sm: 100 } }}
      >
        <Alert severity="success" variant="filled">
          {snackbarContent}
        </Alert>  
      </Snackbar>
      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        component={Form}
        method="post"
        action={`/settings/units/create`}
        //onSubmit={handleModalClose}
      >
        <DialogTitle>Add Unit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a Name for the unit.
          </DialogContentText>
          <TextField 
            required 
            name="unit_name" 
            label="Unit Name" 
            variant="standard" 
            fullWidth  
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>
            Close
          </Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
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
        <LoadingButton 
          type="submit" 
          loading={navigation.state === "submitting" || navigation.state === "loading"} 
          loadingPosition="end" 
          endIcon={<SaveOutlined/>} 
          variant="contained"
        >
          <span>Submit</span>
        </LoadingButton>
      </Form>
        <Box>
          <span>Units</span>
          <List sx={{ bgcolor: 'green' }}>
            {business.units.map((unit) =>
              <ListItem 
                key={unit.id}
                secondaryAction={
                  <Form
                    method="post"
                    action={`/settings/units/${unit.id}/destroy`}
                    onSubmit={(event) =>{
                      if(
                        !window.confirm(
                          "Are you sure you want to delete this Unit? This will delete all related Vouchers!"
                        )
                      ){
                        event.preventDefault();
                      }
                    }}
                  >
                    <IconButton edge="end" type="submit">
                      <DeleteOutline/>
                    </IconButton>
                  </Form>
                }
              >
                <ListItemText primary={unit.name}/>
              </ListItem>
            )}
          </List>
          <Button 
            endIcon={<AddOutlined/>} 
            variant="contained" 
            onClick={handleModalOpen}
          >
            <span>Add Unit</span>
          </Button>
        </Box>
    </Container>
  ); 
}

export default Settings;