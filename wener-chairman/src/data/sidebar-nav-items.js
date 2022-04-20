export default function () {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">home</i>',
      htmlAfter: ""
    },
    {
      title: "Profiles",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/profiles",
    },
    {
      title: "Dealers",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/distributors",
    },
    // {
    //   title: "Tables",
    //   htmlBefore: '<i class="material-icons">table_chart</i>',
    //   to: "/tables",
    // },
    {
      title: "Orders",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/orders",
    },
    {
      title: "Logout",
      htmlBefore: '<i class="material-icons">logout</i>',
      to: "/logout",
    },
  ];
}
