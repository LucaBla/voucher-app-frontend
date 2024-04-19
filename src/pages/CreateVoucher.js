import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";
import EditVoucher from "./EditVoucher";
import VoucherForm from "../components/voucherForm";
import { backendUrl } from "../index";

export async function action({ request }){
  const voucher = await createVoucher(request);
  return redirect(`/vouchers/${voucher.id}`);
}

async function createVoucher(request){
  const bearerToken = localStorage.getItem('authToken');

  let formData= Object.fromEntries(await request.formData());
  console.log(formData);
  formData.unit_id = 1

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
  const voucher = {}
  return (
    <VoucherForm voucher={voucher} currentDate={today}/>
  );
}

export default CreateVoucher;