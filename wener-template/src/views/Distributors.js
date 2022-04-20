import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import TableComponent from "../components/Table/TableComponent";
import supabase from '../utils/supabase'
import ReactTable from "react-table";
import 'react-table/react-table.css'
import ExportToExcel from "../components/Table/ExportToExcel";

const Distributors = () => {
  const [posts, setPosts] = useState([])

  const history = useHistory()

  useEffect(() => {

    const user = supabase.auth.user()

    if (!user) {
      history.push('/login')
    } else {
      async function fetchData() {
        let { data: dealers, error } = await supabase
          .from('distributors')
          .select("*")
          .eq('tso_id', user.id)

        setPosts(dealers)
        console.log(dealers)
      }
      fetchData()
    }

  }, []);



  function deletePoste(id) {
    const pts = posts.filter(post => {
      return post.id !== id
    });
    setPosts(pts)
  }

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      style: {
        textAlign: "center"
      },
      width: 50
    },
    {
      Header: "Name",
      accessor: "name",
      style: {
        textAlign: "center"
      }
    },
    {
      Header: "Business Type",
      accessor: "business_type"
    },
    {
      Header: "Address",
      accessor: "address"
    },
    {
      Header: "Phone Number",
      accessor: "phone"
    },
    {
      Header: "Actions",
      filterable: false,
      sortable: false,
      resizable: false,
      style: {
        textAlign: "center"
      },
      Cell: props => {
        return (
          <i
            className="fa fa-trash"
            style={{ cursor: 'pointer' }}
            aria-hidden={true}
            onClick={(e) => {
              deletePoste(props.original.id);
              // console.log(e);
              // console.log(props);
            }}
          >
          </i>

          // <button
          //   className='btn btn-danger btn-sm'

          // >Delete</button>
        )
      },
      width: 100,
      maxWidth: 100,
      minWidth: 100,
    }
  ]

  return (
    <>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="12" title="Add New Post" subtitle="Blog Posts" className="text-sm-left" />
        </Row>

        <ReactTable
          className="-striped -highlight"
          data={posts}
          filterable
          columns={columns}
          defaultPageSize={10}
          style={{ background: 'white' }}
        >
          {(state, makeTable, instance) => {
            let reactTable = state.pageRows.map(modem => { return modem._original });
            return (
              <div>
                {makeTable()}
                {/* <ExportToExcel posts={reactTable} /> */}
              </div>
            )
          }}
        </ReactTable>
      </Container>
      <style>{`
      .-btn{
        color:white !important;
        background-color:#007bff !important;
      }
      @media screen and (max-width: 700px) {
        .-btn{
          height:50% !important;
          margin:10% 0 !important;
        }
      }
    `}</style>
    </>
  )

};

export default Distributors;



    // {/* Default Light Table */}
    // <Row>
    //   <Col>
    //     <Card small className="mb-4">
    //       <CardHeader className="border-bottom">
    //         <h6 className="m-0">Active Users</h6>
    //       </CardHeader>
    //       <CardBody className="p-0 pb-3">
    //         <table className="table mb-0">
    //           <thead className="bg-light">
    //             <tr>
    //               <th scope="col" className="border-0">
    //                 #
    //               </th>
    //               <th scope="col" className="border-0">
    //                 First Name
    //               </th>
    //               <th scope="col" className="border-0">
    //                 Last Name
    //               </th>
    //               <th scope="col" className="border-0">
    //                 Country
    //               </th>
    //               <th scope="col" className="border-0">
    //                 City
    //               </th>
    //               <th scope="col" className="border-0">
    //                 Phone
    //               </th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             <tr>
    //               <td>1</td>
    //               <td>Ali</td>
    //               <td>Kerry</td>
    //               <td>Russian Federation</td>
    //               <td>Gdańsk</td>
    //               <td>107-0339</td>
    //             </tr>
    //             <tr>
    //               <td>2</td>
    //               <td>Clark</td>
    //               <td>Angela</td>
    //               <td>Estonia</td>
    //               <td>Borghetto di Vara</td>
    //               <td>1-660-850-1647</td>
    //             </tr>
    //             <tr>
    //               <td>3</td>
    //               <td>Jerry</td>
    //               <td>Nathan</td>
    //               <td>Cyprus</td>
    //               <td>Braunau am Inn</td>
    //               <td>214-4225</td>
    //             </tr>
    //             <tr>
    //               <td>4</td>
    //               <td>Colt</td>
    //               <td>Angela</td>
    //               <td>Liberia</td>
    //               <td>Bad Hersfeld</td>
    //               <td>1-848-473-7416</td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </CardBody>
    //     </Card>
    //   </Col>
    // </Row>

    // {/* Default Dark Table */}
    // <Row>
    //   <Col>
    //     <Card small className="mb-4 overflow-hidden">
    //       <CardHeader className="bg-dark">
    //         <h6 className="m-0 text-white">Active Users</h6>
    //       </CardHeader>
    //       <CardBody className="bg-dark p-0 pb-3">
    //         <table className="table table-dark mb-0">
    //           <thead className="thead-dark">
    //             <tr>
    //               <th scope="col" className="border-0">
    //                 #
    //               </th>
    //               <th scope="col" className="border-0">
    //                 First Name
    //               </th>
    //               <th scope="col" className="border-0">
    //                 Last Name
    //               </th>
    //               <th scope="col" className="border-0">
    //                 Country
    //               </th>
    //               <th scope="col" className="border-0">
    //                 City
    //               </th>
    //               <th scope="col" className="border-0">
    //                 Phone
    //               </th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             <tr>
    //               <td>1</td>
    //               <td>Ali</td>
    //               <td>Kerry</td>
    //               <td>Russian Federation</td>
    //               <td>Gdańsk</td>
    //               <td>107-0339</td>
    //             </tr>
    //             <tr>
    //               <td>2</td>
    //               <td>Clark</td>
    //               <td>Angela</td>
    //               <td>Estonia</td>
    //               <td>Borghetto di Vara</td>
    //               <td>1-660-850-1647</td>
    //             </tr>
    //             <tr>
    //               <td>3</td>
    //               <td>Jerry</td>
    //               <td>Nathan</td>
    //               <td>Cyprus</td>
    //               <td>Braunau am Inn</td>
    //               <td>214-4225</td>
    //             </tr>
    //             <tr>
    //               <td>4</td>
    //               <td>Colt</td>
    //               <td>Angela</td>
    //               <td>Liberia</td>
    //               <td>Bad Hersfeld</td>
    //               <td>1-848-473-7416</td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </CardBody>
    //     </Card>
    //   </Col>
    // </Row>