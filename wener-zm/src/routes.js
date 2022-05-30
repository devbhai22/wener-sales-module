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
import ReturnRequest from "./views/ReturnRequest"
import PendingOrders from "./views/PendingOrders"
import EditInvoice from "./views/EditInvoice"
import EditDistributor from "./views/EditDistributor"


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
    path: "/pending-orders",
    layout: DefaultLayout,
    exact: true,
    component: PendingOrders
  },
  {
    path: "/orders",
    layout: DefaultLayout,
    exact: true,
    component: Orders
  },
  {
    path: "/orders/:id/edit",
    layout: DefaultLayout,
    exact: true,
    component: EditInvoice
  },
  {
    path: "/orders/:id",
    layout: DefaultLayout,
    exact: true,
    component: OrderDetails
  },
  {
    path: "/orders/:id/return-products",
    layout: DefaultLayout,
    exact: true,
    component: ReturnRequest
  },
  {
    path: "/distributors/:id/edit",
    layout: DefaultLayout,
    exact: true,
    component: EditDistributor
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
  }
];
