import { Link, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code";
import { backendUrl, frontendUrl } from "../index";
import ReactPDF, { Document, PDFDownloadLink, PDFViewer, Page, Text, View } from "@react-pdf/renderer";
import VoucherPDF from "../components/voucherPDF";
import { useEffect, useState } from "react";
import "../styles/pages/Voucher.css"
import { CheckCircle, Edit2, XCircle } from "react-feather";

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

  const expiryDate = new Date(voucher.expiry_date).toLocaleDateString();

  return (
    <div id="voucher-page">
    <div id="voucher">
      <div className="voucher-header">
      <Link to={`/vouchers/${voucher.id}/edit`}>
        <Edit2 color="white"/>
      </Link>
        <h2>{voucher.business.name}</h2>
        <span>
        {voucher.status === 'active' ?(
          <CheckCircle color="white"/>
        ):(
          <XCircle color="red"/>
        )
        }
        </span>
      </div>

      <div className="voucher-body">
        <div className="voucher-value">
          {voucher.value}
        </div>
        <div className="voucher-unit">
          {voucher.unit.name}
        </div>
        <QRCode value={`${frontendUrl}/vouchers/${voucher.id}`} id="QRCode"/>
      </div>
      <div className="voucher-footer">
        <span className="voucher-id">{voucher.id}</span>
        <span>
          {voucher.expiry_date !== null?(
            expiryDate
          ):(
            <></>
          )}
        </span>
      </div>
    </div>
      <div>
        <PDFDownloadLink 
          document={
            <VoucherPDF 
              companyName={voucher.business.name}
              status={voucher.status}
              id={voucher.id}
              value={voucher.value} 
              unit={voucher.unit.name}
              expiry_date={expiryDate}  
              qrCodeString = {`${frontendUrl}/vouchers/${voucher.id}`}
            />
          } 
          fileName="voucher.pdf"
        >
          Download PDF
        </PDFDownloadLink>
      </div>
    </div>
  ); 
}

export default Voucher;