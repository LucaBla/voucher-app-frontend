import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";
import EditVoucher from "./EditVoucher";
import VoucherForm from "../components/voucherForm";
import { backendUrl } from "../index";

export async function loader({ params }) {
  const bearerToken = localStorage.getItem('authToken');

  if (bearerToken === undefined || bearerToken === null) {
    return redirect(`/login`);
  }

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try{
    const response = await axios.get(
      `${backendUrl}/units/`, 
      { headers: headers }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function action({ request }){
  const voucher = await createVoucher(request);

  return redirect(`/vouchers/${voucher.id}`);
}

async function createVoucher(request){
  const bearerToken = localStorage.getItem('authToken');

  let formData= Object.fromEntries(await request.formData());

  if(!formData.status){
    formData.status = 'inactive';
  }
  console.log(formData);

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(
      `${backendUrl}/vouchers`, 
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

function CreateVoucher() {
  const today = new Date().toISOString().substring(0,10);
  const voucher = {
    status: 'active',
    unit:{}
  };
  const units = useLoaderData();

  return (
    <VoucherForm voucher={voucher} currentDate={today} units={units}/>
  );
}

export default CreateVoucher;