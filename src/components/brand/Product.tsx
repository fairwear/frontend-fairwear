import { Button, Tooltip, Typography } from "@mui/material";
import "../Components.css";
import "./BrandComponents.css";
import { CheckroomOutlined } from "@mui/icons-material";
import ItemResponse from "@models/item/ItemResponse";
interface ItemComponentProps {
	item: ItemResponse;
}

const ItemComponent = (props: ItemComponentProps) => {
	const { item } = props;
	return (
		<div
			style={{
				overflow: "hidden",
				padding: "8px",
				boxSizing: "border-box",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			{item.imageUrl && (
				<img className="product-image" src={item.imageUrl} alt={item.name} />
			)}
			{!item.imageUrl && <CheckroomOutlined />}
			<div
				className="product-name-container"
				style={{
					margin: "16px 0px 8px 0px",
				}}
			>
				<Typography variant="h3">{item.name}</Typography>
			</div>
			<Tooltip title="Not implemented yet" placement="bottom">
				<div>
					<Button
						variant="outlined"
						className="signup-button extended"
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
};

export default ItemComponent;
