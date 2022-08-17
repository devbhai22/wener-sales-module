import { Grid, Stack, TextField,Button, IconButton, Divider, Autocomplete } from '@mui/material';
import React,{ useState, useEffect } from 'react';
import { Container, Row } from "shards-react"
import { useHistory } from "react-router-dom"
import PageTitle from "../components/common/PageTitle"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';import supabase from '../utils/supabase';
const AddStock = () => {
	const history = useHistory()
	const [stocks, setStocks] = useState([])
	const [options, setOptions] = useState({name1:[""], name2:[""],product_type:[""] })
	const [items, setItems] = useState([
		{
      name1:"",
      name2:"",
      quantity:NaN,
      selling_price:NaN,
      cost:NaN,
      product_type:"",
      delivery_status:"",
    }])
	useEffect(() => {
		async function fetchData() {
		let { data: stock_summary, error } = await supabase
		.from('stock_summary')
		.select('*')
		if (error) {
			console.log(error)
		}
		else {
			setStocks(stock_summary)
			console.log(stock_summary)
		}
		}
		fetchData()
	}, []);

	useEffect(() => {
		if(stocks.length){
			setOptions({
				name1:[...new Set(stocks.map((stock)=>stock.name1))],
				name2:[...new Set(stocks.map((stock)=>stock.name2))],
				product_type:[...new Set(stocks.map((stock)=>stock.product_type))]
			})
		}
	}, [stocks])
	
	const handleChange = (e,index)=>{
		const {name, value} = e.target
		console.log(name,value)
		let changedItems=items.map((item,i)=>{
			if(index===i){
				return {...item, [name]:value}
			}
			return item
		})
		setItems(changedItems)
	}
	const handleAutoCompChange = (name,value,index)=>{
		console.log(name, value, index)
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
			name1:"",
			name2:"",
			quantity:NaN,
			selling_price:NaN,
			cost:NaN,
			product_type:"",
			delivery_status:"",
			}
		])
	}
	const deleteRow = (i)=>{     
		setItems(items.filter((item,index) => i !== index))
	}

	const addToStock = async (array) => {
		console.log(array)
		const { data, error } = await supabase
		.from('stock_summary')
		.insert(array)
		if(error){
			console.log(error)
		}else{
			//redirect to stock
			history.push("/stock")
		}
	}

  return (
    <Container fluid className="main-content-container px-4">
		<Row noGutters className="page-header py-4">
			<PageTitle md="12" title="View Stocks" subtitle="Stocks" className="text-md-left" />
		</Row>
				
		{stocks && items.map((data,i)=>
		<div className='item-rows' >
		<Grid container spacing={1.5} justifyContent="start" >
   
			<Grid item xs={12} sm={2} md={1} sx={{width:"100%"}}>
				<TextField label="id" name="id" value={data.id} disabled fullWidth size="small" sx={{background:"white"}}/>
			</Grid>
			<Grid item xs={12} sm={3} md={1.5}>
				<Autocomplete
					freeSolo
					onChange={(e,value)=>handleAutoCompChange("name1",value,i)}
					options={options.name1.map((option) => option)}
					renderInput={(params) => <TextField {...params} label="Name 1" name="name1" onChange={(e)=>handleChange(e,i)} value={data.name1} fullWidth size="small" sx={{background:"white"}}/>}
				/>
			</Grid>
			<Grid item xs={12} sm={3} md={1.5}>
				<Autocomplete
					freeSolo
					onChange={(e,value)=>handleAutoCompChange("name2",value,i)}
					options={options.name2.map((option) => option)}
					renderInput={(params) => <TextField {...params} label="Name 2" name="name2" onChange={(e)=>handleChange(e,i)} value={data.name2} fullWidth size="small" sx={{background:"white"}}/>}
				/>
				
			</Grid>
			<Grid item xs={12} sm={2} md={1}>
				<TextField label="Quantity" type="number" name="quantity" value={data.quantity} fullWidth size="small" onChange={(e)=>handleChange(e,i)} sx={{background:"white"}}/>
			</Grid>
			<Grid item xs={12} sm={3} md={1.5}>
				<TextField label="Selling Price" type="number" name="selling_price" value={data.selling_price} fullWidth size="small" onChange={(e)=>handleChange(e,i)} sx={{background:"white"}}/>
			</Grid>
			<Grid item xs={12} sm={2} md={1}>
				<TextField label="Cost" name="cost" type="number" value={data.cost} fullWidth size="small"  onChange={(e)=>handleChange(e,i)} sx={{background:"white"}}/>
			</Grid>
			<Grid item xs={12} sm={2.5} md={1.5}>
				<Autocomplete
					freeSolo
					onChange={(e,value)=>handleAutoCompChange("product_type",value,i)}
					options={options.product_type.map((option) => option)}
					renderInput={(params) => <TextField {...params} label="product_type" name="product_type" onChange={(e)=>handleChange(e,i)} value={data.product_type} fullWidth size="small" sx={{background:"white"}}/>}
				/>
			</Grid>
			<Grid item xs={12} sm={2.5} md={1.5}>
				<TextField label="On Delivery" name="delivery_status" defaultValue={data.delivery_status} fullWidth size="small" onChange={(e)=>handleChange(e,i)} sx={{background:"white"}}/>
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
	  	<Button variant="contained" size="large" onClick={()=>addToStock(items)}>Add to Stock</Button>
    </Container>
  )
}

export default AddStock