import { HomeRounded } from "@mui/icons-material";
import TokenRoundedIcon from "@mui/icons-material/TokenRounded";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RouteGroup from "../models/routes/RouteGroup";
import HomePage from "@pages/home/HomePage";
import BrandPage from "@pages/brand/BrandPage";
import ContributePage from "@pages/contribute/ContributePage";

const routes: RouteGroup[] = [
	{
		group: "Menu",
		items: [
			{
				path: "/",
				key: "home",
				pageTitle: "Home Page",
				element: <HomePage />,
				icon: <HomeRounded />,
			},
			{
				path: "/brand",
				key: "brand",
				pageTitle: "Brand Page",
				element: <BrandPage />,
				icon: <TokenRoundedIcon />,
			},
			{
				path: "/contribute",
				key: "contribute",
				pageTitle: "Contribute Page",
				element: <ContributePage />,
				icon: <AddCircleOutlineOutlinedIcon />,
			},
		],
	},
	{
		group: "Admin",
		items: [],
	},
];

export default routes;
