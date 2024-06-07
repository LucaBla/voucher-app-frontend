import { User } from "react-feather";
import '../styles/components/footer.css';
import { useAuth } from "../authContext";
import { Form, Link } from "react-router-dom";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from "@mui/material";
import { AddOutlined, SaveOutlined } from "@mui/icons-material";

function CreateUnitDialog({
  isModalOpen, handleModalClose
}) {
  return (
    <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        component={Form}
        method="post"
        action={`/settings/units/create`}
        //onSubmit={handleModalClose}
      >
        <DialogTitle>Add Unit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a Name for the unit.
          </DialogContentText>
          <TextField 
            required 
            name="unit_name" 
            label="Unit Name" 
            variant="standard" 
            fullWidth  
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleModalClose}
            sx={{color:"black"}}
          >
            Close
          </Button>
          <Button 
            type="submit" 
            endIcon={<AddOutlined/>} 
            variant="contained" 
            sx={{backgroundColor:"black"}}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default CreateUnitDialog;