export default function () {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">home</i>',
      htmlAfter: ""
    },
    {
      title: "Create Dealers",
      to: "/create-distributor",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
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
      title: "Create Invoice",
      htmlBefore: '<i class="material-icons">edit</i>',
      to: "/create-invoice",
    },
    {
      title: "Pending Orders",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/pending-orders",
    },
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
