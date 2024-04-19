import { Form } from "react-router-dom";

export default function VoucherForm({voucher, currentDate}){
  return(
    <Form method="post">
      <label>
        <span>ID</span>
        <div name="id">{voucher.id}</div>
      </label>
      <label>
        <span>Value</span>
        <input name="value" type="text" defaultValue={voucher.value}/>
      </label>
      <label>
        <span>Status</span>
        <select name="status" defaultValue={voucher.status}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
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