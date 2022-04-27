export default function () {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">home</i>',
      htmlAfter: ""
    },
    // {
    //   title: "Create Distributor",
    //   to: "/create-distributor",
    //   htmlBefore: '<i class="material-icons">edit</i>',
    //   htmlAfter: ""
    // },
    // {
    //   title: "Distributors",
    //   htmlBefore: '<i class="material-icons">table_chart</i>',
    //   to: "/distributors",
    // },
    // {
    //   title: "Tables",
    //   htmlBefore: '<i class="material-icons">table_chart</i>',
    //   to: "/tables",
    // },
    // {
    //   title: "Create Invoice",
    //   htmlBefore: '<i class="material-icons">edit</i>',
    //   to: "/create-invoice",
    // },
    {
      title: "Orders",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/orders",
    },
    {
      title: "Returned Orders",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/returned-orders",
    },
    {
      title: "Logout",
      htmlBefore: '<i class="material-icons">logout</i>',
      to: "/logout",
    },
  ];
}
