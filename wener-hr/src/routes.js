import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import CreateProfile from "./views/CreateProfile";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Profiles from "./views/Profiles";
import SingleProfile from "./views/SingleProfile";
import EditProfile from "./views/EditProfile";
import CreateLocation from "./views/CreateLocation";
import ViewLocations from "./views/ViewLocations";
import UserProfileLite from "./views/UserProfileLite";
import LocationDetails from "./views/LocationDetails";


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
    path: "/login",
    layout: DefaultLayout,
    component: Login
  },
  {
    path: "/dashboard",
    exact: true,
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/create-location",
    layout: DefaultLayout,
    component: CreateLocation
  },
  {
    path: "/locations",
    layout: DefaultLayout,
    exact: true,
    component: ViewLocations
  },
  {
    path: "/create-profile",
    layout: DefaultLayout,
    exact: true,
    component: CreateProfile
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
    path: "/logout",
    layout: DefaultLayout,
    component: Logout
  },
  {
    path: "/locations/:id",
    layout: DefaultLayout,
    exact: true,
    component: LocationDetails
  }
];
