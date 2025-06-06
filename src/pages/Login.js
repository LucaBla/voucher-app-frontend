import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../authContext';
import '../styles/pages/Login.css'
import { Form, redirect, useActionData, useLoaderData, useRouteError } from 'react-router-dom';
import { backendUrl } from "../index";
import { Box, Button, Container, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { LoginOutlined } from '@mui/icons-material';
import SettingsSnackbar from '../components/SettingsSnackbar';

async function loginUser(email, password) {
  return axios.post(`${backendUrl}/businesses/tokens/sign_in`, {
    email: email,
    password: password,
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error(`Login failed: ${error.response.statusText}`);
    });
}

export function logOut(){
  localStorage.removeItem('authToken');
  return null;
}

export async function action({request, params}){
  const formData = await request.formData();
  const object = Object.fromEntries(formData);
  try{
    const loginObject = await loginUser(object.email, object.password);
    const token = loginObject.token;
    const refreshToken = loginObject.refresh_token;

    localStorage.setItem('authToken', token);
    localStorage.setItem('refreshToken', refreshToken);
  }
  catch(error){
    return error;
  }
  
  return redirect(`/`);
}

function Login() {
  const error = useActionData();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if(error){
      setIsSnackBarOpen(true);
    }
  }, [error]);

  return (
    <Container class='LoginBG'>
      <SettingsSnackbar
        isSnackBarOpen={isSnackBarOpen} 
        handleSnackbarClose={()=>setIsSnackBarOpen(false)}
        snackbarContent="Login Failed."
        severity = "error"
      />
      <Typography 
        variant='h1' 
        class="login-bg-header"
      >
        ScanVoucher
      </Typography>
      <Box class='LoginWrapper'>
        <Stack 
          component={Form} 
          method='post' 
          class='FormWrapper'
        >
          <Box>
            <Typography 
              variant='h2' 
            >
              Login
            </Typography>
            <Typography 
              variant='subtitle1' 
              textAlign={"center"}
            >
              Login to start!
            </Typography>
          </Box>
          <TextField 
            name="email" 
            required
            label="Email" 
            variant="outlined"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField 
            name="password" 
            required
            label="Password" 
            variant="outlined"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop:"20px",
              width:"100%", 
              backgroundColor:"black"
            }}
            size="large"
            endIcon={<LoginOutlined/>}
          >
            Login
          </Button>
        </Stack>
        <div className='ImageWrapper'>
          {!loaded &&(
            <Skeleton
              variant='rectangular'
              width="100%"
              height="100%"
              sx={{ bgcolor: 'grey' }}
            />
          )}
          <img 
            src='/images/bg.jpg' 
            className='LoginImage'
            onLoad={() => setLoaded(true)}
          />
        </div>
      </Box>
    </Container>
  );
}

export default Login;