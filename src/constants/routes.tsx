import { HomeRounded } from "@mui/icons-material";
import TokenRoundedIcon from "@mui/icons-material/TokenRounded";
import RouteGroup from "../models/routes/RouteGroup";
import HomePage from "@pages/home/HomePage";
import BrandPage from "@pages/brand/BrandPage";
import BrandListPage from "@pages/brand_list/BrandListPage";

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
			{
				path: "/brand",
				key: "brand",
				pageTitle: "Brand",
				element: <BrandPage />,
				icon: <TokenRoundedIcon />,
			},
			{
				path: "/brandlist",
				key: "brandList",
				pageTitle: "Brand List",
				element: <BrandListPage/>,
				icon: <TokenRoundedIcon />,
			}
		],
	},
	{
		group: "Admin",
		items: [],
	},
];

export default routes;
