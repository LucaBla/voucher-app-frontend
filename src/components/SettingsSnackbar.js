import { User } from "react-feather";
import '../styles/components/footer.css';
import { useAuth } from "../authContext";
import { Link } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

function SettingsSnackbar({
  isSnackBarOpen, handleSnackbarClose, snackbarContent
}) {
  return (
    <Snackbar
      open={isSnackBarOpen}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={1000}
      onClose={handleSnackbarClose}
      sx={{ top: { xs: 0, sm: 100 } }}
    >
      <Alert severity="success" variant="filled">
        {snackbarContent}
      </Alert>  
    </Snackbar>
  );
}

export default SettingsSnackbar;