import React, { useRef } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const ExportToExcel = props => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "15px 0"
      }}
    >
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="export btn btn-success"
        table="table-to-xls"
        filename="filtredData"
        sheet="tablexls"
        buttonText="Export to Excel File"
      />

      <table hidden="true" id="table-to-xls">
        <thead>
          <tr>
            <th> Order ID</th>
            <th>Date created</th>
            <th>Dealer Name </th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.posts.map(post => {
            return (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.invoice_data.create_date}</td>
                <td>{post.distributor_name}</td>
                <td>{post.invoice_data.net_total}</td>
                <td>{post.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ExportToExcel;
