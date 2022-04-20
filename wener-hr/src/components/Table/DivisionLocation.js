import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import ReactTable from "react-table";
import 'react-table/react-table.css'
import supabase from "../../utils/supabase";

import Loading from '../Loading/Loading'


const ViewLocations = () => {
    const [divisions, setDivisions] = useState([])
    const [loading, setLoading] = useState(true)

    const history = useHistory()

    useEffect(() => {
        async function fetchData() {
            let { data: divisions, error } = await supabase
                .from('locations')
                .select('*')
                .eq('type', 'Division')

            setDivisions(divisions)
            console.log(divisions)
            setLoading(false)
        }
        fetchData()
    }, []);

    async function fetchDivisions(){
        let { data: divisions, error } = await supabase
            .from('locations')
            .select('*')
            .eq('type', 'Division')

        setDivisions(divisions)
        console.log(divisions)
    }



    function deletePoste(id) {
        const pts = divisions.filter(division => {
            return division.id !== id
        });
        setDivisions(pts)
    }

    const columns = [
        {
            Header: "ID",
            accessor: "id",
            style: {
                textAlign: "center"
            },
            width: 70
        },
        {
            Header: "Type",
            accessor: "type",
            style: {
                textAlign: "center"
            }
        }, {
            Header: "Name",
            accessor: "name",
            style: {
                textAlign: "center"
            }
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
                            history.push(`/locations/${props.original.id}`)
                            // deletePoste(props.original.id);
                            // console.log(e);
                            // console.log(props);
                        }}
                    >Edit
                    </button>
                )
            },
            width: 80,
            maxWidth: 100,
            minWidth: 100,
        }
    ]

    if(loading){
        return (
            <Loading></Loading>
        )
    }
    return (
        <>
            <ReactTable
                className="-striped -highlight mb-3"
                data={divisions}
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
                        </div>
                    )
                }}
            </ReactTable>
            <style>{`
      .-btn{
        height: 40px !important;
        color:white !important;
        background-color:#007bff !important;
        margin:10% 0 !important;
      }
      @media screen and (max-width: 700px) {
        .-btn{
        //   height:50% !important;
        //   margin:10% 0 !important;
        }
      }
    `}</style>
        </>
    )
};

export default ViewLocations;
