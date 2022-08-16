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

const Orders = () => {
  const [ogPosts, setOgPosts] = useState([])
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

      let { data: orders, error } = await supabase
        .from('orders')
        .select("*")
        .or('status.eq."Approved By DM",status.eq."Order Dispatched",status.eq."Rejected By IM"')
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
    field: 'create_date',
    headerName: 'Date',
    width: 180,
  },
  {
    field: 'distributor_name',
    headerName: 'Dealer Name',
    width: 200,
  },
  {
    field: 'net_total',
    headerName: 'Total Amount',
    type: 'number',
    width: 150,
  },
  {
    field: 'status',
    headerName: 'Status',
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
      </Box>

    </Container>

  )

};

export default Orders;


// const Orders = () => {
//   const [ogPosts, setOgPosts] = useState([])

//   const history = useHistory()
//   const user = supabase.auth.user()

//   useEffect(() => {
//     async function fetchData() {
//       let { data: profile, error1 } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", user.id)
//       if (error1) {
//         console.log(error1)
//       }
//       else {
//         console.log(profile[0])
//         // setProfile(profile[0])
//       }

//       let { data: orders, error } = await supabase
//         .from('orders')
//         .select("*")
//         .or('status.eq."Approved By DM",status.eq."Order Dispatched",status.eq."Rejected By IM"')
//       if (error) {
//         console.log(error)
//       }
//       else {

//         setOgPosts(orders)
//         console.log(orders)
//       }
//     }
//     fetchData()
//   }, []);


//   const columns = [
//     {
//       Header: "Order ID",
//       style: {
//         textAlign: "center"
//       },
//       accessor: "id"
//     },
//     {
//       Header: "Date",
//       style: {
//         textAlign: "center"
//       },
//       accessor: "invoice_data.create_date"
//     },
//     {
//       Header: "Dealer Name",
//       accessor: "distributor_name",
//       style: {
//         textAlign: "center"
//       }
//     },
//     {
//       Header: "Total Amount",
//       style: {
//         textAlign: "center"
//       },
//       accessor: "invoice_data.net_total"
//     },
//     {
//       Header: "Status",
//       accessor: "status",
//       style: {
//         textAlign: "center",
//       },
//       Cell: props => {
//           if(props.original.status == "Created By DM"){
//             return(
//               <span
//               style = {{color: '#33cc33'}}
//               > {props.original.status}
//               </span>
//             )
//           }
//           else if(props.original.status == "Approved By DM"){
//             return(
//               <span
//               style = {{color: '#ffcc00'}}
//               > {props.original.status}
//               </span>
//             )
//           }
//           else if(props.original.status == "Rejected By IM"){
//             return(
//               <span
//               style = {{color: '#ff3300'}}
//               > {props.original.status}
//               </span>
//             )
//           }
//           else if(props.original.status == "Order Dispatched"){
//             return(
//               <span
//               style = {{color: '#33cc33'}}
//               > {props.original.status}
//               </span>
//             )
//           }
//           else{
//             return(<span>{props.original.status}</span>)
//           }
//       },
//     },

//     {
//       Header: "Actions",
//       filterable: false,
//       sortable: false,
//       resizable: false,
//       style: {
//         textAlign: "center",
//         alignItems: 'center',
//         justifyContent: 'center',
//         display: 'flex'
//       },
//       Cell: props => {
//         return (
//           <button
//             className="btn btn-primary btn-sm"
//             style={{ cursor: 'pointer' }}
//             onClick={(e) => {
//               history.push(`/orders/${props.original.id}`)
//               // console.log(e);
//               // console.log(props);
//             }}
//           >Details
//           </button>
//         )
//       },
//       width: 100,
//       maxWidth: 100,
//       minWidth: 100,
//     }
//   ]

//   return (
//     <>
//       <Container fluid className="main-content-container px-4">
//         {/* Page Header */}
//         <Row noGutters className="page-header py-4">
//           <PageTitle sm="12" title="View Orders" subtitle="Orders" className="text-sm-left" />
//         </Row>

//         <ReactTable
//           className="-striped -highlight"
//           data={ogPosts}
//           filterable
//           sortable = {true}
//           columns={columns}
//           defaultPageSize={10}
//           style={{ background: 'white' }}
//         >
//           {(state, makeTable, instance) => {
//             let reactTable = state.pageRows.map(modem => { return modem._original });
//             return (
//               <div>
//                 {makeTable()}
//                 {/* <ExportToExcel ogPosts={reactTable} /> */}
//               </div>
//             )
//           }}
//         </ReactTable>
//       </Container>
//       <style>{`
//       .-btn{
//         color:white !important;
//         background-color:#007bff !important;
//       }
//       @media screen and (max-width: 700px) {
//         .-btn{
//           height:50% !important;
//           margin:10% 0 !important;
//         }
//       }
//     `}</style>
//     </>
//   )

// };

// export default Orders;



