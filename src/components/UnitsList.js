import '../styles/components/footer.css';
import { Form } from "react-router-dom";
import { Box, Button, IconButton, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { AddOutlined, DeleteOutline } from "@mui/icons-material";

function UnitsList({
  business, handleModalOpen
}) {
  return (
    <Box sx={{marginTop: '50px'}}>
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
          Units
        </Typography>
        <Button 
          endIcon={<AddOutlined/>} 
          variant="contained" 
          onClick={handleModalOpen}
          sx={{backgroundColor:"black"}}
        >
          <span>Add Unit</span>
        </Button>
      </Stack>
      <List sx={{marginBottom: '50px'}}>
        {business.units.map((unit) =>
          <ListItem 
            key={unit.id}
            sx={{backgroundColor:'', marginBottom: '10px', borderRadius: '4px'}}
            secondaryAction={
              <Form
                method="post"
                action={`/settings/units/${unit.id}/destroy`}
                onSubmit={(event) =>{
                  if(
                    !window.confirm(
                      "Are you sure you want to delete this Unit? This will delete all related Vouchers!"
                    )
                  ){
                    event.preventDefault();
                  }
                }}
              >
                <IconButton edge="end" type="submit">
                  <DeleteOutline/>
                </IconButton>
              </Form>
            }
          >
            <ListItemText primary={unit.name}/>
          </ListItem>
        )}
      </List>
    </Box>
  );
}

export default UnitsList;