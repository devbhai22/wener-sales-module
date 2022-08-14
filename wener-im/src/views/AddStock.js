import { Grid, Stack, TextField,Button, IconButton, Divider } from '@mui/material';
import React,{ useState, useLayoutEffect } from 'react';
import { Container, Row } from "shards-react"
import PageTitle from "../components/common/PageTitle"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';const AddStock = () => {
	const [items, setItems] = useState([
		{
      id:"",
      name1:"",
      name2:"",
      quantity:"",
      sellingPrice:"",
      cost:"",
      type:"",
      onDelivery:"",
      image:""
    }])

	const handleChange = (e,index)=>{
		const {name, value} = e.target
		let changedItems=items.map((item,i)=>{
			if(index===i){
				return {...item, [name]:value}
			}
			return item
		})
		setItems(changedItems)
	}

	const addRow = ()=>{
		setItems([...items,
			{
			id:"",
			name1:"",
			name2:"",
			quantity:"",
			sellingPrice:"",
			cost:"",
			type:"",
			onDelivery:"",
			image:""
			}
		])
	}
	const deleteRow = (i)=>{      
		setItems(items.filter((item,index) => i !== index))
	}


  return (
    <Container fluid className="main-content-container px-4">
		<Row noGutters className="page-header py-4">
			<PageTitle md="12" title="View Stocks" subtitle="Stocks" className="text-md-left" />
		</Row>
				
		{items.map((data,i)=>
		<div className='item-rows' >
		<Grid container spacing={1.5} justifyContent="start" >
   
			<Grid item xs={12} sm={2} md={1} sx={{width:"100%"}}>
				<TextField label="id" name="id" value={data.id} disabled fullWidth size="small" sx={{background:"white"}}/>
			</Grid>
			<Grid item xs={12} sm={3} md={1.5}>
				<TextField label="Name 1" name="name1" value={data.name1} fullWidth size="small" onChange={(e)=>handleChange(e,i)} sx={{background:"white"}}/>
			</Grid>
			<Grid item xs={12} sm={3} md={1.5}>
				<TextField label="Name 2" name="name2" value={data.name2} fullWidth size="small" onChange={(e)=>handleChange(e,i)} sx={{background:"white"}}/>
			</Grid>
			<Grid item xs={12} sm={2} md={1}>
				<TextField label="Quantity" name="quantity" value={data.quantity} fullWidth size="small" onChange={(e)=>handleChange(e,i)} sx={{background:"white"}}/>
			</Grid>
			<Grid item xs={12} sm={3} md={1.5}>
				<TextField label="Selling Price" name="sellingPrice" value={data.sellingPrice} fullWidth size="small" onChange={(e)=>handleChange(e,i)} sx={{background:"white"}}/>
			</Grid>
			<Grid item xs={12} sm={2} md={1}>
				<TextField label="Cost" name="cost" value={data.cost} fullWidth size="small"  onChange={(e)=>handleChange(e,i)} sx={{background:"white"}}/>
			</Grid>
			<Grid item xs={12} sm={2.5} md={1.5}>
				<TextField label="Type" name="type" value={data.type} fullWidth size="small" onChange={(e)=>handleChange(e,i)} sx={{background:"white"}}/>
			</Grid>
			<Grid item xs={12} sm={2.5} md={1.5}>
				<TextField label="On Delivery" name="onDelivery" defaultValue={data.onDelivery} fullWidth size="small" onChange={(e)=>handleChange(e,i)} sx={{background:"white"}}/>
			</Grid>
			<Grid item >
				<Stack direction="row">
					{items.length>1&&
					<IconButton color="error" component="label" onClick={()=>deleteRow(i)}>
						<RemoveIcon />
					</IconButton>
					}

					<IconButton color="primary" component="label" onClick={addRow}>
						<AddIcon />
					</IconButton>
				</Stack>
			</Grid>
          
     	</Grid>
	  
	  
	 	 </div>
			)}
	  	<Divider sx={{margin:"10px 0"}}/>
	  	<Button variant="contained" size="large">Add to Stock</Button>
    </Container>
  )
}

export default AddStock