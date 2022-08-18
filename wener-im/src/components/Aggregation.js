import { Divider } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

const Aggregation = ({array, keys}) => {
  return (
    <Stack direction="row" 
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{marginLeft:"15px", marginTop:"-40px"}}
    >
        <span>Items: {array.length}</span>
        {keys.map((key)=>
            <span>{key.label}: {array.reduce((sum, el)=>sum+parseFloat(el[key.key]),0)}</span>
        )}
    </Stack>
  )
}

export default Aggregation