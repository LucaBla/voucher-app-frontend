import { Document, Page, Text, View, Image, StyleSheet, Font } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import QRCode from "qrcode";
import BG from "../pdf-assets/voucher-bg.jpg";
import Marker from "../pdf-assets/marker-icon.png";
import Mail from "../pdf-assets/email-icon.png";
import Phone from "../pdf-assets/phone-icon.png";

export default function VoucherPDF({id, companyName, value, unit, expiry_date, qrCodeString, adress, email, phone_number}){
  const [QRCodeString, setQRCodeString] = useState("");

  useEffect(() => {
    if(qrCodeString){
      QRCode.toDataURL((qrCodeString)).then((data) =>{
        setQRCodeString(data);
      })
    }
  }, []);

  Font.register({ 
    family: 'Jacques', src: '/fonts/JacquesFrancois-Regular.ttf' 
  });

  const styles = StyleSheet.create({
    page:{
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: "#FFFDD0"
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100.0001%',
      height: '99.9999%',
      zIndex: 0,
    },
    voucher:{
      width: '80%',
      alignSelf: 'center',
      borderRadius: "15px",
      backgroundColor:'green'
    },
    header:{
      position: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      left: 0,
      right: 0,
      color: "black", 
      textAlign: "center", 
      fontSize: "24px", 
      fontWeight: "bold",
      top: 0,
      fontFamily: 'Jacques'
    },
    expiryDate:{
      color: "black", 
      textAlign: "center", 
      fontSize: "16px", 
      fontFamily: 'Jacques',
      position: "absolute",
      top: 0,
      left: 5,
    },
    body: {
      textAlign: "center",
      color: "white", 
      fontSize: "30px", 
    },
    valueXUnit:{
      fontFamily: 'Jacques',
      textAlign: "center",
      position: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      left: 0,
      right: 0,
      top: "55%",
      fontSize: "48px",
      lineHeight: "1px",
    },
    qr:{
      width: '150px',
      position: "absolute",
      bottom: 5,
      left: 5,
    },
    business:{
      fontFamily: 'Jacques',
      textAlign: "center",
      position: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      left: 0,
      right: 0,
      bottom: 20,
      fontSize: "14px",
      gap: "10px"
    },
    businessFields:{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
    },
    icons:{
      height: "20px",
      width: "20px",
    },
    footer:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: '10px 10px',
      color: 'white',
    },
    id:{
      color: "grey",
      position: "absolute",
      bottom: 5,
      right: 5,
      fontSize: "10px",
    },
    branding:{
      color: "white",
      textAlign: "center",
      fontSize: "30px", 
      fontWeight: 'bold',
      color: "#b48f30",
    }
  })

 
  return(
    <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <Image 
        src={BG}
        style={styles.background}
      />
      <View style={styles.header}>
        <Text>{companyName}</Text>
      </View>
      <View style={styles.expiryDate}>
        <Text>
          {expiry_date !== "1.1.1970"?
            expiry_date
          :
          <></>
          }
        </Text>
      </View>
      <View style={styles.valueXUnit}>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
      { QRCodeString? 
        <Image src={QRCodeString} style={styles.qr}/>
      :
        <></>
      }
      <View style={styles.business}>
        <View style={styles.businessFields}>
          <Image src={Marker} style={styles.icons}/>
          <Text>{adress}</Text>
        </View>
        <View style={styles.businessFields}>
        <Image src={Mail} style={styles.icons}/>
          <Text>{email}</Text> 
        </View>
        <View style={styles.businessFields}>
          <Image src={Phone} style={styles.icons}/>
          <Text>{phone_number}</Text>
        </View>
      </View>
      <View style={styles.id}>
        <Text>{id}</Text>
      </View>
    </Page>
    </Document>
  );
}