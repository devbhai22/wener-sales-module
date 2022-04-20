import React, { useEffect, useState } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import ExportToExcel from "./ExportToExcel"

const TableComponent = () => {
  const [posts, setPosts] = useState([]);

  let cancel;
  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/posts";

    fetch(url, {
      method: 'GET',
    }).then(response => response.json()).then(posts => {
      setPosts(posts)
      console.log(posts);
    })
  }, []);


  function deletePoste(id) {
    const pts = posts.filter(post => {
      return post.id !== id
    });
    setPosts(pts)
  }


  const columns = [
    {
      Header: "userID",
      accessor: "userId",
      style: {
        textAlign: "center"
      },
      width: 100
    },
    {
      Header: "ID",
      accessor: "id",
      style: {
        textAlign: "center"
      },
      width: 50
    },
    {
      Header: "Title",
      accessor: "title"
    },
    {
      Header: "Content",
      accessor: "body"
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
  return (<>
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
            <ExportToExcel posts={reactTable} />
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

export default TableComponent;