import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

const Distributors = ({ products }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(products);
  }, [products]);

  const columns = [
    {
      Header: "Name",
      accessor: "product_name",
      style: {
        textAlign: "center"
      }
    },
    {
      Header: "Rate",
      accessor: "rate",
      style: {
        textAlign: "center"
      }
    },
    {
      Header: "Quantity",
      accessor: "quantity",
      style: {
        textAlign: "center"
      }
    },
    {
      Header: "Discount Amount",
      accessor: "discount_amount",
      style: {
        textAlign: "center"
      }
    },
    {
      Header: "Total Amount",
      accessor: "total_amount",
      style: {
        textAlign: "center"
      }
    },
    {
      Header: "Net Amount",
      accessor: "net_amount",
      style: {
        textAlign: "center"
      }
    }
  ];

  return (
    <>
      <ReactTable
        className="-striped -highlight"
        data={posts}
        filterable
        columns={columns}
        defaultPageSize={10}
        style={{ background: "white" }}
      >
        {(state, makeTable, instance) => {
          let reactTable = state.pageRows.map(modem => {
            return modem._original;
          });
          return (
            <div>
              {makeTable()}
              {/* <ExportToExcel posts={reactTable} /> */}
            </div>
          );
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
  );
};

export default Distributors;