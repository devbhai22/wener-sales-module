import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css'

const DistributorOrdersTable = ({ products }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setPosts(products)
    }, [products]);


    const columns = [
        {
            Header: "Order ID",
            accessor: "id",
            style: {
                textAlign: "center"
            }
        },
        {
            Header: "Dealer Name",
            accessor: "distributor_name",
            style: {
                textAlign: "center"
            }
        },
        {
            Header: "Total Amount",
            accessor: "invoice_data.net_total",
            style: {
                textAlign: "center"
            }
        },
        {
            Header: "Status",
            accessor: "status",
            style: {
                textAlign: "center"
            }
        },
    ]

    return (
        <>

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

export default DistributorOrdersTable;