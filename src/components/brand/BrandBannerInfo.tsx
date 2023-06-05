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
		<div
			className="brand-banner"
			style={{
				padding: "36px",
				boxSizing: "border-box",
			}}
		>
			{brand.imageUrl && (
				<div className="image-container">
					<img className="image" src={brand.imageUrl} />
				</div>
			)}
			<div
				className="info-container"
				style={{
					padding: "12px 24px",
					boxSizing: "border-box",
				}}
			>
				<Typography variant="h1">{brand.name}</Typography>
				<Typography variant="h6" className="description"></Typography>
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
				{brand.topics.length > 0 && <Topics topics={brand.topics} />}
			</div>
		</div>
	);
}
