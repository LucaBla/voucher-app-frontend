import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../authContext';
import '../styles/pages/Login.css'
import { Form, redirect } from 'react-router-dom';

async function loginUser(email, password) {
  return axios.post('http://127.0.0.1:3000/businesses/tokens/sign_in', {
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
    <div className='LoginBG'>
    <h1>ScanVoucher</h1>
      <div className='LoginWrapper'>
        <Form className='FormWrapper' method='post'>
          <h2>Anmeldung</h2>
          <p>Anmelden um zu starten!</p>
          <div className='Field'>
            <label htmlFor='Email'>Email:</label>
              <input id='Email' name='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='Field'>
            <label htmlFor='Password'>Passwort:</label>
              <input id='Password' name='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type='submit'>Anmelden</button>
        </Form>
        <div className='ImageWrapper'>
          <img src='/images/placeholder.jpg' className='LoginImage'/>
        </div>
      </div>
    </div>
  );
}

export default Login;