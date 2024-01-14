import React, { useState, useRef, useEffect } from 'react'
import { Container, Row } from "shards-react";
import ReactTable from 'react-table';
import { TextField, MenuItem, Box, Tooltip } from '@mui/material'
import EditProductModal from '../../components/editProductModal/EditProductModal';
import supabase from '../../utils/supabase';
import PageTitle from '../../components/common/PageTitle';
import FilterFields from './FilterFields';
import { DataGrid } from '@mui/x-data-grid';
import Aggregation from '../../components/Aggregation';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';

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
  

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  {
    headerName: 'Name 1',
    field: 'name1',
    width: 120,
  },
  {
    headerName: 'Name 2',
    field: 'name2',
    width: 120,
  },
  {
    headerName: 'Description',
    field: 'description',
    width: 120,
  },
  {
    headerName: 'Type',
    field: 'product_type',
    width: 120,
    renderCell: ({value}) => <Tooltip title={value}><span>{value}</span></Tooltip>
  },
  {
    headerName: 'Cost',
    field: 'cost',
    width: 120,
  },
  {
    headerName: 'Selling Price',
    field: 'selling_price',
    width: 120,
  },
  {
    headerName: 'Status',
    field: 'delivery_status',
    width: 120,
  },
  {
    headerName: 'Actions',
    width: 120,
    valueGetter: ({row}) => row,
    renderCell: ({value}) => <EditProductModal data={value} setToggleUpdate={setToggleUpdate}/>
  },
];

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      console.log("pressed shift+enter");
    }
  };

  return (
    <Container fluid className="main-content-container px-4" onKeyPress={handleKeyPress}>
      <Row noGutters className="page-header py-4" style={{marginBottom:"-20px"}}>
        <PageTitle sm="12" title="View Stocks" subtitle="Stocks" className="text-sm-left" />
      </Row>
      <Box sx={{ height: `calc(100vh - ${240}px)`, width: '100%' }}>
      <FilterFields setStocks={setStocks} ogStocks={ogStocks} />
      <DataGrid
          rows={stocks}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
        <Aggregation array={stocks} keys={[{label:"Cost",key:"cost"}, { label:"Selling Price", key:"selling_price"}]}/>
       </Box>
    </Container>
  )
}

export default Stock