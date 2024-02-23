import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Home from './pages/Root';
import axios from 'axios';
import { useAuth } from './authContext';
import Loading from './pages/Loading';


function App() {
  const {authToken, isValid, setIsValid} = useAuth();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    async function validateToken() {
      const bearerToken = localStorage.getItem('authToken');

      if(isFirstLoad){
        await new Promise(resolve => setTimeout(resolve, 300));
        setIsFirstLoad(false);
      }
  
      if (bearerToken === undefined || bearerToken === null) {
        setIsValid(false);
        return;
      }
  
      const headers = {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      };
  
      try {
        await axios.get('http://127.0.0.1:3000/businesses/tokens/info', {
          headers: headers
        });
        setIsValid(true);
      } catch (error) {
        setIsValid(false);
      }
    }
  
    validateToken();
  }, [authToken]);

  return (
    <div className="App">
      {isValid === null ? (
        <Loading/>
      ) : isValid ? (
        <Home />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
