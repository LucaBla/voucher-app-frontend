import { Form } from "react-router-dom";
import "../styles/components/voucherForm.css"
import { CheckCircle, Info, Trash, XCircle } from "react-feather";
import { useState } from "react";

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
      return 'white';
    }
  }

  return(
    <Form method="post">
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
      <label>
        <span>Value</span>
        <input name="value" type="text" defaultValue={voucher.value}/>
      </label>
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
            <CheckCircle color={getStatusIconColor('check')}/>
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
            <XCircle color={getStatusIconColor('circle')}/>
          </label>
        </div>
      </fieldset>
      <label>
        <span>Unit</span>
        <select name="unit_id" defaultValue={voucher.unit.id}>
          {units.map((unit, index) =>(
            <option key={index} value={unit.id}>{unit.name}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Expiry Date</span>
        <input name="expiry_date" type="date" defaultValue={voucher.expiry_date} min={currentDate}/>
      </label>
      <button type="submit">Submit</button>
    </Form>
    );
}