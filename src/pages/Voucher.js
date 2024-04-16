import { Link, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";

export async function loader({ params }) {
  const bearerToken = localStorage.getItem('authToken');

  if (bearerToken === undefined || bearerToken === null) {
    return redirect(`/login`);
  }

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get(
      `http://127.0.0.1:3000/vouchers/${params.voucherId}`, 
      { headers: headers }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function Voucher() {
  const voucher = useLoaderData();
  return (
    <div>
      {voucher.id} - {voucher.value} - {voucher.status} - {voucher.expiry_date}
    </div>
  );
}

export default Voucher;