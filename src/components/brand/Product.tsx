import { Button, Tooltip, Typography } from "@mui/material";
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
			<Tooltip title="Not implemented yet" placement="bottom">
				<div>
					<Button
						variant="outlined"
						className="signup-button extended"
						// TEMPORARY DISABLED
						disabled={true}
						sx={{
							"&:hover": {
								cursor: "not-allowed !important",
							},
						}}
					>
						<Typography className="button-text">See More</Typography>
					</Button>
				</div>
			</Tooltip>
		</div>
	);
}
