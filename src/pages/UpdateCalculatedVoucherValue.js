import { redirect } from "react-router-dom";
import { getBearerToken } from "./Root";

export async function action({ params }) {
  await updateVoucherValue(params.voucherId);
  return redirect(`/vouchers/${voucher.id}`);
}

async function updateVoucherValue(voucherId){
  const bearerToken = getBearerToken();

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  if(difference > 0 && difference != voucher.value){
    difference = 0; //voucher is not enough to pay the whole sum
  }

  try {
    const response = await axios.put(
      `${backendUrl}/vouchers/${voucher.id}`, 
      {
        'value': Math.abs(difference) 
      },
      { 
        headers: headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}