import { HomeRounded } from "@mui/icons-material";
import TokenRoundedIcon from "@mui/icons-material/TokenRounded";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RouteGroup from "../models/routes/RouteGroup";
import HomePage from "@pages/home/HomePage";
import BrandPage from "@pages/brand/BrandPage";
import ContributePage from "@pages/contribute/ContributePage";
import BrandListPage from "@pages/brand_list/BrandListPage";
import UserPage from "@pages/user_page/UserPage";
import ScannerComponent from "@components/scanner/ScannerComponent";

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
				path: "/brand/:brandId",
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
			{
				path: "/brandlist",
				key: "brandList",
				pageTitle: "Brand List",
				element: <BrandListPage />,
				icon: <TokenRoundedIcon />,
			},
			{
				path: "/user/:username",
				key: "user",
				pageTitle: "User Page",
				element: <UserPage />,
				icon: <TokenRoundedIcon />,

			},
			{
				path: "/scan",
				key: "scan",
				pageTitle: "Scanner Page",
				element: <ScannerComponent />,
			},
		],
	},
	{
		group: "Admin",
		items: [],
	},
];

export default routes;
