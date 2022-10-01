import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import ReactTable from "react-table";
import 'react-table/react-table.css'
import ExportToExcel from "../components/Table/ExportToExcel";
import supabase from "../utils/supabase";
import Loading from "../components/Loading/Loading"

const Profiles = () => {
    const [profiles, setProfiles] = useState([])
    const [loading, setLoading] = useState(true)
    const history = useHistory()


    useEffect(() => {
        async function fetchData() {
            let { data: profiles, error } = await supabase
                .from('profiles').select('*')
            if (error) {
                console.log(error)
            }
            else {
                setProfiles(profiles)
                console.log(profiles)
            }
            setLoading(false)
        }
        fetchData()

    }, []);


    const columns = [

        {
            Header: "Picture",
            filterable: false,
            sortable: false,
            resizable: false,
            style: {
                textAlign: "center",
            },
            Cell: props => {
                return (
                    <img src={`${process.env.REACT_APP_MEDIA_URL}${props.original.avatar_url}`}
                        alt={props.original.name}
                        style={{
                            height: '50px',
                            borderRadius: '99%',
                            width: '50px',
                            objectFit: 'cover'
                        }}
                    >
                    </img>

                )
            },
            width: 90,
            maxWidth: 100,
            minWidth: 100,
        },
        {
            Header: "Name",
            accessor: "name",
            style: {
                textAlign: "center",
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
                // whiteSpace: 'pre-wrap'
            },
            width: 300
        },
        {
            Header: "Role",
            accessor: "role",
            style: {
                textAlign: "center",
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                textTransform: 'uppercase'
                // whiteSpace: 'pre-wrap'
            },
            // width: 100
        },
        {
            Header: "Age",
            accessor: "age",
            style: {
                textAlign: "center",
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                textTransform: 'uppercase'
                // whiteSpace: 'pre-wrap'
            },
            // width: 100
        },
        {
            Header: "location",
            accessor: "location",
            style: {
                textAlign: "center",
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
                // whiteSpace: 'pre-wrap'
            },
        },
        {
            Header: "Actions",
            filterable: false,
            sortable: false,
            resizable: false,
            style: {
                textAlign: "center",
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
            },
            Cell: props => {
                return (
                    <button
                        className="btn btn-primary btn-sm"
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                            history.push(`/profiles/${props.original.id}`)
                            // deletePoste(props.original.id);
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
        return (
            <Loading></Loading>
        )
    }
    return (
        <>
            <Container fluid className="main-content-container px-4">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="12" title="Profiles Page" subtitle="Profiles" className="text-sm-left" />
                </Row>
                <ReactTable
                    className="-striped -highlight"
                    data={profiles}
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
                                <ExportToExcel posts={reactTable} />
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

export default Profiles;
