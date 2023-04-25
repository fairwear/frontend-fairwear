import { Button, Typography } from "@mui/material";
import "../Components.css";
import "./BrandComponents.css";
interface Props {
	img: string;
	name: string;
}

export default function Product(props: Props) {
	return (
		<div>
			<img className="product-image" src={props.img} alt={props.name} />
			<div className="product-name-container">
				<Typography variant="h3">{props.name}</Typography>
			</div>
			<Button variant="outlined" className="signup-button extended">
				<Typography className="button-text">See More</Typography>
			</Button>
		</div>
	);
}
