import { colors } from "@theme/colors";

const routes = [
    {
      path: "/",
      key: "HOME",
    },
    {
      path: "/work",
      key: "WORK",
      text: 'Our work',
      color: colors.pink,
      showOnMenu: true,
    },


    {
      path: "/services",
      key: "SERVICES",
      text: 'Services',
      color: colors.blue,
      showOnMenu: true,
    },
    {
      path: "/about",
      key: "ABOUT",
      text: 'About',
      color: colors.purple,
      showOnMenu: true,
    },
    {
      path: "/blog",
      key: "BLOG",
      text: 'Blog',
      color: colors.orange,
      showOnMenu: true,
    },
    {
      path: "/careers",
      key: "CAREERS",
      text: 'Careers',
      showOnMenu: true,
      color: colors.red,
    },
    {
      path: "/contact",
      key: "CONTACT",
      text: 'Contact',
      color: colors.green,
      showOnMenu: true,
    },
    {
      path: "/clients",
      key: "CLIENTS",
      text: 'Clients',
      showOnMenu: false,
    },
    {
      path: "/search",
      key: "SEARCH",
      text: 'Search',
      color: colors.green,
      showOnMenu: false,
    },
  ];

  export default routes