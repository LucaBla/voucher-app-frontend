import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../authContext';
import '../styles/pages/Login.css'
import { Form, redirect } from 'react-router-dom';
import { backendUrl } from "../index";
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { LoginOutlined } from '@mui/icons-material';

async function loginUser(email, password) {
  return axios.post(`${backendUrl}/businesses/tokens/sign_in`, {
    email: email,
    password: password,
  })
    .then(response => {
      return response.data.token;
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
    const token = await loginUser(object.email, object.password);
    localStorage.setItem('authToken', token);
  }
  catch(error){
    return null;
  }
  
  //await updateContact(params.contactId, updates);
  return redirect(`/`);
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setToken} = useAuth();

  const handleLogin = async () => {
    try {
      const token = await loginUser(email, password);
      localStorage.setItem('authToken', token);
      setToken(token);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Container class='LoginBG'>
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
          <img src='/images/placeholder.jpg' className='LoginImage'/>
        </div>
      </Box>
    </Container>
  );
}

export default Login;