import BrandResponse from "@models/brand/BrandResponse";
import { Button, Typography } from "@mui/material";
import "./BrandComponents.css";

interface BrandComponentProps {
	brand: BrandResponse;
	imageUrl: string;
}

const BrandComponent = (props: BrandComponentProps) => {
	return (
		<div className="brand-component-container">
			<img
				className="brand-component-image"
				src={props.imageUrl}
				alt={props.brand.name}
				style={{
					// width: "100%",
					// width: "100px",

					aspectRatio: "1/1 !important",
					objectFit: "contain",
				}}
			/>
			<div className="brand-component-text-container">
				<div className="brand-component-text">
					<Typography variant="h2">{props.brand.name}</Typography>
					<Typography variant="subtitle1">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</Typography>
				</div>
				<div className="brand-component-button-container">
					<Button variant="outlined" className="brand-component-button">
						<Typography variant="h6">View {props.brand.name}</Typography>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default BrandComponent;
