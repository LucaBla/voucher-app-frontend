import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";
import VoucherForm from "../components/voucherForm";
import { backendUrl } from "../index";
import { useState } from "react";
import "../styles/pages/EditVoucher.css"
import Accordion from "../components/accordion";
import { Trash } from "react-feather";
import { Alert, Box, Button, Container, Divider, Grid, Stack, TextField, Typography } from "@mui/material";

export async function loader({ params }) {
  const bearerToken = localStorage.getItem('authToken');

  if (bearerToken === undefined || bearerToken === null) {
    return redirect(`/login`);
  }

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  const arr = [];

  try {
    const response = await axios.get(
      `${backendUrl}/vouchers/${params.voucherId}`, 
      { headers: headers }
    );

    console.log(response.data);
    arr.push(response.data);
  } catch (error) {
    console.error(error);
  }

  try{
    const response = await axios.get(
      `${backendUrl}/units/`, 
      { headers: headers }
    );

    console.log(response.data);
    arr.push(response.data);
  } catch (error) {
    console.error(error);
  }

  console.log(arr);
  return arr;
}

export async function action({ request, params }){
  const voucher = await updateVoucher(request, params);
  return redirect(`/vouchers/${params.voucherId}`);
}

async function updateVoucher(request, params){
  const bearerToken = localStorage.getItem('authToken');

  let formData= Object.fromEntries(await request.formData());
  console.log(formData);

  if(formData.sum){
    formData.value = updateFormDataValueBasedOnSum(formData);
  }

  if(!formData.status && !formData.sum){
    formData.status = 'inactive';
  }

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.put(
      `${backendUrl}/vouchers/${params.voucherId}`, 
      formData,
      { 
        headers: headers,
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function updateFormDataValueBasedOnSum(formData){
  let value = formData.value;

  value = (formData.value- formData.sum);

  if(value <= 0){
    value = 0;
  }

  return value;
}

function EditVoucher() {
  const data = useLoaderData();
  const voucher = data[0];
  const today = new Date().toISOString().substring(0,10);
  const [difference, setDifference] = useState(data[0].value * -1);
  const [inputValue, setInputValue] = useState(0);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setDifference(event.target.value - voucher.value);
  };
  
  return (
    <Container>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}  
      >
        <Typography 
          variant="h2"
          sx={{fontSize: '30px', fontWeight: 'bold'}}
        >
          Edit QR Voucher
        </Typography>
        <VoucherForm
          voucher={voucher} 
          currentDate={today} 
          units={data[1]}
        />
      </Stack>

      <Stack 
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}  
        sx={{
          marginTop: '50px', 
          backgroundColor: '#CACFD2', 
          borderRadius: '4px',
          padding: '20px 20px'
        }}
      >
        <Typography 
          variant="h3" 
          sx={{fontSize: '20px', fontWeight: 'bold'}}
        >
          Calculator
        </Typography>
        <Form 
          method='put' 
          onSubmit={(event) => {
            if (
              !window.confirm(
                "Please confirm that you want to update the value"
              )
            ) {
              event.preventDefault();
            }
          }}
        >
          <Grid container>
            <Grid item xs={1}>
              <Box></Box>
            </Grid>
            <Grid item xs={11}>
              <TextField 
                variant="standard"
                name="value" 
                InputProps={{
                  readOnly: true,
                  disableUnderline: true,
                }}
                type="number" 
                defaultValue={voucher.value}
                sx={{color: 'black', marginLeft: '12px'}}
              />
            </Grid>
            <Grid item xs={1} display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Box className="minus-sign">
                -
              </Box>
            </Grid>
            <Grid item xs={11}>
              <TextField
                name="sum"
                type="number"
                value={inputValue}
                onChange={handleChange}
                sx={{backgroundColor: 'white', borderRadius: '4px'}}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider 
                sx={{
                  color: 'green', border: '1px solid black !important',
                  marginBottom: '10px'
                }}
              />
            </Grid>
            <Grid item xs={1}>

            </Grid>
            <Grid item xs={11} paddingLeft={"10px"}>
              {difference >= 0 ? difference : difference*-1} {voucher.unit.name} {difference >= 0 ? "open" : "left"}
            </Grid>
          </Grid>

          <Button 
            type="submit" 
            variant="contained" 
            sx={{backgroundColor: 'black', marginTop: '20px'}}
          >
            Update
          </Button>
        </Form>
      </Stack>


    </Container>
  );
}

export default EditVoucher;