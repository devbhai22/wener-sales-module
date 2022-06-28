import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import supabase from "../utils/supabase";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ExportToExcel from "../components/Table/ExportToExcel";

const DailyOrders = () => {
  const [posts, setPosts] = useState([]);

  const history = useHistory();
  const user = supabase.auth.user();

  useEffect(() => {
    async function fetchData() {
      let { data: profile, error1 } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id);
      if (error1) {
        console.log(error1);
      } else {
        console.log(profile[0]);
        // setProfile(profile[0])
      }

      let { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .eq(
          "invoice_data->>create_day",
          new Date().toLocaleString("en-UK").split(",")[0]
        )
        .eq("division_id", profile[0].works_at)
        .not('status', 'eq', 'Created By TSO')
        .not('status', 'eq', 'Rejected By ZSM')
        .not('status', 'eq', 'Rejected By DM');
      if (error) {
        console.log(error);
      } else {
        console.log(orders, "<----- these are the orders");
        setPosts(orders);
      }
    }
    fetchData();
  }, []);

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
        if (props.original.status == "Created By DM") {
          return (
            <span style={{ color: "#33cc33" }}> {props.original.status}</span>
          );
        } else if (props.original.status == "Approved By DM") {
          return (
            <span style={{ color: "#33cc33" }}> {props.original.status}</span>
          );
        } else if (props.original.status == "Created By TSO") {
          return (
            <span style={{ color: "#ffcc00" }}> {props.original.status}</span>
          );
        } else if (props.original.status == "Approved By ZSM") {
          return (
            <span style={{ color: "#ffcc00" }}> {props.original.status}</span>
          );
        } else if (props.original.status == "Rejected By ZSM") {
          return (
            <span style={{ color: "#ff3300" }}> {props.original.status}</span>
          );
        } else if (props.original.status == "Order Dispatched") {
          return (
            <span style={{ color: "#33cc33" }}> {props.original.status}</span>
          );
        } else if (props.original.status == "Rejected By DM") {
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
      Cell: props => {
        return (
          <button
            className="btn btn-primary btn-sm"
            style={{ cursor: "pointer" }}
            onClick={e => {
              history.push(`/orders/${props.original.id}`);
              // console.log(e);
              // console.log(props);
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
            let reactTable = state.pageRows.map(modem => {
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

export default DailyOrders;
