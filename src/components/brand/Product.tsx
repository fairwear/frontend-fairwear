import { Button, Typography } from "@mui/material";
import "../Components.css";
import "./BrandComponents.css";
import { CheckroomOutlined } from "@mui/icons-material";
interface Props {
	name: string;
	imageUrl?: string;
}

export default function Product(props: Props) {
	return (
		<div>
			{props.imageUrl && (
				<img className="product-image" src={props.imageUrl} alt={props.name} />
			)}
			{!props.imageUrl && <CheckroomOutlined />}
			<div className="product-name-container">
				<Typography variant="h3">{props.name}</Typography>
			</div>
			<Button variant="outlined" className="signup-button extended">
				<Typography className="button-text">See More</Typography>
			</Button>
		</div>
	);
}
