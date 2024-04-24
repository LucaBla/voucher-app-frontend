import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";
import VoucherForm from "../components/voucherForm";
import { backendUrl } from "../index";
import { useState } from "react";

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
    <>
      <VoucherForm
        voucher={voucher} 
        currentDate={today} 
        units={data[1]}
      />
      <Form 
        merhod='put' 
        action="updateValue"
        onSubmit={(event) => {
          if (
            !confirm(
              "Please confirm you want to delete this record."
            )
          ) {
            event.preventDefault();
            }
        }}
      >
        <h3>Calculator</h3>
        <div>
          <input name="sum" type="number" value={inputValue} onChange={handleChange}/>
          -
          {voucher.value} 
          =
          {difference}
        </div>
        <button type="submit">
          update
        </button>
      </Form>
    </>
  );
}

export default EditVoucher;