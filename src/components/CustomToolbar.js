import { DeleteOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import axios from "axios";
import { Form, redirect, useNavigation } from "react-router-dom";
import { backendUrl } from "../index";
import SettingsSnackbar from "./SettingsSnackbar";
import { useEffect, useState } from "react";

export async function action({ request }){
  const bearerToken = localStorage.getItem('authToken');

  let formData= Object.fromEntries(await request.formData());
  formData = formData.voucher_ids.split(',').map(id => id.trim());

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.delete(
      `${backendUrl}/vouchers/bulk_destroy`, 
      { 
        headers: headers,
        data:{
          voucher_ids: formData
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
  return redirect(`/vouchers/`);
}

function CustomToolbar({rowSelectionModel}) {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if(
      navigation.formAction === '/vouchers/bulk_destroy' &&
      !isSnackBarOpen
    ){
      setIsSnackBarOpen(true);
      console.log(navigation.formAction);
    }
  }, []);


  return (
    <GridToolbarContainer>
      <SettingsSnackbar 
        isSnackBarOpen={isSnackBarOpen} 
        handleSnackbarClose={() => setIsSnackBarOpen(false)} 
        snackbarContent={"Successfully Deleted Vouchers"} 
      />
      <Box 
        display="flex" 
        justifyContent={"space-between"} 
        sx={{width: "100%"}}
      >
        <Box 
          component={Form}
          method="delete"
          action={`/vouchers/bulk_destroy`}
          onSubmit={(event) =>{
            if(
              !window.confirm(
                "Are you sure you want to delete the selected vouchers?"
              )
            ){
                event.preventDefault();
            }
          }}
        >
          <input name="voucher_ids" type="hidden" value={rowSelectionModel}/>
          <IconButton edge="end" type="submit">
            <DeleteOutline/>
          </IconButton>
        </Box>
        <Box>
          <GridToolbarColumnsButton/>
          <GridToolbarFilterButton/>
          <GridToolbarExport />
        </Box>  
      </Box>
    </GridToolbarContainer>
  );
}

export default CustomToolbar;