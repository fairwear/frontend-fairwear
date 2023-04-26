import { Typography } from "@mui/material";
import fw from "@assets/svg/FW200.svg";
import "./BrandComponents.css";

export default function BrandListHeader() {
	return (
		<div>
			<div>
				<img src={fw} alt="fw" className="logo-pic" />
			</div>
			<Typography variant="h1"> Brand List</Typography>
		</div>
	);
}
