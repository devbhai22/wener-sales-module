import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";
import { useHistory } from "react-router-dom";
import supabase from "../utils/supabase";

const OrderDetailsCard = ({ id }) => {
  const [order, setOrder] = useState({});
  const [distributor, setDistributor] = useState({});

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      let { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", parseInt(id));
      if (error) {
        console.log(error);
      } else {
        setOrder(orders[0]);
        console.log(orders);
      }

      await fetchDistributor(orders);
    }

    async function fetchDistributor(orders) {
      let { data: distributors, error2 } = await supabase
        .from("distributors")
        .select("*")
        .eq("id", parseInt(orders[0].distributor_id));
      if (error2) {
        console.log(error2);
      } else {
        console.log(distributors, "distributors list");
        setDistributor(distributors[0]);
      }
    }
    fetchData();
  }, []);

  return (
    <Card small className="mb-4 pt-4">
      <ListGroup flush>
        <ListGroupItem className="p-0 m-0 mx-auto">
          <h5 style={{ fontWeight: "500" }}>Details</h5>
        </ListGroupItem>
        <ListGroupItem className="px-4 pb-5 pb-0">
          <strong className="text-muted d-block">
            <span style={{ color: "#525252" }}>Invoice ID : </span>
            {order.invoice_data ? order.invoice_data.invoice_id : null}
          </strong>
          <strong className="text-muted d-block">
            <span style={{ color: "#525252" }}>Date created : </span>
            {order.invoice_data ? order.invoice_data.create_date : null}
          </strong>
          <strong className="text-muted d-block mt-1">
            <span style={{ color: "#525252" }}>Distributor Name : </span>
            {distributor.business_name}
          </strong>
          <strong className="text-muted d-block mt-1">
            <span style={{ color: "#525252" }}>Distributor Location : </span>
            {distributor.territory_name}
          </strong>
          <strong className="text-muted d-block mt-1">
            <span style={{ color: "#525252" }}>
              Distributor Credit Limit :{" "}
            </span>
            {distributor.credit_limit}
          </strong>
          <strong className="text-muted d-block mt-1">
            <span style={{ color: "#525252" }}>Distributor Credit : </span>
            {distributor.credit}
          </strong>
          <strong className="text-muted d-block mt-1">
            <span style={{ color: "#525252" }}>
              Distributor Credit Status :{" "}
            </span>
            {distributor.credit_limit > distributor.credit ? (
              <span style={{ color: "#008000" }}>Under the Limit</span>
            ) : (
              <span style={{ color: "#ff0000" }}>Over the Limit</span>
            )}
          </strong>
          <strong className="text-muted d-block mt-1">
            <span style={{ color: "#525252" }}>Payment Method : </span>
            {order.invoice_data ? order.invoice_data.payment_method : null}
          </strong>
          {order.invoice_data ? (
            order.invoice_data.picture_path ? (
              <a
                target="_blank"
                href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${order.invoice_data.picture_path}`}
              >
                <button className="btn btn-primary d-block mx-auto mb-3 w-100">
                  View Payment Slip
                </button>
              </a>
            ) : (
              <a target="_blank">
                <button className="btn btn-secondary d-block mx-auto mb-3 w-100">
                  No Payment Slip Available
                </button>
              </a>
            )
          ) : null}
          <strong className="text-muted d-block">
            <span style={{ color: "#525252" }}>Transport Name : </span>
            {order.invoice_data ? order.invoice_data.transport_name : null}
          </strong>
          <strong className="text-muted d-block">
            <span style={{ color: "#525252" }}>Transport Address : </span>
            {order.invoice_data ? order.invoice_data.transport_address : null}
          </strong>
          <strong className="text-muted d-block">
            <span style={{ color: "#525252" }}>Gross Total : </span>
            {order.invoice_data ? order.invoice_data.gross_total : null}
          </strong>
          <strong className="text-muted d-block">
            <span style={{ color: "#525252" }}>Total Discount : </span>
            {order.invoice_data ? order.invoice_data.total_discount : null}
          </strong>
          <strong className="text-muted d-block">
            <span style={{ color: "#525252" }}>Net Total : </span>
            {order.invoice_data ? order.invoice_data.net_total : null}
          </strong>
          <strong className="text-muted d-block">
            <span style={{ color: "#525252" }}>Status : </span>
            {order.invoice_data ? order.status : null}
          </strong>
          <strong className="text-muted d-block">
            <span style={{ color: "#525252" }}>Notes : </span>
            {order.invoice_data ? order.invoice_data.notes : null}
          </strong>
        </ListGroupItem>

        {order.status === "Rejected By DM" ||
        order.status === "Rejected By ZSM" ? (
          <>
            <Button
              className="m-1"
              theme="info"
              type="button"
              onClick={e => {
                history.push(`/orders/${order.id}/edit`);
              }}
            >
              Edit and Revive Order
            </Button>
          </>
        ) : null}
        
        {order.status === "Order Dispatched" ? (
          <ListGroupItem className="p-0 m-4 mx-auto">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                history.push(`/orders/${id}/return-products`);
              }}
            >
              Create Return Request Button
            </button>
          </ListGroupItem>
        ) : null}
      </ListGroup>
    </Card>
  );
};

export default OrderDetailsCard;
