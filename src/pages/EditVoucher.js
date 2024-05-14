import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";
import VoucherForm from "../components/voucherForm";
import { backendUrl } from "../index";
import { useState } from "react";
import "../styles/pages/EditVoucher.css"
import Accordion from "../components/accordion";
import { Trash } from "react-feather";

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

  value = (formData.sum- formData.value) * -1;

  if(value <= 0){
    value = 0;
  }

  return value;
}

function EditVoucher() {
  const data = useLoaderData();
  const voucher = data[0];
  const today = new Date().toISOString().substring(0,10);
  const [difference, setDifference] = useState(data[0].value);
  const [inputValue, setInputValue] = useState(0);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setDifference(event.target.value - voucher.value);
  };
  
  return (
    <div className="edit-voucher-wrapper">
      <VoucherForm
        voucher={voucher} 
        currentDate={today} 
        units={data[1]}
      />
      <Accordion title="Calculator">
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
          <div className="calculation">
            <div className="sum-input">
              <input name="sum" type="number" value={inputValue} onChange={handleChange}/>
            </div>
            <div className="minus-sign">
              -
            </div>
            <div className='value-readonly'>
              <input name="value" readOnly type="number" defaultValue={voucher.value}/>
            </div> 
            <div className="difference">
              <hr/>
              {difference} {voucher.unit.name}
            </div>
          </div>
          <button type="submit">
            Update
          </button>
          </Form>
        </Accordion>
        <Form 
            method="post" 
            action="destroy"
            onSubmit={(event) =>{
              if(
                !window.confirm(
                  "Are you sure you want to delete this Voucher?"
                )
              ){
                event.preventDefault();
              }
            }}
          >
            <button className="delete-voucher-btn">
              <Trash color="red"/>
            </button>
          </Form>
    </div>
  );
}

export default EditVoucher;