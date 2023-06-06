import BrandResponse from "@models/brand/BrandResponse";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./BrandComponents.css";

interface BrandComponentProps {
	brand: BrandResponse;
}

const BrandComponent = (props: BrandComponentProps) => {
	const { brand } = props;
	const navigate = useNavigate();

	const handleNavigateToBrand = () => {
		navigate(`/brand/${props.brand.id}`);
	};

	return (
		<div className="brand-component-container">
			{brand.imageUrl && (
				<div
					className="brand-component-
				image-container"
				>
					<img
						className="image"
						src={brand.imageUrl}
						alt={brand.name}
						style={{
							aspectRatio: "1/1 !important",
							objectFit: "contain",
							borderRadius: "8px",
							border: "1px solid rgb(34, 34, 34, 0.3) !important",
							boxShadow: " 0px 0px 5px rgba(-2, -4, 1, 0.)",
						}}
					/>
				</div>
			)}
			<div className="brand-component-text-container">
				<div className="brand-component-text">
					<Typography variant="h2">{props.brand.name}</Typography>
					<Typography variant="subtitle1">{props.brand.description}</Typography>
				</div>
				<div className="brand-component-button-container">
					<Button
						variant="outlined"
						className="brand-component-button"
						onClick={handleNavigateToBrand}
					>
						<Typography variant="h6">View {props.brand.name}</Typography>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default BrandComponent;
