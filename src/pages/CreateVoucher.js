import { redirect, useLoaderData } from "react-router-dom";
import axios from "axios";
import VoucherForm from "../components/voucherForm";
import { backendUrl } from "../index";
import { getBearerToken } from "./Root";

export async function loader() {
  const bearerToken = getBearerToken();

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
  const bearerToken = getBearerToken();

  let formData= Object.fromEntries(await request.formData());

  if(!formData.status){
    formData.status = 'inactive';
  }

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