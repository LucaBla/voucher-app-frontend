import { useState, useRef, useEffect } from "react";
import { Form, Link, redirect, useLoaderData, useSubmit } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../index";
import {  Accordion, AccordionSummary, AccordionDetails, Select, OutlinedInput, Box, Chip, MenuItem, Checkbox, Card, Stack, TextField, Typography } from "@mui/material";
import { Cancel, CheckCircle, CheckOutlined, CloseOutlined, CreditCardOutlined, FunctionsOutlined, KeyboardArrowDown } from "@mui/icons-material";
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CustomToolbar from "../components/CustomToolbar";


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
  let hasExpiryDate = url.searchParams.get('has_expiry_date');

  if(unitID[0] === ''){
    unitID = [];
  }
  else if(typeof unitID[0] === 'string'){
    unitID = unitID[0].split(',').map(Number);
  }

  createdAfter = stringToDate(createdAfter);
  createdUntil = stringToDate(createdUntil, true);

  expiresAfter = stringToDate(expiresAfter);
  expiresUntil = stringToDate(expiresUntil, true);

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
        has_expiry_date: hasExpiryDate
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
    createdAfter, createdUntil, expiresAfter, expiresUntil,
    hasExpiryDate
  };
}

function stringToDate(dateString, setToMaxHours = false){
  let date;

  if(dateString){
    date = new Date(dateString);
    if(isNaN(date)){
      date = null;
    }
  }

  if(setToMaxHours && date !== null && !isNaN(date)){
    date.setHours(23, 59, 59, 999);
  }

  return date;
}

function Vouchers() {
  const {
    vouchers, status, units, unitID, minValue, maxValue, 
    createdAfter, createdUntil, expiresAfter, expiresUntil, 
    hasExpiryDate
  } = useLoaderData();
  const [hasMounted, setHasMounted] = useState(false);
  const [voucherStatus, setVoucherStatus] = useState([...status]);
  const [selectedUnits, setSelectedUnits] = useState([...unitID]);
  const [hasExpiryDateForm, setHasExpiryDateForm] = useState(hasExpiryDate);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  
  const formRef = useRef(null);
  const submit = useSubmit();
  const today = new Date();

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
      flex: 4,
      renderCell: (params) =>
        <Link to={`/vouchers/${params.value}`}>{params.value}</Link>,
    },
    {
      field: 'value', 
      headerName: 'Value', 
      flex: 2,
    },
    {
      field: 'unit', 
      headerName: 'Unit', 
      flex: 2,
      valueGetter: (value) => 
        `${value.name}`
    },
    {
      field: 'status', 
      headerName: 'Status', 
      flex: 1,
      renderCell: (params) =>
        (params.value === 'active' ? 
          <CheckOutlined sx={{color: '#33FF00'}}/> : 
          <CloseOutlined sx={{color: 'red'}}/>
        ),
    },
    {
      field: 'created_at', 
      headerName: 'Date', 
      flex: 3,
      valueGetter: (value) => 
        `${new Date(value).toLocaleDateString('de-DE')}`
    },
    {
      field: 'expiry_date', 
      headerName: 'Expiry Date', 
      flex: 3,
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
      setTimeout(() =>{

        submit(formRef.current);
      }, 100)
    } else {
      console.error('Formular-Ref nicht gefunden!');
    }
  }

  const handleExpiryCheckboxChange = (event) => {
    if(hasExpiryDateForm === event.target.value){
      setHasExpiryDateForm(null);
    }
    else{
      setHasExpiryDateForm(event.target.value);
    }
    if (formRef.current) {
      setTimeout(() =>{

        submit(formRef.current);
      }, 100)
    } else {
      console.error('Formular-Ref nicht gefunden!');
    }
  }

  const getExpiryCheckboxChecked = (value) =>{
    if(hasExpiryDateForm === value){
      return true
    }
      return false;
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
        <Stack component={Form} ref={formRef} gap={1}>
          <label>
            <Typography
              sx={{fontWeight: 'bold'}}
            >
              Voucher-Value
            </Typography>
            <Stack direction={"row"} gap={2}>
              <TextField 
                name="min_value" 
                required
                defaultValue={minValue}
                label="Min Value" 
                variant="outlined"
                onChange={handleValueInput}
              />
              <TextField 
                name="max_value" 
                required
                defaultValue={maxValue}
                label="Max Value" 
                variant="outlined"
                onChange={handleValueInput}
              />
            </Stack>
          </label>
          <label>
            <Typography
              sx={{fontWeight: 'bold'}}
            >
              Unit
            </Typography>
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
              sx={{ marginLeft: '5px'}}
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
          <label>
            <Typography
              sx={{fontWeight: 'bold'}}
            >
              Created after- Created Until
            </Typography>
            <Stack direction={"row"} gap={2}>
              <DatePicker
                name="created_after"
                defaultValue={
                  createdAfter ? dayjs(createdAfter) : undefined
                }
                onChange={handleDateChange}
                slotProps={{field: {clearable: true}}}
              />
              <DatePicker
                name="created_until"
                defaultValue={
                  createdUntil ? dayjs(createdUntil) : undefined
                }
                onChange={handleDateChange}
                slotProps={{field: {clearable: true}}}
              />
            </Stack>
          </label>
          <label>
            <Typography
              sx={{fontWeight: 'bold'}}
            >
              Expires after- Expires Until
            </Typography>
            <Stack direction={"row"} gap={2}>
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
            </Stack>
          </label>
          <label>
            <span>Hide No Expiry Date Vouchers</span>
            <Checkbox
              name="has_expiry_date"
              checked={getExpiryCheckboxChecked("true")}
              onChange={handleExpiryCheckboxChange}
              value="true"
            />
          </label>
          <label>
            <span>Hide Expiry Date Vouchers</span>
            <Checkbox
              name="has_expiry_date"
              checked={getExpiryCheckboxChecked("false")}
              onChange={handleExpiryCheckboxChange}
              value="false"
            />
          </label>
        </Stack>
      </AccordionDetails>
    </Accordion>
    <Stack 
      direction={"row"} 
      spacing={2} 
      justifyContent="center"
      alignItems="center"
      margin={"20px 0px"}
      height={'150px'}
    >
      <Card 
        variant="outlined" 
        sx={{
          width: "150px", 
          height: "100%", 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <FunctionsOutlined 
          sx={{
            zIndex: '0', 
            position: "absolute", 
            opacity: '0.2',
            fontSize: '5rem'
          }}
        />
        Voucher Total: <br/>
        {vouchers.reduce((sum, voucher) => sum + voucher.value, 0)}
      </Card>
      <Card 
        variant="outlined" 
        sx={{
          width: "150px", 
          height: "100%",  
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <CreditCardOutlined 
          sx={{
            zIndex: '0', 
            position: "absolute", 
            opacity: '0.2',
            fontSize: '5rem'
          }}
        />
        Voucher Number: <br/>
        {vouchers.length}
      </Card>
    </Stack>
    <DataGrid
      columns={columns}
      rows={vouchers}
      checkboxSelection
      rowSelectionModel={rowSelectionModel}
      onRowSelectionModelChange={(newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
      }}
      slots={{ 
        toolbar: ()=> <CustomToolbar rowSelectionModel={rowSelectionModel}/> 
      }}
    />
    </>
  );

}

export default Vouchers;