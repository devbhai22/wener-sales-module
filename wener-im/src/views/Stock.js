import React, { useState, useRef, useEffect } from 'react'
import PageTitle from "../components/common/PageTitle";
import { Container, Row } from "shards-react";
import ReactTable from 'react-table';
import { TextField, MenuItem } from '@mui/material'
import EditProductModal from '../components/editProductModal/EditProductModal';

const Stock = () => {
  
  const [ogPosts, setOgPosts] = useState([
    {
      id:"1",
      name1:"abrar",
      name2:"gabrar",
      quantity:5,
      sellingPrice:10,
      cost:2,
      type:"human",
      onDelivery:"IDK",
      image:"https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id:"2",
      name1:"pocket",
      name2:"knife",
      quantity:5,
      sellingPrice:10,
      cost:2,
      type:"tool",
      onDelivery:"IDK",
      image:"https://images.pexels.com/photos/168804/pexels-photo-168804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }

  ])
  const [posts,setPosts] = useState(ogPosts)
  const [filters, setFilters] = useState({
    id:"",
    name1:"",
    name2:"",
    quantity:"",
    sellingPrice:"",
    cost:"",
    type:"",
    onDelivery:"",
  })
  const [focus, setFocus] = useState(null)
  useEffect(() => {

    setPosts(prevPosts=>{
      let filteredPosts = ogPosts
      if(filters.name1){
        filteredPosts=filteredPosts.filter(({name1})=>name1.includes(filters.name1))
      }
      if(filters.name2){
        filteredPosts=filteredPosts.filter(({name2})=>name2.includes(filters.name2))
      }
      if(filters.quantity){
        filteredPosts=filteredPosts.filter(({quantity})=>quantity==filters.quantity)
      }
      if(filters.sellingPrice){
        filteredPosts=filteredPosts.filter(({sellingPrice})=>sellingPrice==filters.sellingPrice)
      }
      if(filters.cost){
        filteredPosts=filteredPosts.filter(({cost})=>cost==filters.cost)
      }
      if(filters.type){
        filteredPosts=filteredPosts.filter(({type})=>type==filters.type)
      }
      if(filters.onDelivery){
        filteredPosts=filteredPosts.filter(({onDelivery})=>onDelivery==filters.onDelivery)
      }

      return filteredPosts
    })
  }, [filters])
  
  const idRef = useRef(null)
  const name1Ref = useRef(null)
  const name2Ref = useRef(null)
  const quantityRef = useRef(null)
  const sellingPriceRef = useRef(null)
  const costRef = useRef(null)
  const typeRef = useRef(null)
  const onDeliveryRef = useRef(null)


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
    justifyContent:"center"
  }
  const columns = [
    {
      Header: ()=><TextField size='small' label="Product Id" name="id" sx={{marginTop:"5px"}} autoFocus={(focus=="id")} onChange={handleChange} value={filters.id}/>,
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
      Header: ()=><TextField size='small' label="Selling Price" name="sellingPrice" sx={{marginTop:"5px"}} autoFocus={(focus=="sellingPrice")} onChange={handleChange} value={filters.sellingPrice}/>,
      accessor:"sellingPrice",
      style
    },
    {
      Header: ()=><TextField size='small' label="Cost" name="cost" sx={{marginTop:"5px"}} autoFocus={(focus=="cost")} onChange={handleChange} value={filters.cost}/>,
      accessor:"cost",
      style
    },
    {
      Header: ()=>
      <TextField select fullWidth size='small' label="Type" name="type" sx={{marginTop:"5px"}} autoFocus={(focus=="type")} onChange={handleChange} value={filters.type}>
        {posts.map(post=>post.type).filter((v, i, a) => a.indexOf(v) === i).map(option=>(
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>,
      accessor:"type",
      style
    },
    {
      Header: ()=><TextField size='small' label="On Delivery" name="onDelivery" sx={{marginTop:"5px"}} autoFocus={(focus=="onDelivery")} onChange={handleChange} value={filters.onDelivery}/>,
      accessor:"onDelivery",
      style
    },
    {
      Header: ()=><TextField size='small' label="Image" sx={{marginTop:"5px"}} disabled/>,
      style,
      Cell: ({original}) =>  
        <img style={{width:"auto", height:"40px", borderRadius:"5px"}} src={original.image} alt={original.name1} />
    },
    {
      Header: ()=><TextField size='small' label="Action" sx={{marginTop:"5px"}} disabled/>,
      style,
      Cell: ({original}) =>  
      <EditProductModal data={original}/>
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
        data={posts}
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