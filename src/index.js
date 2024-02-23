import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './authContext';
import Root from './pages/Root';
import Login from './pages/Login';
import { validateToken } from './pages/Root';
import { logOut } from './pages/Login';
import { action } from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    loader: validateToken
  },
  {
    path: "/login",
    element: <Login/>,
    loader: logOut,
    action: action
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
