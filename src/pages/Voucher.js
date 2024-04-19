import { Link, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code";
import { backendUrl, frontendUrl } from "../index";
import { Document, PDFDownloadLink, PDFViewer, Page, Text, View } from "@react-pdf/renderer";
import VoucherPDF from "../components/voucherPDF";
import { useEffect, useState } from "react";

export async function loader({ params }) {
  const bearerToken = localStorage.getItem('authToken');

  if (bearerToken === undefined || bearerToken === null) {
    return redirect(`/login`);
  }

  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get(
      `${backendUrl}/vouchers/${params.voucherId}`, 
      { headers: headers }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function Voucher() {
  const voucher = useLoaderData();

  return (
    <div>
      {voucher.id} - {voucher.value} - {voucher.status} - {voucher.expiry_date}
      <Link to={`/vouchers/${voucher.id}/edit`}>
        <button>
          Edit
        </button>
      </Link>
      <QRCode value={`${frontendUrl}/vouchers/${voucher.id}`} id="QRCode"/>
      <button>
        Create PDF
      </button>
      <div style={{height: '1200px'}}>
        <PDFViewer width="100%" height="100%">
          <VoucherPDF 
            companyName="WIP" 
            value={voucher.value} 
            unit="WIP"
            expiry_date={voucher.expiry_date}  
            qrCodeString = {`${frontendUrl}/vouchers/${voucher.id}`}
            />
        </PDFViewer>
        <PDFDownloadLink document={<VoucherPDF/>} fileName="voucher.pdf">
          Download
        </PDFDownloadLink>
      </div>
    </div>
  ); 
}

export default Voucher;