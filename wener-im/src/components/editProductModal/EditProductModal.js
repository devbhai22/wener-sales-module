import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Divider, FormControlLabel, Grid, Stack, Switch, TextField } from '@mui/material';
import { useState } from 'react';
import supabase from '../../utils/supabase';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function EditProductModal(props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(props.data)
  const [needsPermission, setNeedsPermission]=useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const editStockRow = async (obj) => {
    const { row, error } = await supabase
    .from('stock_summary')
    .update(obj)
    .eq('id', obj.id)
		if(error){
			console.log(error)
		}else{
      props.setToggleUpdate((prevState)=>!prevState)
      handleClose()
		}
	}
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>Edit</Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Stock Item
        </BootstrapDialogTitle>

        <DialogContent dividers>
          
          <div  style={{ borderBottom:"1px solid lightgray", marginBottom:"20px"}}>
          <Switch color="primary" value={needsPermission} onChange={(e)=>setNeedsPermission(e.target.checked)}/>
          <span style={{fontSize:"14px", color:"gray", transform:"translateX(-8px)"}}>Request DM's authorization for changing <i>cost</i> and <i>selling price</i></span>
          </div>
        
          <Grid container spacing={1.5} justifyContent="start">
   
          <Grid item xs={12} sm={4}>
            <TextField label="id" name="id" value={data.id} disabled fullWidth size="small"/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Name 1" name="name1" value={data.name1} fullWidth size="small" onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Name 2" name="name2" value={data.name2} fullWidth size="small" onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Quantity" type="number" name="quantity" value={data.quantity} fullWidth size="small" onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Selling Price" type="number" name="selling_price" value={data.sellingPrice} fullWidth size="small" disabled={!needsPermission} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Cost" name="cost" type="number" value={data.cost} fullWidth size="small" disabled={!needsPermission} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Type" name="product_type" value={data.type} fullWidth size="small" onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="On Delivery" name="delivery_status" value={data.onDelivery} fullWidth size="small" onChange={handleChange}/>
          </Grid>
          
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>editStockRow(data)}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
