import { Form } from "react-router-dom";
import "../styles/components/voucherForm.css"
import { CheckCircle, Info, Trash, XCircle } from "react-feather";
import { useState } from "react";
import { Button, Container, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { CheckOutlined, CloseOutlined, SaveOutlined } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function VoucherForm({voucher, currentDate, units}){
  const [voucherStatus, setVoucherStatus] = useState(voucher.status);

  const handleRadioClick = (event) => {
    const selectedValue = event.target.value;
    setVoucherStatus(selectedValue);
    console.log(selectedValue);
  };

  const getStatusIconColor = (icon) =>{
    if(voucherStatus === 'active' && icon === 'check'){
      return 'green';
    }
    if(voucherStatus === 'inactive' && icon === 'circle'){
      return 'red';
    }
    else{
      return 'black';
    }
  }

  return(
    <Container
      sx={{width: '50%', maxWidth: '800px !important'}}
    >
      <Stack component={Form} method="post" gap={"20px"}>
        {voucher.id? (
          <>
          {voucherStatus === 'inactive'&&
            <div className="inactive-message">
              Attention: This Voucher is inactive!
              <Info size={36}/>
            </div>
          }
          <div className="edit-voucher-header">
            <label className="id-label">
              <span>ID</span>
              <div name="id">{voucher.id}</div>
            </label>
          </div>
          </>
        ):(
          <h2>Create New Voucher</h2>
        )
        }
        <fieldset>
          <span>Status</span>
          <div className="radio-button-wrapper">
            <label>
              <input 
                type="radio" 
                name="status" 
                value="active" 
                checked={voucherStatus === 'active'} 
                className="status-input" 
                onChange={handleRadioClick}
              />
              <CheckOutlined 
                sx={{
                  color:getStatusIconColor('check')
                }}
                  

                />
            </label>
            <label>
              <input 
                type="radio" 
                name="status" 
                value="inactive" 
                checked={voucherStatus === 'inactive'} 
                className="status-input" 
                onChange={handleRadioClick}
              />
              <CloseOutlined
                sx={{
                  color:getStatusIconColor('circle')
                }}
              />
            </label>
          </div>
        </fieldset>
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
    </Container>
    );
}