import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import TableComponent from "../components/Table/TableComponent";
import supabase from '../utils/supabase'
import ReactTable from "react-table";
import 'react-table/react-table.css'
import Loading from "../components/Loading/Loading";


const Distributors = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const history = useHistory()
  const user = supabase.auth.user()

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
        console.log(profile[0])
        // setProfile(profile[0])
      }

      let { data: distributors, error } = await supabase
        .from('distributors')
        .select('*')
        .eq('territory_id', profile[0].works_at)
      if (error) {
        console.log(error)
      }
      else {
        setLoading(false)

        setPosts(distributors)
        console.log(distributors)
      }
    }
    fetchData()

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
      Header: "Business Name",
      accessor: "business_name",
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
          <button
            className="btn btn-primary btn-sm"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              history.push(`/distributors/${props.original.id}`)
              // console.log(e);
              // console.log(props);
            }}
          >Details
          </button>
        )
      },
      width: 100,
      maxWidth: 100,
      minWidth: 100,
    }
  ]

  if (loading) {
    return <Loading></Loading>
  }

  return (
    <>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="12" title="View Dealers" subtitle="Dealers" className="text-sm-left" />
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