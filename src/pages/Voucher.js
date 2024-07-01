import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code";
import { backendUrl, frontendUrl } from "../index";
import { PDFDownloadLink} from "@react-pdf/renderer";
import VoucherPDF from "../components/voucherPDF";
import "../styles/pages/Voucher.css"
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { CalendarMonthOutlined, CheckOutlined, CloseOutlined, DownloadOutlined, EditOutlined, LocalOfferOutlined, MailOutline, PaymentOutlined, PlaceOutlined, StoreOutlined } from "@mui/icons-material";

export async function loader({ params }) {
  const bearerToken = localStorage.getItem('authToken');

  // if (bearerToken === undefined || bearerToken === null) {
  //   return redirect(`/login`);
  // }

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
    return {};
  }
}

function Voucher() {
  const voucher = useLoaderData();
  const authToken = localStorage.getItem('authToken');

  const expiryDate = new Date(voucher.expiry_date).toLocaleDateString();

  return (
    <Container id="voucher-page">
      <Typography 
        variant="h2"
        sx={{fontSize: '30px', fontWeight: 'bold'}}
      >
        Your QR Voucher
      </Typography>
      <Stack>
        <Box marginTop={"20px"}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}  
          >
            <Typography
              variant="h3"
              sx={{fontSize: '20px', fontWeight: 'bold'}}
            >
              Voucher Details
            </Typography>
            {authToken?
              <Button 
                variant="contained"
                component={Link}
                to={`/vouchers/${voucher.id}/edit`}
                endIcon={<EditOutlined/>} 
                sx={{backgroundColor:"black"}}
              >
                Edit
              </Button>
            :
              <></>
            }
          </Stack>
          <Stack gap={"10px"} marginTop={"10px"}>
            <Box 
              display="flex" 
              alignItems="center"
              gap="20px"
            >
              <LocalOfferOutlined 
                sx={{
                  backgroundColor:"#8f969a",
                  padding: "8px 8px" ,
                  borderRadius: "4px" ,
                  color: "white",
                  fontSize: "30px"
                }}  
              />
              <Box>
                id: {voucher.id}
              </Box>
            </Box>
            <Box 
              display="flex" 
              alignItems="center"
              gap="20px"
            >
              {voucher.status === "active"?(
                <CheckOutlined 
                  sx={{
                    backgroundColor:"green",
                    padding: "8px 8px" ,
                    borderRadius: "4px" ,
                    color: "white",
                    fontSize: "30px"
                  }}  
                />
              ):(
                <CloseOutlined
                  sx={{
                    backgroundColor:"red",
                    padding: "8px 8px" ,
                    borderRadius: "4px" ,
                    color: "white",
                    fontSize: "30px"
                  }}  
                />
              )
              }
              <Box>
                Status: {voucher.status}
              </Box>
            </Box>
            <Box 
              display="flex" 
              alignItems="center"
              gap="20px"
            >
              <PaymentOutlined 
                sx={{
                  backgroundColor:"#8f969a",
                  padding: "8px 8px" ,
                  borderRadius: "4px" ,
                  color: "white",
                  fontSize: "30px"
                }}  
              />
              <Box>
                Balance: {voucher.value} {voucher.unit.name}
              </Box>
            </Box>
            <Box 
              display="flex" 
              alignItems="center"
              gap="20px"
            >
              <CalendarMonthOutlined 
                sx={{
                  backgroundColor:"#8f969a",
                  padding: "8px 8px" ,
                  borderRadius: "4px" ,
                  color: "white",
                  fontSize: "30px"
                }}  
              />
              <Box>
                Expiry Date:&nbsp;
                {voucher.expiry_date !== null?(
                  expiryDate
                ):(
                  <>-</>
                )}
              </Box>
            </Box>
          </Stack>
        </Box>
        <Box marginTop={"20px"}>
          <Typography
            variant="h3"
            sx={{fontSize: '20px', fontWeight: 'bold'}}
          >
            Business Details
          </Typography>
          <Stack gap={"10px"} marginTop={"10px"}>
            <Box 
              display="flex" 
              alignItems="center"
              gap="20px"
            >
              <StoreOutlined 
                sx={{
                  backgroundColor:"#8f969a",
                  padding: "8px 8px" ,
                  borderRadius: "4px" ,
                  color: "white",
                  fontSize: "30px"
                }}  
              />
              <Box>
                Business Name: {voucher.business.name}
              </Box>
            </Box>
            <Box 
              display="flex" 
              alignItems="center"
              gap="20px"
            >
              <PlaceOutlined 
                sx={{
                  backgroundColor:"#8f969a",
                  padding: "8px 8px" ,
                  borderRadius: "4px" ,
                  color: "white",
                  fontSize: "30px"
                }}  
              />
              <Box>
                &nbsp;Location: &nbsp;
                  {voucher.business.street} &nbsp;
                  {voucher.business.apt_suite_bldg},
                  &nbsp;{voucher.business.zip_code} &nbsp;
                  {voucher.business.city} 
              </Box>
            </Box>
            <Box 
              display="flex" 
              alignItems="center"
              gap="20px"
            >
              <MailOutline 
                sx={{
                  backgroundColor:"#8f969a",
                  padding: "8px 8px" ,
                  borderRadius: "4px" ,
                  color: "white",
                  fontSize: "30px"
                }}  
              />
              <Box>
                Email: {voucher.business.email}
              </Box>
            </Box>
            <Box 
              display="flex" 
              alignItems="center"
              gap="20px"
            >
              <CalendarMonthOutlined 
                sx={{
                  backgroundColor:"#8f969a",
                  padding: "8px 8px" ,
                  borderRadius: "4px" ,
                  color: "white",
                  fontSize: "30px"
                }}  
              />
              <Box>
                Phone Number: {voucher.business.phone_number}
              </Box>
            </Box>
          </Stack>
          <Box 
            backgroundColor="#8f969a"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            marginTop={"20px"}
            borderRadius={"4px"}
            sx={{aspectRatio: "1 / 1"}}
            border={"10px solid #393D3F"}
          >
            <Box 
              border={"10px solid #393D3F"}
              borderRadius={"4px"}
            >
              <Box 
                backgroundColor="white"
                padding={"10px"}
                borderRadius={"4px"}
              >
                <QRCode value={`${frontendUrl}/vouchers/${voucher.id}`} id="QRCode"/>
              </Box>
            </Box>
          </Box>
        </Box>
        <Button
          component={PDFDownloadLink}
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
            variant="contained"
            sx={{
              marginTop:"20px",
              width:"100%", 
              backgroundColor:"black"
            }}
            size="large"
            endIcon={<DownloadOutlined/>}
        >
          Download as PDF
        </Button>
      </Stack>
    </Container>
  ); 
}

export default Voucher;