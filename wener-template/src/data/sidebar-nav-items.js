export default function () {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">home</i>',
      htmlAfter: ""
    },
    {
      title: "Create Distributor",
      to: "/create-distributor",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Distributors",
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
      title: "Orders",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/orders",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/my-profile",
    },
    {
      title: "Login",
      htmlBefore: '<i class="material-icons">login</i>',
      to: "/login",
    },
    {
      title: "Logout",
      htmlBefore: '<i class="material-icons">logout</i>',
      to: "/logout",
    },
    {
      title: "Add New Post",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post",
    },
    {
      title: "Forms & Components",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/components-overview",
    },
  ];
}
