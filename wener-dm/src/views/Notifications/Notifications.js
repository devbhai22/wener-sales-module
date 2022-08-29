import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import supabase from "../../utils/supabase";
import ReactTable from "react-table";
import "react-table/react-table.css";

const Notifications = () => {
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

      let { data: notifications, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("concern_of", profile[0].works_at);
      if (error) {
        console.log(error);
      } else {
        console.log(notifications, "<----- these are the notifications");
        setPosts(notifications);
      }
    }
    fetchData();
  }, []);

  const columns = [
    {
      Header: "Request date",
      style: {
        textAlign: "center"
      },
      accessor: "created_at",
      width: 300
    },
    {
      Header: "Messages",
      style: {
        textAlign: "center"
      },
      accessor: "message"
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
          <>
            <button
              className="btn btn-primary btn-sm"
              style={{ cursor: "pointer" }}
              onClick={e => {
                history.push(
                  `/distributors/${props.original.distributor_location}`
                );
                // console.log(e);
                // console.log(props);
              }}
            >
              Dealer
            </button>
            <button
              className="btn btn-danger btn-sm"
              style={{ cursor: "pointer", marginLeft: 10 }}
              onClick={
                async () => {
                const { data, error } = await supabase
                .from('notifications')
                .delete()
                .match({ distributor_location: props.original.distributor_location })
                document.location.reload(true)
              }
            }
            >
              Reject
            </button>
          </>
        );
      },
      width: 200,
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
            title="Edit Access Requests"
            subtitle="Notifications"
            className="text-sm-left"
          />
        </Row>

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

export default Notifications;
