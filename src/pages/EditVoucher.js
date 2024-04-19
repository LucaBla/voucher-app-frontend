import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";
import VoucherForm from "../components/voucherForm";
import { backendUrl } from "../index";

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
  const voucher = useLoaderData();
  const today = new Date().toISOString().substring(0,10);
  console.log(today);
  return (
    <VoucherForm voucher={voucher} currentDate={today}/>
  );
}

export default EditVoucher;