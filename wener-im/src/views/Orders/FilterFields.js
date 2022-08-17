import { IconButton, MenuItem, Stack, TextField } from '@mui/material'
import React,{useState,useEffect} from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import RefreshIcon from '@mui/icons-material/Refresh';

const FilterFields = ({setPosts, ogPosts}) => {
  const [focus, setFocus] = useState(null)
  const [filters, setFilters] = useState({
    startDate:null,
    endDate:null,
    distributor_name:"",
    minAmount:"",
    maxAmount:"",
    status:"",
  })
  const handleChange = (e)=>{
    const {name, value}=e.target
    setFilters({...filters,[name]:value})
    setFocus(name)
  }
  const handleDateChange = (value, name)=>{
    setFilters({...filters,[name]:value})
    setFocus(name)
  }
  const reset = () => {
    setFilters({
      startDate:null,
      endDate:null,
      distributor_name:"",
      minAmount:"",
      maxAmount:"",
      status:"",
    })
    setPosts(ogPosts)
  }

  useEffect(() => {

    setPosts(prevPosts=>{
      let filteredPosts = ogPosts
      if(filters.id){ //perfect match
        filteredPosts=filteredPosts.filter(({id})=>id==filters.id)
      }
      if(filters.startDate||filters.endDate){ //range

        if(filters.startDate && !filters.endDate){//only start
          filteredPosts=filteredPosts.filter(({create_date})=>create_date.split(',')[0]==formatDate(filters.startDate))
        }
        else if(!filters.startDate && filters.endDate){//only end
          filteredPosts=filteredPosts.filter(({create_date})=>create_date.split(',')[0]==formatDate(filters.endDate))
        }else{ // both
          console.log("both")
          filteredPosts=filteredPosts.filter(({create_date})=>{
            // const value = new Date(create_date.split(',')[0])
            // const start = new Date(formatDate(filters.startDate))
            // const end = new Date(formatDate(filters.endDate))
            const value = stringToDate(create_date.split(',')[0])
            const start = stringToDate(formatDate(filters.startDate))
            const end = stringToDate(formatDate(filters.endDate))
            console.log(value, start, end)
            return (value>=start) && (value<=end ) 
          })
        }
      }
      if(filters.distributor_name){//text
        filteredPosts=filteredPosts.filter(({distributor_name})=>distributor_name.toLowerCase().includes(filters.distributor_name.toLowerCase()))
      }

      if(filters.minAmount||filters.maxAmount){ //range
        if(filters.minAmount && !filters.maxAmount){//only start
          filteredPosts=filteredPosts.filter(({net_total})=>net_total==filters.minAmount)
        }
        else if(!filters.minAmount && filters.maxAmount){//only end
          filteredPosts=filteredPosts.filter(({net_total})=>net_total==filters.maxAmount)
        }else{ // both
          console.log("both")
          filteredPosts=filteredPosts.filter(({net_total})=>{
            const value = parseInt(net_total)
            const start = parseInt(filters.minAmount)
            const end = parseInt(filters.maxAmount)
            return (value>=start) && (value<=end ) 
          })
        }
      }
      if(filters.status){//dropdown
        filteredPosts=filteredPosts.filter(({status})=>status==filters.status)
      }

      return filteredPosts
    })
  }, [filters])
  return (
    <div>
        <TextField variant='standard' name="id" sx={{marginTop:"5px",width:"100px"}} autoFocus={(focus=="id")} onChange={handleChange} value={filters.id}/>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div style={{display:"inline-flex",justifyContent:"space-around", width:'150px'}}>
            <div style={{maxWidth:44, overflow:"hidden", display:"inline-block", padding:"0px", borderRadius:"50%"}}>
              <DesktopDatePicker
                inputFormat='dd/MM/yy'
                name="startDate"
                value={filters.startDate}
                onChange={(value)=>handleDateChange(value,"startDate")}
                renderInput={(params)=><TextField variant='standard' sx={{marginTop:"5px", transform:"translateX(-14.5px)"}} {...params}/>}
              />
            </div>
            
            <div style={{maxWidth:44, overflow:"hidden", display:"inline-block", padding:"0px", borderRadius:"50%"}}>
              <DesktopDatePicker
                inputFormat='dd/MM/yy'
                name="endDate"
                value={filters.endDate}
                onChange={(value)=>handleDateChange(value,"endDate")}
                renderInput={(params)=><TextField variant='standard' sx={{marginTop:"5px", transform:"translateX(-14.5px)"}} {...params}/>}
              />
            </div>
          </div>
        </LocalizationProvider>
        <TextField variant='standard' name="distributor_name" sx={{marginTop:"5px",width:"200px"}} autoFocus={(focus=="distributor_name")} onChange={handleChange} value={filters.distributor_name}/>
        <TextField variant='standard' name="minAmount" sx={{marginTop:"5px",width:"75px"}} autoFocus={(focus=="minAmount")} onChange={handleChange} value={filters.minAmount}/>
        <TextField variant='standard' name="maxAmount" sx={{marginTop:"5px",width:"75px"}} autoFocus={(focus=="maxAmount")} onChange={handleChange} value={filters.maxAmount}/>
        <TextField select variant='standard' name="status" sx={{marginTop:"5px", width:"180px"}} autoFocus={(focus=="status")} onChange={handleChange} value={filters.status}>
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