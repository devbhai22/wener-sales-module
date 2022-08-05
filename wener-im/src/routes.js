import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import CreateDistributor from "./views/CreateDistributor";
import Distributors from "./views/Distributors"
import CreateInvoice from "./views/CreateInvoice";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Orders from "./views/Orders";
import DistributorDetails from "./views/DistributorDetails";
import OrderDetails from "./views/OrderDetails";
import PendingOrders from "./views/PendingOrders"
import ReturnedOrders from "./views/ReturnedOrders"
import EditOrder from "./views/EditOrder"
import Stock from "./views/Stock"
export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/dashboard" />
  },
  // If not logged in -- redirect to '/login'
  // eta DefaultLayout e dibo

  {
    path: "/create-distributor",
    layout: DefaultLayout,
    exact: true,
    component: CreateDistributor
  },
  {
    path: "/create-invoice",
    layout: DefaultLayout,
    exact: true,
    component: CreateInvoice
  },
  {
    path: "/distributors",
    layout: DefaultLayout,
    exact: true,
    component: Distributors
  },
  {
    path: "/distributors/:id",
    layout: DefaultLayout,
    exact: true,
    component: DistributorDetails
  },
  {
    path: "/orders",
    layout: DefaultLayout,
    exact: true,
    component: Orders
  },
  {
    path: "/pending-orders",
    layout: DefaultLayout,
    exact: true,
    component: PendingOrders
  },
  {
    path: "/returned-orders",
    layout: DefaultLayout,
    exact: true,
    component: ReturnedOrders
  },
  {
    path: "/orders/:id",
    layout: DefaultLayout,
    exact: true,
    component: OrderDetails
  },
  {
    path: "/orders/:id/edit",
    layout: DefaultLayout,
    exact: true,
    component: EditOrder
  },
  {
    path: "/my-profile",
    layout: DefaultLayout,
    exact: true,
    component: UserProfileLite
  },
  {
    path: "/login",
    layout: DefaultLayout,
    exact: true,
    component: Login
  },
  {
    path: "/logout",
    layout: DefaultLayout,
    exact: true,
    component: Logout
  },
  {
    path: "/dashboard",
    exact: true,
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/stock",
    exact: true,
    layout: DefaultLayout,
    component: Stock
  }
];
