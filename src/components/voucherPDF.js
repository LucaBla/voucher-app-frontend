import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import QRCode from "qrcode";

export default function VoucherPDF({companyName, value, unit, expiry_date, qrCodeString}){
  const [QRCodeString, setQRCodeString] = useState("");

  useEffect(() => {
    if(qrCodeString){
      QRCode.toDataURL((qrCodeString)).then((data) =>{
        setQRCodeString(data);
      })
    }
  }, []);

  console.log(qrCodeString);
  return(
    <Document>
    <Page size="A4">
      <View>
        <Text>Dein Gutschein für:</Text>
        <Text>{companyName}</Text>
      </View>
      <View>
        <Text>Im Wert von:</Text>
        <Text>{value} {unit}</Text>
      </View>
      <View>
        <Text>Gültig bis:</Text>
        <Text>{expiry_date}</Text>
      </View>
      <View>
        <Text>Logo der Firma</Text>
      </View>
      <View>
        <Text>
          Restbeträge bleiben als Guthaben erhalten. 
          Der Betrag kann nicht ausgezahlt werden. 
          Mit dem Ablauf der Gültigkeitsdauer verfallen alle Ansprüche 
          auf Einlösung des betreffenden Gutscheins.
        </Text>
      </View>
      { QRCodeString? 
        <Image src={QRCodeString}/>
        :
        <></>
      }
    </Page>
    </Document>
  );
}