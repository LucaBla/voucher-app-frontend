import { Link, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../index";

export async function loader() {
  const bearerToken = localStorage.getItem('authToken');

  if (bearerToken === undefined || bearerToken === null) {
    return redirect(`/login`);
  }

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get(`${backendUrl}/vouchers`, {
      headers: headers
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function Vouchers() {
  const vouchers = useLoaderData();

  return (
    <div>
      <h2>Vouchers</h2>
      <ul>
        { vouchers.map((voucher) => (
          <li key={voucher.id}>
            <Link to={`/vouchers/${voucher.id}`}>
              <>{voucher.id} - {voucher.value} - {voucher.status} - {voucher.expiry_date}</>
            </Link>
          </li>
        ))
        }
      </ul>
      <Link to="/vouchers/create">
        Create
      </Link>
    </div>
  );
}

export default Vouchers;