import { Divider, IconButton, MenuItem, Stack, TextField } from '@mui/material'
import React,{useState,useEffect} from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import RefreshIcon from '@mui/icons-material/Refresh';

const FilterFields = ({setStocks, ogStocks}) => {
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
  const handleChange = (e)=>{
    const {name, value}=e.target
    setFilters({...filters,[name]:value})
    setFocus(name)
  }
//   const handleDateChange = (value, name)=>{
//     setFilters({...filters,[name]:value})
//     setFocus(name)
//   }
  const reset = () => {
    setFilters({
        id:NaN,
        name1:"",
        name2:"",
        quantity:"",
        minCost:"",
        maxCost:"",
        product_type:"",
        delivery_status:"",
    })
    setStocks(ogStocks)
  }

  useEffect(() => {

    setStocks(prevPosts=>{
      let filteredPosts = ogStocks
      if(filters.id){ //perfect match
        filteredPosts=filteredPosts.filter(({id})=>id==filters.id)
      }
      if(filters.name1){//text
        filteredPosts=filteredPosts.filter(({name1})=>name1.toLowerCase().includes(filters.name1.toLowerCase()))
      }
      if(filters.name2){//text
        filteredPosts=filteredPosts.filter(({name2})=>name2.toLowerCase().includes(filters.name2.toLowerCase()))
      }
      if(filters.description){//text
        filteredPosts=filteredPosts.filter(({description})=>description.toLowerCase().includes(filters.description.toLowerCase()))
      }
      if(filters.product_type){ //perfect match
        filteredPosts=filteredPosts.filter(({product_type})=>product_type==filters.product_type)
      }
      if(filters.minCost||filters.maxCost){ //range
        if(filters.minCost && !filters.maxCost){//only start
          filteredPosts=filteredPosts.filter(({cost})=>cost==filters.minCost)
        }
        else if(!filters.minCost && filters.maxCost){//only end
          filteredPosts=filteredPosts.filter(({cost})=>cost==filters.maxCost)
        }else{ // both
          filteredPosts=filteredPosts.filter(({cost})=>{
            const value = parseInt(cost)
            const start = parseInt(filters.minCost)
            const end = parseInt(filters.maxCost)
            return (value>=start) && (value<=end ) 
          })
        }
      }
      if(filters.minPrice||filters.maxPrice){ //range
        if(filters.minPrice && !filters.maxPrice){//only start
          filteredPosts=filteredPosts.filter(({selling_price})=>selling_price==filters.minCost)
        }
        else if(!filters.minPrice && filters.maxPrice){//only end
          filteredPosts=filteredPosts.filter(({selling_price})=>selling_price==filters.maxPrice)
        }else{ // both
          filteredPosts=filteredPosts.filter(({selling_price})=>{
            const value = parseInt(selling_price)
            const start = parseInt(filters.minPrice)
            const end = parseInt(filters.maxPrice)
            return (value>=start) && (value<=end ) 
          })
        }
      }
      if(filters.delivery_status){//dropdown
        filteredPosts=filteredPosts.filter(({delivery_status})=>delivery_status==filters.delivery_status)
      }

      return filteredPosts
    })
  }, [filters])
  return (
    <div>
        <TextField variant='standard' type="number" name="id" sx={{marginTop:"5px",width:"80px"}} autoFocus={(focus=="id")} onChange={handleChange} value={filters.id}/>
        <TextField variant='standard' name="name1" sx={{marginTop:"5px",width:"120px"}} autoFocus={(focus=="name1")} onChange={handleChange} value={filters.name1}/>
        <TextField variant='standard' name="name2" sx={{marginTop:"5px",width:"120px"}} autoFocus={(focus=="name2")} onChange={handleChange} value={filters.name2}/>
        <TextField variant='standard' name="description" sx={{marginTop:"5px",width:"120px"}} autoFocus={(focus=="description")} onChange={handleChange} value={filters.description}/>
        <TextField select variant='standard' name="product_type" sx={{marginTop:"5px", width:"120px"}} autoFocus={(focus=="product_type")} onChange={handleChange} value={filters.product_type}>
        {["Created By DM","Approved By DM","Rejected By IM","Order Dispatched"].map(option=>(
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
        </TextField>
        <TextField variant='standard' name="minCost" sx={{marginTop:"5px",width:"60px"}} autoFocus={(focus=="minCost")} onChange={handleChange} value={filters.minCost}/>
        <TextField variant='standard' name="maxCost" sx={{marginTop:"5px",width:"60px"}} autoFocus={(focus=="maxCost")} onChange={handleChange} value={filters.maxCost}/>
        <TextField variant='standard' name="minPrice" sx={{marginTop:"5px",width:"60px"}} autoFocus={(focus=="minPrice")} onChange={handleChange} value={filters.minPrice}/>
        <TextField variant='standard' name="maxPrice" sx={{marginTop:"5px",width:"60px"}} autoFocus={(focus=="maxPrice")} onChange={handleChange} value={filters.maxPrice}/>
        <TextField select variant='standard' name="delivery_status" sx={{marginTop:"5px", width:"120px"}} autoFocus={(focus=="delivery_status")} onChange={handleChange} value={filters.delivery_status}>
        {["Created By DM","Approved By DM","Rejected By IM","Order Dispatched"].map(option=>(
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
        </TextField>

       <IconButton onClick={reset} sx={{ padding:"0", transform:"translate(120px,9.5px)"}} aria-label="delete">
        <RefreshIcon />
      </IconButton>

    </div>
  )
}

export default FilterFields

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}

function stringToDate(str){
  const [day, month, year] = str.split('/');
  return new Date(+year, month - 1, +day);
}