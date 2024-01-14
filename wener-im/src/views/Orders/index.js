import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import TableComponent from "../../components/Table/TableComponent";
import supabase from '../../utils/supabase'
import ReactTable from "react-table";
import 'react-table/react-table.css'
import ExportToExcel from "../../components/Table/ExportToExcel";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Table, TableCell, TableRow, TextField } from "@mui/material";
import FilterFields from "./FilterFields";
import Aggregation from "../../components/Aggregation";

const Orders = () => {
  const [ogPosts, setOgPosts] = useState([])
  const [page, setPage] = useState(1);
  const [posts,setPosts] = useState(ogPosts)

  const history = useHistory()
  const user = supabase.auth.user()
  const statusColor = (status)=>{
    if (status==="Created By DM") return '#33cc33'
    if (status==="Approved By DM") return '#ffcc00'
    if (status==="Rejected By IM") return '#ff3300'
    if (status==="Order Dispatched") return '#33cc33'
    return 'black'
  }
  useEffect(() => {
    async function fetchData() {
      let { data: profile, error1 } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
      if (error1) {
        console.log(error1)
      }
      else {
        // console.log(profile[0])
        // setProfile(profile[0])
      }
      const PAGE_SIZE = 1000;
      const offset = (page - 1) * PAGE_SIZE;
      let { data: orders, error } = await supabase
        .from('orders')
        .select("*")
        .or('status.eq."Approved By DM",status.eq."Order Dispatched",status.eq."Rejected By IM"')
        .order("id", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1);
      if (error) {
        console.log(error)
      }
      else {
        setOgPosts(orders.map((order)=>({...order,...order.invoice_data})))
        setPosts(orders.map((order)=>({...order,...order.invoice_data})))
      }
    }
    fetchData()
  }, []);


const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { 
    headerName: 'Date',
    field:'create_date',
    valueGetter: ({row})=>row.create_date.split(",")[0],
    width: 150,
    sortable: false,
  },
  {
    headerName: 'Dealer Name',
    field: 'distributor_name',
    width: 200,
  },
  {
    headerName: 'Total Amount',
    field: 'net_total',
    type: 'number',
    width: 150,
    aggregation: true
  },
  {
    headerName: 'Status',
    field: 'status',
    width: 180,
    renderCell: ({value}) => <span style={{color:statusColor(value)}}>{value}</span>,
  },
  {
    headerName: 'Actions',
    width: 160,
    valueGetter: ({row}) => row.id,
    renderCell: ({value}) => <Button variant="outlined" onClick={() => history.push(`/orders/${value}`)}> Details
      </Button>
  },
];


  return (
 
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4" style={{marginBottom:"-20px"}}>
        <PageTitle sm="12" title="View Orders" subtitle="Orders" className="text-sm-left" />
      </Row>

      <Box sx={{ height: `calc(100vh - ${240}px)`, width: '100%' }}>
        <FilterFields setPosts={setPosts} ogPosts={ogPosts}/>
        <DataGrid
          rows={posts}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
        <Aggregation array={posts} keys={[{label:"Total Amount",key:"net_total"}]}/>
      </Box>

    </Container>

  )

};

export default Orders;

