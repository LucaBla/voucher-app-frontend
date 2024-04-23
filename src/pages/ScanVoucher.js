import "../styles/pages/ScanVoucher.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import {Scanner} from '@yudiel/react-qr-scanner';
import { frontendUrl } from "..";

function ScanVoucher({name}) {
  const navigate = useNavigate();

  return (
    <div className="scan-voucher-page">
      <div className="scanner-wrapper">
        <Scanner
          //onDecode={(result) => console.log(result)}
          onResult={(result) => {
            result = result.replace(frontendUrl, '');
            navigate(result);
          }}
          onError={(error) => console.log(error?.message)}
        />
      </div>
    </div>
  );
}

export default ScanVoucher;