import { redirect } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "..";
import { getBearerToken } from "./Root";

export async function action({ request }) {
  const bearerToken = getBearerToken();

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

    return redirect(`/settings`);
  } catch (error) {
    console.error(error);
  }
}