import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/Profile/UserProfileLite";
import CreateDistributor from "./views/Distributor/CreateDistributor";
import Distributors from "./views/Distributor/Distributors"
import CreateInvoice from "./views/Invoice/CreateInvoice";
import Login from "./views/Auth/Login";
import Logout from "./views/Auth/Logout";
import Orders from "./views/Orders/Orders";
import DistributorDetails from "./views/Distributor/DistributorDetails";
import OrderDetails from "./views/Orders/OrderDetails";
import EditInvoice from "./views/Invoice/EditInvoice";
import EditDistributor from "./views/Distributor/EditDistributor";
import PendingOrders from "./views/Orders/PendingOrders"
import DailyOrders from "./views/Orders/DailyOrders";
import Notifications from "./views/Notifications/Notifications";
import ReturnRequest from "./views/Returns/ReturnRequest";

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
    path: "/return-request",
    layout: DefaultLayout,
    exact: true,
    component: ReturnRequest
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
    path: "/distributors/:id/edit",
    layout: DefaultLayout,
    exact: true,
    component: EditDistributor
  },
  {
    path: "/orders",
    layout: DefaultLayout,
    exact: true,
    component: Orders
  },
  {
    path: "/orders/:id",
    layout: DefaultLayout,
    exact: true,
    component: OrderDetails
  },
  {
    path: "/pending-orders",
    layout: DefaultLayout,
    exact: true,
    component: PendingOrders
  },
  {
    path: "/orders/:id/edit",
    layout: DefaultLayout,
    exact: true,
    component: EditInvoice
  },
  {
    path: "/my-profile",
    layout: DefaultLayout,
    exact: true,
    component: UserProfileLite
  },
  {
    path: "/daily-orders",
    exact: true,
    layout: DefaultLayout,
    component: DailyOrders
  },
  {
    path: "/notifications",
    exact: true,
    layout: DefaultLayout,
    component: Notifications
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
