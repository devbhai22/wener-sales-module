import React from 'react'
import PageTitle from "../components/common/PageTitle";
import { Container, Row } from "shards-react";
import ReactTable from 'react-table';
const Stock = () => {
  const posts = [
    {
      id:"1",
      name1:"abrar",
      name2:"gabrar",
      quantity:5,
      sellingPrice:10,
      cost:2,
      type:"human",
      onDelivery:"IDK",
    }
  ]
  const style={
    textAlign:"center"
  }
  const columns = [
    {
      Header: "Product ID",
      accessor:"id",
      style
    },
    {
      Header: "Name 1",
      accessor:"name1",
      style
    },
    {
      Header: "Name 2",
      accessor:"name2",
      style
    },
    {
      Header: "Quantity",
      accessor:"quantity",
      style
    },
    {
      Header: "Selling Price",
      accessor:"sellingPrice",
      style
    },
    {
      Header: "Cost",
      accessor:"cost",
      style
    },
    {
      Header: "Type",
      accessor:"type",
      style
    },
    {
      Header: "On Delivery",
      accessor:"onDelivery",
      style
    },
    {
      Header: "Actions",
      style,
      Cell: ({original}) =>  
        <button
        className="btn btn-primary btn-sm"
        onClick={()=>alert("does nothing")}
        >Edit</button>
    },
  ] 
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle sm="12" title="View Stocks" subtitle="Stocks" className="text-sm-left" />
      </Row>

      <ReactTable
        className="-striped -highlight"
        data={posts}
        filterable
        sortable = {true}
        columns={columns}
        defaultPageSize={10}
        style={{ background: 'white' }}
      >
        
      </ReactTable>
    </Container>
  )
}

export default Stock