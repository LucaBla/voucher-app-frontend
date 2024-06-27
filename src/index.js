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
import EditVoucher from './pages/EditVoucher';
import { loader as editVoucherLoader} from './pages/EditVoucher'
import {action as updateVoucherAction} from './pages/EditVoucher';
import { loader as createVoucherLoader} from './pages/CreateVoucher'
import { action as createVoucherAction} from './pages/CreateVoucher';
import CreateVoucher from './pages/CreateVoucher';
import Home from './pages/Home';
import ScanVoucher from './pages/ScanVoucher';
import {action as destroyVoucherAction} from './pages/Destroy';
import {action as destroyUnitAction} from './pages/DestroyUnit';
import {action as createUnitAction} from './pages/CreateUnit';
import Error from './pages/Error';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Settings from './pages/Settings';
import { loader as businessLoader} from './pages/Settings'
import { action as updateBusinessAction} from './pages/Settings'
import {action as bulkDestroyVouchersAction} from './components/CustomToolbar'
import {action as sendVoucherAction} from './pages/SendVoucher'

export const frontendUrl = "http://127.0.0.1:3001";
export const  backendUrl = "http://127.0.0.1:3000";
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    loader: rootLoader,
    errorElement: <Error/>,
    children: [
      {index: true, element: <Home/>, loader: rootLoader,},
      {
        path: "/settings",
        element: <Settings/>,
        loader: businessLoader,
        action: updateBusinessAction,
      },
      {
        path: "/settings/units/create",
        action: createUnitAction,
      },
      {
        path: "/settings/units/:unitId/destroy",
        action: destroyUnitAction,
      },
      {
        path: "/vouchers",
        element: <Vouchers/>,
        loader: vouchersLoader,
      },
      {
        path: "/vouchers/create",
        element: <CreateVoucher/>,
        loader: createVoucherLoader,
        action: createVoucherAction,
      },
      {
        path: "/vouchers/scan",
        element: <ScanVoucher/>,
      },
      {
        path: "/vouchers/:voucherId",
        element: <Voucher/>,
        loader: voucherLoader,
      },
      {
        path: "/vouchers/:voucherId/send",
        action: sendVoucherAction,
      },
      {
        path: "/vouchers/:voucherId/edit",
        element: <EditVoucher/>,
        loader: editVoucherLoader,
        action: updateVoucherAction,
      },
      {
        path: "/vouchers/:voucherId/edit/destroy",
        action: destroyVoucherAction,
      },
      {
        path: "/vouchers/bulk_destroy",
        action: bulkDestroyVouchersAction,
      },
    ],
  },
  {
    path: "/login",
    element: <Login/>,
    loader: logOut,
    action: loginAction
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router}/>
      </LocalizationProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
