import { HomeRounded } from "@mui/icons-material";
import RouteGroup from "../models/routes/RouteGroup";
import HomePage from "../pages/Home/HomePage";

const routes: RouteGroup[] = [
  {
    group: "Menu",
    items: [
      {
        path: "/",
        key: "home",
        pageTitle: "Home",
        element: <HomePage />,
        icon: <HomeRounded />,
      },
    ],
  },
  {
    group: "Admin",
    items: [],
  },
];

export default routes;
