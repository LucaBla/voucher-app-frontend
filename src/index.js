import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './authContext';
import Root from './pages/Root';
import Login from './pages/Login';
import { loader as rootLoader } from './pages/Root';
import { logOut } from './pages/Login';
import { action as loginAction} from './pages/Login';
import { loader as vouchersLoader } from './pages/Vouchers';
import Vouchers from './pages/Vouchers';
import Voucher from './pages/Voucher';
import { loader as voucherLoader } from './pages/Voucher'
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    loader: rootLoader
  },
  {
    path: "/login",
    element: <Login/>,
    loader: logOut,
    action: loginAction
  },
  {
    path: "/vouchers",
    element: <Vouchers/>,
    loader: vouchersLoader,
  },
  {
    path: "/vouchers/:voucherId",
    element: <Voucher/>,
    loader: voucherLoader,
  }
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
