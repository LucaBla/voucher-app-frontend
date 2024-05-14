import { useState } from "react";
import { Form, Link, redirect, useLoaderData, useSubmit } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../index";
import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Cancel, CheckCircle, KeyboardArrowDown } from "@mui/icons-material";
import { DataGrid } from '@mui/x-data-grid';

export async function loader({request}) {
  const bearerToken = localStorage.getItem('authToken');

  if (bearerToken === undefined || bearerToken === null) {
    return redirect(`/login`);
  }

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  const url = new URL(request.url);
  const status = url.searchParams.get('status');

  try {
    const response = await axios.get(`${backendUrl}/vouchers`,
     {
      headers: headers,
      params: {
        status: status
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function Vouchers() {
  const vouchers = useLoaderData();
  const submit = useSubmit();
  const [voucherStatus, setVoucherStatus] = useState(['active', 'inactive']);
  const today = new Date();
  const columns = [
    {
      field: 'id', 
      headerName: 'ID', 
      width: 700,
      renderCell: (params) =>
        <Link to={`/vouchers/${params.value}`}>{params.value}</Link>,
    },
    {
      field: 'created_at', 
      headerName: 'Date', 
      width: 300,
      valueGetter: (value) => 
        `${new Date(value).toLocaleDateString('de-DE')}`
    },
    {field: 'value', headerName: 'Value', width: 100},
    {
      field: 'unit', 
      headerName: 'Unit', 
      width: 100,
      valueGetter: (value) => 
        `${value.name}`
    },
    {
      field: 'status', 
      headerName: 'Status', 
      width: 100,
      renderCell: (params) =>
        (params.value === 'active' ? 
          <CheckCircle sx={{color: '#33FF00'}}/> : 
          <Cancel sx={{color: 'red'}}/>
        ),
    },
    {
      field: 'expiry_date', 
      headerName: 'Expiry Date', 
      width: 300, 
      renderCell: (params) => {
        const expiryDate = new Date(params.value);
        const isExpired = expiryDate < today;
        return (
          <span style={{ color: isExpired ? 'red' : 'inherit' }}>
            {expiryDate.toLocaleDateString('de-DE')}
          </span>
        );
      },
    },
  ]

  const getStatusIconColor = (icon) =>{
    if(voucherStatus.includes('active') && icon === 'check'){
      return '#33FF00';
    }
    if(voucherStatus.includes('inactive') && icon === 'circle'){
      return 'red';
    }
    else{
      return 'white';
    }
  }

  const handleRadioClick = (event) => {
    const selectedValue = event.target.value;
    if(!voucherStatus.includes(selectedValue)){
      setVoucherStatus([...voucherStatus, selectedValue]);
    }
    else{
      const newStatus = voucherStatus.filter(status => status !== selectedValue)
      setVoucherStatus(newStatus)
    }
    console.log(selectedValue);
    submit(event.currentTarget.form)
  };

  return(
    <>
    <Accordion disableGutters>
      <AccordionSummary 
        expandIcon={<KeyboardArrowDown/>} 
        sx={{backgroundColor: '#2556', color: 'white', border: '1px solid gray'}}
      >
        Filter
      </AccordionSummary>
      <AccordionDetails sx={{backgroundColor: '#2556', color: 'white'}}>
        <Form>
          <fieldset>
            <span>Status</span>
            <div className="radio-button-wrapper">
              <label>
                <input 
                  type="checkbox" 
                  name="status" 
                  value="active" 
                  checked={voucherStatus === 'active'} 
                  className="status-input" 
                  onChange={handleRadioClick}
                />
                <CheckCircle sx={{color: `${getStatusIconColor('check')}`}}/>
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="status" 
                  value="inactive" 
                  checked={voucherStatus === 'inactive'} 
                  className="status-input" 
                  onChange={handleRadioClick}
                />
                <Cancel sx={{color: `${getStatusIconColor('circle')}`}}/>
              </label>
            </div>
          </fieldset>
        </Form>
      </AccordionDetails>
    </Accordion>
      <DataGrid
        columns={columns}
        rows={vouchers}
        checkboxSelection
      />
    </>
  );

}

export default Vouchers;