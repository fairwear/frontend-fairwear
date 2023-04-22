import { HomeRounded } from "@mui/icons-material";
import TokenRoundedIcon from '@mui/icons-material/TokenRounded';
import RouteGroup from "../models/routes/RouteGroup";
import HomePage from "@pages/home/HomePage";
import BrandPage from "@pages/brand/BrandPage";


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
		],
	},
	{
		group: "Admin",
		items: [],
	},
];

export default routes;
