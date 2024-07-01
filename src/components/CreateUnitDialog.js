import '../styles/components/footer.css';
import { Form } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

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