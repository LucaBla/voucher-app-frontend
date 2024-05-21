import { useState, useRef, useEffect } from "react";
import { Form, Link, redirect, useLoaderData, useSubmit } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../index";
import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody, Accordion, AccordionSummary, AccordionDetails, DateRangePicker, Select, OutlinedInput, Box, Chip, MenuItem } from "@mui/material";
import { Cancel, CheckCircle, KeyboardArrowDown } from "@mui/icons-material";
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


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

  const status = url.searchParams.getAll('status');
  const minValue = url.searchParams.get('min_value');
  const maxValue = url.searchParams.get('max_value');
  let unitID = url.searchParams.getAll('unit_id');
  let createdAfter = url.searchParams.get('created_after');
  let createdUntil = url.searchParams.get('created_until');
  let expiresAfter = url.searchParams.get('expires_after');
  let expiresUntil = url.searchParams.get('expires_until');

  if(unitID[0] === ''){
    unitID = [];
  }
  else if(typeof unitID[0] === 'string'){
    unitID = unitID[0].split(',').map(Number);
  }

  if(createdAfter){
    createdAfter = new Date(createdAfter);
  }

  if(createdUntil){
    createdUntil = new Date(createdUntil);
    createdUntil.setHours(23, 59, 59, 999);
  }

  if(expiresAfter){
    expiresAfter = new Date(expiresAfter);
    console.log(expiresAfter)
  }

  if(expiresUntil){
    expiresUntil = new Date(expiresUntil);
    expiresUntil.setHours(23, 59, 59, 999);
  }

  let vouchers;
  let units;

  try {
    const response = await axios.get(`${backendUrl}/vouchers`,
     {
      headers: headers,
      params: {
        status: status,
        min_value: minValue,
        max_value: maxValue,
        unit_id: unitID,
        created_after: createdAfter,
        created_until: createdUntil,
        expires_after: expiresAfter,
        expires_until: expiresUntil,
      }
    });

    vouchers = response.data;
  } catch (error) {
    console.error(error);
  }
  try{
    const response = await axios.get(
      `${backendUrl}/units/`, 
      { headers: headers }
    );

    units = response.data;
  } catch (error) {
    console.error(error);
  }

  return {
    vouchers, status, units, unitID, minValue, maxValue, 
    createdAfter, createdUntil, expiresAfter, expiresUntil
  };
}

function Vouchers() {
  const {
    vouchers, status, units, unitID, minValue, maxValue, 
    createdAfter, createdUntil, expiresAfter, expiresUntil
  } = useLoaderData();
  const [hasMounted, setHasMounted] = useState(false);
  const [voucherStatus, setVoucherStatus] = useState([...status]);
  const [selectedUnits, setSelectedUnits] = useState([...unitID]);
  const formRef = useRef(null);
  const submit = useSubmit();
  const today = new Date();

  console.log(createdAfter);

  useEffect(() =>{
    if(!hasMounted){
      setHasMounted(true);
      return;
    }

    if (formRef.current) {
      submit(formRef.current);
    } else {
      console.error('Formular-Ref nicht gefunden!');
    }
  }, [selectedUnits])

  const columns = [
    {
      field: 'id', 
      headerName: 'ID', 
      width: 500,
      renderCell: (params) =>
        <Link to={`/vouchers/${params.value}`}>{params.value}</Link>,
    },
    {
      field: 'created_at', 
      headerName: 'Date', 
      width: 200,
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
        if(!params.value){
          return <span>-</span>
        }
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

    submit(event.currentTarget.form)
  };

  const handleValueInput = (event) => {
    submit(event.currentTarget.form)
  }

  const handleUnitChange = (event) =>{
    const inputSelectedUnits = event.target.value;

    setSelectedUnits([...inputSelectedUnits]);
  }

  const handleDateChange = (value) => {
    if (formRef.current) {
      submit(formRef.current);
    } else {
      console.error('Formular-Ref nicht gefunden!');
    }
  }

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
        <Form ref={formRef}>
          <fieldset>
            <span>Status</span>
            <div className="radio-button-wrapper">
              <label>
                <input 
                  type="checkbox" 
                  name="status" 
                  value="active" 
                  checked={voucherStatus.includes('active')} 
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
                  checked={voucherStatus.includes('inactive')} 
                  className="status-input" 
                  onChange={handleRadioClick}
                />
                <Cancel sx={{color: `${getStatusIconColor('circle')}`}}/>
              </label>
            </div>
          </fieldset>
          <fieldset>
          <label>
            Min Value
            <input
              type="text"
              name="min_value"
              defaultValue={minValue}
              onChange={handleValueInput}
            />
          </label>
          <label>
            Max Value
            <input
              type="text"
              name="max_value"
              defaultValue={maxValue}
              onChange={handleValueInput}
            />
          </label>
          </fieldset>
          <label>
            <span>Unit</span>
            <Select
              name="unit_id"
              multiple
              value={selectedUnits}
              onChange={handleUnitChange}
              input={<OutlinedInput/>}
              renderValue={(selected) =>(
                <Box>
                  {selected.map((value) =>{
                    const unit = units.find(unit => unit.id === value);
                    const label = unit ? unit.name : 'Unknown Unit';
                    return(
                      <Chip key={value} label={label}/>
                    )
                  }
                  )}
                </Box>
              )}
            >
              {units.map((unit, index) => (
                <MenuItem
                  key={index}
                  value={unit.id}
                >
                  {unit.name}
                </MenuItem>
              ))}
            </Select>
          </label>
          <fieldset>
            <DatePicker
              name="created_after"
              defaultValue={createdAfter ? dayjs(createdAfter) : undefined}
              onChange={handleDateChange}
              slotProps={{field: {clearable: true}}}
            />
            <DatePicker
              name="created_until"
              defaultValue={createdUntil ? dayjs(createdUntil) : undefined}
              onChange={handleDateChange}
              slotProps={{field: {clearable: true}}}
            />
          </fieldset>
          <fieldset>
            <DatePicker
              name="expires_after"
              defaultValue={expiresAfter ? dayjs(expiresAfter) : undefined}
              onChange={handleDateChange}
              slotProps={{field: {clearable: true}}}
            />
            <DatePicker
              name="expires_until"
              defaultValue={expiresUntil ? dayjs(expiresUntil) : undefined}
              onChange={handleDateChange}
              slotProps={{field: {clearable: true}}}
            />
          </fieldset>
          <label>
            <span>No Expiry Date Vouchers</span>
            <input type="checkbox" defaultChecked/>
          </label>
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