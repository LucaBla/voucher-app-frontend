import { Form, Link, useSubmit } from "react-router-dom";
import "../styles/components/voucherForm.css"
import { CheckCircle, Info, Trash, XCircle } from "react-feather";
import { useRef, useState } from "react";
import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import { CheckOutlined, CloseOutlined, DeleteOutline, SaveOutlined, X } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function VoucherForm({voucher, currentDate, units}){
  const [voucherStatus, setVoucherStatus] = useState(voucher.status ? voucher.status : "active" );
  const [dialogOpen, setDialogOpen] = useState(false);

  const formRef = useRef(null);
  const submit = useSubmit();

  const handleSwitchChange = (event) => {
    const activeValue = event.target.value;

    if(activeValue === "active"){
      setVoucherStatus("inactive");
    }
    else if(activeValue === "inactive"){
      setVoucherStatus("active");
    }
    else{
      console.error("Invalid value");
    }
    console.log(activeValue);
  };

  const handleSubmit = (event) => {
    console.log(event.target[5].value);
    if(voucherStatus === "active"){
      if(event.target[1].value <= 0){
        setDialogOpen(true);
        event.preventDefault();
      }
      if(event.target[5].value != '' && dayjs(event.target[5].value) >= dayjs(currentDate)){
        setDialogOpen(true);
        event.preventDefault();
      }
    }
    
  };

  const updateStatus = (status) =>{
    setVoucherStatus(status);
    formRef.current[0].value= status;
    submit(formRef.current);
  }

  const closeDialog = () =>{
    submit(formRef.current);
  }

  return(
    <Container
      sx={{width: '50%', maxWidth: '800px !important'}}
    >
      <Dialog
        open={dialogOpen}
        onclose={''}
      >
        <DialogTitle>Deactivate Voucher?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Either the value is zero or lower or the expiry date is in the past.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>No</Button>
          <Button 
            onClick={() => updateStatus("inactive")} 
            variant="contained" 
            sx={{backgroundColor:"black"}}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Stack>
        {voucher.id? (
          <>
          {voucherStatus === 'inactive'&&
            <Alert severity="warning" variant="filled">
              Attention: This Voucher is inactive!
            </Alert>
          }
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}  
          >
            <Typography
              variant="h3"
              sx={{fontSize: '20px', fontWeight: 'bold'}}
            >
              ID {voucher.id}
            </Typography>
            <Form 
              method="post" 
              action="destroy"
              onSubmit={(event) =>{
                if(
                  !window.confirm(
                    "Are you sure you want to delete this Voucher?"
                  )
                ){
                  event.preventDefault();
                }
              }}
            >
              <IconButton edge="end" type="submit">
                <DeleteOutline/>
              </IconButton>
            </Form>
          </Stack>
          </>
        ):(
          <h2>Create New Voucher</h2>
        )
        }
        <Stack 
          component={Form} 
          method="post" 
          gap={"20px"} 
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <label>
            <span>Status</span>
            <Switch 
              name="status" 
              value={voucherStatus} 
              checked={voucherStatus=== 'active' ? true: false}
              onChange={handleSwitchChange}
            />
          </label>
          <TextField 
            name="value" 
            required
            defaultValue={voucher.value}
            label="Value" 
            variant="outlined"
          />
          
          <TextField
            select
            required
            name="unit_id"
            defaultValue={voucher.unit.id ? voucher.unit.id : ""}
            label="Unit"
          >
            {units.map((unit, index) =>(
              <MenuItem key={index} value={unit.id}>{unit.name}</MenuItem>
            ))}
          </TextField>
          <DatePicker
            name="expiry_date"
            label="Expiry Date"
            defaultValue={voucher.expiry_date? dayjs(voucher.expiry_date) : null}
            minDate={dayjs(currentDate)}
            timezone="system"
            slotProps={{
              field: { clearable: true,},
            }}
            format="DD/MM/YYYY"
            //views={['day','month', 'year']}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop:"20px",
              width:"100%", 
              backgroundColor:"black"
            }}
            size="large"
            endIcon={<SaveOutlined/>}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Container>
    );
}