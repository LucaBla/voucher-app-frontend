import { redirect } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "..";

export async function action({ request }) {
  const bearerToken = localStorage.getItem('authToken');

  if (bearerToken === undefined || bearerToken === null) {
    return redirect(`/login`);
  }

  let formData= Object.fromEntries(await request.formData());
  
  let newUnit = {
    unit:{
      name: formData.unit_name
    }
  }

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(
      `${backendUrl}/units`, 
      newUnit,
      { 
        headers: headers,
      }
    );

    console.log(response.data);
    return redirect(`/settings`);
  } catch (error) {
    console.error(error);
  }
}