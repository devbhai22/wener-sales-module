export default function () {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">home</i>',
      htmlAfter: ""
    },
    {
      title: "Create Location",
      to: "/create-location",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "View Location",
      to: "/locations",
      htmlBefore: '<i class="material-icons">map</i>',
      htmlAfter: ""
    },
    {
      title: "Create Profile",
      to: "/create-profile",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Profiles",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/profiles",
    },

    {
      title: "Logout",
      htmlBefore: '<i class="material-icons">logout</i>',
      to: "/logout",
    }
  ];
}
