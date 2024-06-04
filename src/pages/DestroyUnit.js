import { redirect } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "..";

export async function action({ params }) {
  const bearerToken = localStorage.getItem('authToken');

  if (bearerToken === undefined || bearerToken === null) {
    return redirect(`/login`);
  }

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.delete(
      `${backendUrl}/units/${params.unitId}`, 
      { headers: headers }
    );

    console.log(response.data);
    return redirect(`/settings`);
  } catch (error) {
    console.error(error);
  }
}