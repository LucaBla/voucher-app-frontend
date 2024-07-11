import { redirect } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "..";
import { getBearerToken } from "./Root";

export async function action({ request, params }) {
  const bearerToken = getBearerToken();

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  let formData= Object.fromEntries(await request.formData());

  try {
    const response = await axios.post(
      `${backendUrl}/vouchers/${params.voucherId}/email_voucher`, 
      formData,
      { headers: headers }
    );

    return redirect(`/vouchers/${params.voucherId}/edit`);
  } catch (error) {
    console.error(error);
  }
}