import MovingText from "./MovingText";
import fw from "@assets/svg/FW200.svg";
import '../brand/BrandComponents.css';
import { Typography } from "@mui/material";

const SubHeader = () => {
	return (
		<div className="subheader-container">
			<div>
				<img src={fw} alt="fw" className="logo-image" />
			</div>
			<Typography variant="h1"> Welcome:)</Typography>
			<div
				style={{ width: "80%" }}
			>
				<MovingText />
			</div>
		</div>
	);
};

export default SubHeader;
