import '../styles/components/footer.css';
import { Form } from "react-router-dom";
import { Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LoopOutlined } from "@mui/icons-material";

function UpdateProfileForm({
  business, navigation
}) {
  return (
    <Stack
      component={Form}
      method='put'
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
      spacing={2}
    >
      <Typography 
        variant="h2" 
        sx={{fontSize: '30px', fontWeight: 'bold'}}
      >
        Settings
      </Typography>
      <TextField 
        name="name" 
        required
        defaultValue={business.name}
        label="Business Name" 
        variant="outlined"
      />
      <TextField 
        name="email" 
        required
        defaultValue={business.email}
        label="Email" 
        variant="outlined"
      />
      <TextField 
        name="phone_number" 
        defaultValue={business.phone_number}
        label="Phone Number" 
        variant="outlined"
      />
      <Stack spacing={2}>
        <Typography 
          variant="h3"
          sx={{fontSize: '20px', fontWeight: 'bold'}}
        >
          Location
        </Typography>
        <TextField 
          name="street" 
          defaultValue={business.street}
          label="Street" 
          variant="outlined"
        />
        <TextField 
          name="apt_suite_bldg" 
          defaultValue={business.apt_suite_bldg}
          label="Apt, Suite, Bldg" 
          variant="outlined"
        />
        <TextField 
          name="city" 
          defaultValue={business.city}
          label="City" 
          variant="outlined"
        />
        <TextField 
          name="state" 
          defaultValue={business.state}
          label="State" 
          variant="outlined"
        />
        <TextField 
          name="zip_code" 
          defaultValue={business.zip_code}
          label="Zip Code" 
          variant="outlined"
        />
        <TextField 
          name="country" 
          defaultValue={business.country}
          label="Country" 
          variant="outlined"
        />
      </Stack>
      <LoadingButton 
        type="submit" 
        loading={navigation.state === "submitting" || navigation.state === "loading"} 
        loadingPosition="end" 
        endIcon={<LoopOutlined/>} 
        variant="contained"
        size="large"
        sx={{backgroundColor:"black"}}
      >
        <span>Update</span>
      </LoadingButton>
    </Stack>
  );
}

export default UpdateProfileForm;