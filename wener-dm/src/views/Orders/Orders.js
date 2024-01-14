import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import supabase from "../../utils/supabase";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ExportToExcel from "../../components/Table/ExportToExcel";

const Orders = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const history = useHistory();
  const user = supabase.auth.user();

  useEffect(() => {
    fetchData();
  }, [page]);

  async function fetchData() {
    if (!supabase || !supabase.from || typeof supabase.from !== "function") {
      console.error("Supabase is not correctly set up.");
      return;
    }

    let { data: profile, error1 } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id);

    if (error1) {
      console.log(error1);
      return;
    }

    const PAGE_SIZE = 1000;
    const offset = (page - 1) * PAGE_SIZE;

    try {
      let { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .eq("division_id", profile[0].works_at)
        .order("id", { ascending: false }) // Add this line to order by id in descending order
        .range(offset, offset + PAGE_SIZE - 1);

      console.log("Orders:", orders); // Log orders data to check API response

      if (error) {
        console.log("Error fetching orders:", error); // Log API error if any
      } else {
        console.log("Orders:", orders, "<----- these are the orders");
        setPosts(orders);

        // Fetch the total count of items
        // let { data: totalCountData, error: countError } = await supabase
        //   .from("orders")
        //   .select("count(*)")
        //   .eq("division_id", profile[0].works_at);
        let { totalCountData , countError } = await supabase.rpc('count_order')
        console.log("Total count:", totalCountData); // Log total count to check API response
        if (countError) {
          console.log("Error fetching count:", countError);
          return;
        }

        const totalCount = totalCountData;
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);
        setTotalPages(totalPages);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  }

  function handleNextPage() {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  function handlePrevPage() {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  const columns = [
    {
      Header: "Order ID",
      style: {
        textAlign: "center"
      },
      accessor: "id"
    },
    {
      Header: "Date created",
      style: {
        textAlign: "center"
      },
      accessor: "invoice_data.create_date"
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
      style: {
        textAlign: "center"
      },
      accessor: "invoice_data.net_total"
    },
    {
      Header: "Status",
      accessor: "status",
      style: {
        textAlign: "center"
      },
      Cell: props => {
        if (props.original.status === "Created By DM") {
          return (
            <span style={{ color: "#33cc33" }}> {props.original.status}</span>
          );
        } else if (props.original.status === "Approved By DM") {
          return (
            <span style={{ color: "#33cc33" }}> {props.original.status}</span>
          );
        } else if (props.original.status === "Created By TSO") {
          return (
            <span style={{ color: "#ffcc00" }}> {props.original.status}</span>
          );
        }else if (props.original.status === "Created By SR") {
          return (
            <span style={{ color: "#ffcc00" }}> {props.original.status}</span>
          );
        } else if (props.original.status === "Approved By ZSM") {
          return (
            <span style={{ color: "#ffcc00" }}> {props.original.status}</span>
          );
        } else if (props.original.status === "Rejected By ZSM") {
          return (
            <span style={{ color: "#ff3300" }}> {props.original.status}</span>
          );
        } else if (props.original.status === "Order Dispatched") {
          return (
            <span style={{ color: "#33cc33" }}> {props.original.status}</span>
          );
        } else if (props.original.status === "Rejected By DM") {
          return (
            <span style={{ color: "#ff3300" }}> {props.original.status}</span>
          );
        } else {
          return <span>{props.original.status}</span>;
        }
      }
    },
    {
      Header: "Actions",
      filterable: false,
      sortable: false,
      resizable: false,
      style: {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        display: "flex"
      },
      Cell: (props) => {
        return (
          <button
            className="btn btn-primary btn-sm"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              history.push(`/orders/${props.original.id}`);
            }}
          >
            Details
          </button>
        );
      },
      width: 100,
      maxWidth: 100,
      minWidth: 100
    }
  ];

  return (
    <>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="12"
            title="View Orders"
            subtitle="Orders"
            className="text-sm-left"
          />
        </Row>

        <ReactTable
          className="-striped -highlight"
          data={posts}
          filterable
          sortable
          columns={columns}
          defaultPageSize={10}
          style={{ background: "white" }}
        >
          {(state, makeTable, instance) => {
            let reactTable = state.pageRows.map((modem) => {
              return modem._original;
            });
            return (
              <div>
                {makeTable()}
                <ExportToExcel posts={reactTable} />
              </div>
            );
          }}
        </ReactTable>

        {/* Pagination buttons */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </button>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Next
          </button>
        </div>
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
  );
};

export default Orders;