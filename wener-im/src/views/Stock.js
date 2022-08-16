import React, { useState, useRef, useEffect } from 'react'
import PageTitle from "../components/common/PageTitle";
import { Container, Row } from "shards-react";
import ReactTable from 'react-table';
import { TextField, MenuItem } from '@mui/material'
import EditProductModal from '../components/editProductModal/EditProductModal';
import supabase from '../utils/supabase';

const Stock = () => {
  
  const [ogStocks, setOgStocks] = useState([])
  const [stocks,setStocks] = useState(ogStocks)
  const [toggleUpdate, setToggleUpdate]=useState(false)
    useEffect(() => {
    async function fetchData() {
      let { data: stock_summary, error } = await supabase
      .from('stock_summary')
      .select('*')
      if (error) {
        console.log(error)
      }
      else {
        setOgStocks(stock_summary)
        setStocks(stock_summary)
        console.log(stock_summary)
      }
    }
    fetchData()
  }, [toggleUpdate]);
  
  const [filters, setFilters] = useState({
    id:NaN,
    name1:"",
    name2:"",
    quantity:"",
    selling_price:"",
    cost:"",
    product_type:"",
    delivery_status:"",
  })
  
  const [focus, setFocus] = useState(null)
  useEffect(() => {

    setStocks(prevPosts=>{
      let filteredPosts = ogStocks
      if(filters.name1){
        filteredPosts=filteredPosts.filter(({name1})=>name1.toLowerCase().includes(filters.name1.toLowerCase()))
      }
      if(filters.name2){
        filteredPosts=filteredPosts.filter(({name2})=>name2.toLowerCase().includes(filters.name2.toLowerCase()))
      }
      if(filters.quantity){
        filteredPosts=filteredPosts.filter(({quantity})=>quantity==filters.quantity)
      }
      if(filters.selling_price){
        filteredPosts=filteredPosts.filter(({selling_price})=>selling_price==filters.selling_price)
      }
      if(filters.cost){
        filteredPosts=filteredPosts.filter(({cost})=>cost==filters.cost)
      }
      if(filters.product_type){
        filteredPosts=filteredPosts.filter(({product_type})=>product_type==filters.product_type)
      }
      if(filters.delivery_status){
        filteredPosts=filteredPosts.filter(({delivery_status})=>delivery_status==filters.delivery_status)
      }

      return filteredPosts
    })
  }, [filters])
  


  const handleChange = (e)=>{
    const {name, value}=e.target
    console.log(name, value)
    setFilters({...filters,[name]:value})
    setFocus(name)
  }

  const style={
    textAlign:"center",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    width: "20px",
  }
  const columns = [
    {
      Header: ()=><TextField size='small' type="number" label="Id" name="id" sx={{marginTop:"5px"}} autoFocus={(focus=="id")} onChange={handleChange} value={filters.id}/>,
      accessor:"id",
      style
    },
    {
      Header: ()=><TextField size='small' label="Name 1" name="name1" sx={{marginTop:"5px"}} autoFocus={(focus=="name1")} onChange={handleChange} value={filters.name1}/>,
      accessor:"name1",
      style
    },
    {
      Header: ()=><TextField size='small' label="Name 2" name="name2" sx={{marginTop:"5px"}} autoFocus={(focus=="name2")} onChange={handleChange} value={filters.name2}/>,
      accessor:"name2",
      style
    },
    {
      Header: ()=><TextField size='small' label="Quantity" name="quantity" sx={{marginTop:"5px"}} autoFocus={(focus=="quantity")} onChange={handleChange} value={filters.quantity}/>,
      accessor:"quantity",
      style,
    },
    {
      Header: ()=><TextField size='small' label="Selling Price" name="selling_price" sx={{marginTop:"5px"}} autoFocus={(focus=="selling_price")} onChange={handleChange} value={filters.selling_price}/>,
      accessor:"selling_price",
      style
    },
    {
      Header: ()=><TextField size='small' label="Cost" name="cost" sx={{marginTop:"5px"}} autoFocus={(focus=="cost")} onChange={handleChange} value={filters.cost}/>,
      accessor:"cost",
      style
    },
    {
      Header: ()=>
      <TextField select fullWidth size='small' label="type" name="product_type" sx={{marginTop:"5px"}} autoFocus={(focus=="product_type")} onChange={handleChange} value={filters.product_type}>
        {stocks.map(post=>post.product_type).filter((v, i, a) => a.indexOf(v) === i).map(option=>(
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>,
      accessor:"product_type",
      style
    },
    {
      Header: ()=><TextField size='small' label="On Delivery" name="delivery_status" sx={{marginTop:"5px"}} autoFocus={(focus=="delivery_status")} onChange={handleChange} value={filters.delivery_status}/>,
      accessor:"delivery_status",
      style
    },
    {
      Header: ()=><TextField size='small' label="Image" sx={{marginTop:"5px"}} disabled/>,
      style,
      Cell: ({original}) =>  
        <img style={{width:"auto", height:"40px", borderRadius:"5px"}} src={original.image}  />
    },
    {
      Header: ()=><TextField size='small' label="Action" sx={{marginTop:"5px"}} disabled/>,
      style,
      Cell: ({original}) =>  
      <EditProductModal data={original} setToggleUpdate={setToggleUpdate}/>
    },
  ] 
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      console.log("pressed shift+enter");
    }
  };

  return (
    <Container fluid className="main-content-container px-4" onKeyPress={handleKeyPress}>
      <Row noGutters className="page-header py-4">
        <PageTitle sm="12" title="View Stocks" subtitle="Stocks" className="text-sm-left" />
      </Row>
      <ReactTable
        className="-striped -highlight"
        data={stocks}
        sortable = {false}
        columns={columns}
        defaultPageSize={10}
        style={{ background: 'white' }}
      >
        
      </ReactTable>
    </Container>
  )
}

export default Stock