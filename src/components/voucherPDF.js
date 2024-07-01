import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import QRCode from "qrcode";

export default function VoucherPDF({id, companyName, status, value, unit, expiry_date, qrCodeString}){
  const [QRCodeString, setQRCodeString] = useState("");

  useEffect(() => {
    if(qrCodeString){
      QRCode.toDataURL((qrCodeString)).then((data) =>{
        setQRCodeString(data);
      })
    }
  }, []);

  const styles = StyleSheet.create({
    page:{
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: "white"
    },
    voucher:{
      backgroundColor: "#EAB93C",
      width: '80%',
      alignSelf: 'center',
      borderRadius: "15px",
    },
    header:{
      color: "white", 
      textAlign: "center", 
      fontSize: "25px", 
      fontWeight: "bold",
      padding: "20px 50px",
    },
    body: {
      textAlign: "center",
      color: "white", 
      fontSize: "30px", 
    },
    qr:{
      width: '50%',
      alignSelf: 'center',
      marginTop: '20px',
      marginBottom: '20px',
    },
    footer:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: '10px 10px',
      color: 'white',
    },
    id:{
      color: "#b48f30",
    },
    branding:{
      color: "white",
      textAlign: "center",
      fontSize: "30px", 
      fontWeight: 'bold',
      color: "#b48f30",
    }
  })

  console.log(qrCodeString);
  return(
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.voucher}>
        <View style={styles.header}>
          <Text>{companyName}</Text>
        </View>
        <View style={styles.body}>
          <Text>{value}</Text>
          <Text>{unit}</Text>
          { QRCodeString? 
            <Image src={QRCodeString} style={styles.qr}/>
          :
           <></>
         }
        </View>
        <View style={styles.footer}>
          <Text style={styles.id}>{id}</Text>
          <Text>{expiry_date}</Text>
        </View>
      </View>
    </Page>
    </Document>
  );
}

//voucher übergeben