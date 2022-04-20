import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import CreateDistributor from "./views/CreateDistributor";
import ComponentsOverview from "./views/ComponentsOverview";
import Distributors from "./views/Distributors"
import CreateInvoice from "./views/CreateInvoice";
import Login from "./views/Login";
import Orders from "./views/Orders";


export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/dashboard" />
  },
  // If not logged in -- redirect to '/login'
  // eta DefaultLayout e dibo


  // {
  //   path: "/tables",
  //   layout: DefaultLayout,
  //   component: Tables
  // },
  {
    path: "/create-distributor",
    layout: DefaultLayout,
    component: CreateDistributor
  },
  {
    path: "/create-invoice",
    layout: DefaultLayout,
    component: CreateInvoice
  },
  {
    path: "/distributors",
    layout: DefaultLayout,
    component: Distributors
  },
  {
    path: "/orders",
    layout: DefaultLayout,
    component: Orders
  },
  {
    path: "/my-profile",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/login",
    layout: DefaultLayout,
    component: Login
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/dashboard",
    exact: true,
    layout: DefaultLayout,
    component: BlogOverview
  }
];
