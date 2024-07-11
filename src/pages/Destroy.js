import { redirect } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "..";
import { getBearerToken } from "./Root";

export async function action({ params }) {
  const bearerToken = getBearerToken();

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.delete(
      `${backendUrl}/vouchers/${params.voucherId}`, 
      { headers: headers }
    );

    return redirect(`/`);
  } catch (error) {
    console.error(error);
  }
}