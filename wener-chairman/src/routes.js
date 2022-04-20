import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import Distributors from "./views/Distributors"
import Login from "./views/Login";
import Logout from "./views/Logout";
import Orders from "./views/Orders";
import DistributorDetails from "./views/DistributorDetails";
import OrderDetails from "./views/OrderDetails";
import ReturnRequest from "./views/ReturnRequest";
import EditOrder from "./views/EditOrder";
import EditDistributor from "./views/EditDistributor";
import Profiles from "./views/Profiles";
import SingleProfile from "./views/SingleProfile";
import EditProfile from "./views/EditProfile";

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
    path: "/orders/:id/return-products",
    layout: DefaultLayout,
    exact: true,
    component: ReturnRequest
  },
  {
    path: "/orders/:id/edit",
    layout: DefaultLayout,
    exact: true,
    component: EditOrder
  },
  {
    path: "/profiles",
    layout: DefaultLayout,
    exact: true,
    component: Profiles
  },
  {
    path: "/profiles/:id/edit",
    layout: DefaultLayout,
    exact: true,
    component: EditProfile
  },
  {
    path: "/profiles/:id",
    layout: DefaultLayout,
    exact: true,
    component: SingleProfile
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
