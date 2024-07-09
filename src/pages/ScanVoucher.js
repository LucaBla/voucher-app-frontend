import "../styles/pages/ScanVoucher.css";
import { useNavigate } from "react-router-dom";
import { Scanner } from "@yudiel/react-qr-scanner";
import { frontendUrl } from "..";
import { useState } from "react";

function ScanVoucher({name}) {
  const navigate = useNavigate();

  return (
    <div className="scan-voucher-page">
      <div className="scanner-wrapper">
        <Scanner
          onScan={(result) => {
            console.log(result[0]);
            result = result[0].rawValue.replace(frontendUrl, '');
            navigate(result);
          }}
          onError={(error) => console.log(error?.message)}
        />
      </div>
    </div>
  );
}

export default ScanVoucher;