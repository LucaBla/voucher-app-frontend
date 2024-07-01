import { Archive, Plus } from "react-feather";
import "../styles/pages/Home.css";
import { Link, useLoaderData } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { QrCodeScannerOutlined } from "@mui/icons-material";

function Home({name}) {
  const data = useLoaderData();
  console.log(data);

  return (
    <Stack className="HomeWrapper">
      <Box className="FullWidthRow">
        <h2>Wilkommen {data.name}</h2>
      </Box>
      <Stack className="ThreeElementsRow">
        <Box component={Link} to={`/vouchers/create`}>
          <div className="OptionWrapper">
            <Plus size={"28px"}/>
            <span>Create</span>
          </div>
        </Box>
        <Box component={Link} to={`/vouchers/`}>
          <div className="OptionWrapper">
            <Archive size={"28px"}/>
            <span>Overview</span>
          </div>
        </Box>
        <Box component={Link} to={`/vouchers/scan`}>
          <div className="OptionWrapper">
            <QrCodeScannerOutlined sx={{ fontSize: 28 }}/>
            <span>Scan</span>
          </div>
        </Box>
      </Stack>
    </Stack>
  );
}

export default Home;