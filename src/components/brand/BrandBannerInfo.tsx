import BrandResponse from "@models/brand/BrandResponse";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../Components.css";
import "./BrandComponents.css";
import Topics from "./Topics";

interface BrandBannerInfoProps {
	brand: BrandResponse;
	handleScrollToItems: () => void;
}

export default function BrandBannerInfo(props: BrandBannerInfoProps) {
	const { brand } = props;
	const navigate = useNavigate();

	console.log(brand);

	return (
		<div className="brand-banner">
			{brand.imageUrl && (
				<div className="image-container">
					<img className="image" src={brand.imageUrl} />
				</div>
			)}
			<div className="info-container">
				<Typography variant="h2">{brand.name}</Typography>
				<Typography variant="h6" className="description">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus
					ornare suspendisse sed nisi lacus sed viverra. Vitae justo eget magna
					fermentum iaculis eu. Ultrices neque ornare aenean euismod elementum
					nisi quis. Ac felis donec et odio. Consectetur adipiscing elit duis
					tristique sollicitudin nibh sit amet. Pellentesque adipiscing commodo
					elit at imperdiet. Eget est lorem ipsum dolor. Egestas erat imperdiet
					sed euismod nisi porta lorem mollis aliquam. Mattis enim ut tellus
					elementum sagittis.
				</Typography>
				<div className="button-container">
					<Button
						onClick={() => navigate("/contribute")}
						className="contribute-button"
						variant="contained"
					>
						<Typography variant="h4">Contribute</Typography>
					</Button>
					<Button
						onClick={props.handleScrollToItems}
						className="signup-button"
						variant="outlined"
						style={{
							minWidth: "fit-content",
						}}
					>
						<Typography variant="h5">View Items</Typography>
					</Button>
				</div>
				<Topics />
			</div>
		</div>
	);
}
