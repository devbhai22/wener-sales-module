import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import ReactTable from "react-table";
import 'react-table/react-table.css'
import supabase from "../../utils/supabase";
import Loading from '../Loading/Loading'

const TerritoryLocation = () => {
    const [territories, setTerritories] = useState([])
    const [zones, setZones] = useState([])
    const [loading, setLoading] = useState(true)

    const history = useHistory()

    useEffect(() => {
        async function fetchData() {
            let { data: territories, error } = await supabase
                .from('locations')
                .select('*')
                .eq('type', 'Territory')

            setTerritories(territories)
            console.log(territories)
        }
        fetchData()
    }, []);

    useEffect(() => {
        async function fetchData() {
            let { data: zones, error } = await supabase
                .from('locations')
                .select('*')
                .eq('type', 'Zone')

            setZones(zones)
            console.log(zones)
            setLoading(false)
        }
        fetchData()
    }, [territories]);

    async function deletePoste(locationID) {
        const { data, error } = await supabase
            .from('locations')
            .delete()
            .eq('id', `${locationID}`)
        if (error) {
            console.log(error)
        } else {
            setTerritories(data)
            console.log(data)
        }
    }

    async function fetchTerritories(){
        let { data: territories, error } = await supabase
            .from('locations')
            .select('*')
            .eq('type', 'Territory')

        setTerritories(territories)
        console.log(territories)
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
        },
        {
            Header: "Falls Under(Zones)",
            accessor: "falls_under_name",
            style: {
                textAlign: "center"
            },
            // Cell: props => {
            //     const zone = zones.filter(zone => {
            //         return zone.id === props.original.falls_under
            //     })
            //     console.log(zone);
            //     return (
            //         <p
            //             className=""
            //             style={{ marginBottom: '0' }}
            //         >{zone[0] ? zone[0].name : null}
            //         </p>
            //     )
            // },
        },
        {
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
                className="-striped -highlight"
                data={territories}
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

export default TerritoryLocation;
