import TopicViewComponent from "@components/topic/TopicViewComponent";
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
					<img
						className="image"
						src={brand.imageUrl}
						style={{
							borderRadius: "8px",
							border: "1px solid rgb(34, 34, 34, 0.3) !important",
							boxShadow: " 0px 0px 5px rgba(-2, -4, 1, 0.)",
						}}
					/>
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
				<Typography variant="h6" className="description">
					{brand.description}
				</Typography>

				{brand.topicsToBrand.length > 0 && (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "12px",
							justifyContent: "center",
							width: "100%",
							marginBottom: "48px",
							marginTop: "36px",
						}}
					>
						<Typography
							align="left"
							variant="h4"
							style={{
								marginBottom: "12px",
								opacity: 0.8,
								fontStyle: "italic",
							}}
						>
							References
						</Typography>
						{brand.topicsToBrand.map((topicToBrand) => (
							<TopicViewComponent
								key={`${topicToBrand.brandId} - ${topicToBrand.topicId}`}
								topicToBrand={topicToBrand}
							/>
						))}
					</div>
				)}
				{brand.topicsToBrand.length <= 0 && brand.topics.length > 0 && (
					<Topics topics={brand.topics} topicsToBrand={brand.topicsToBrand} />
				)}
			</div>
			<div className="button-container">
				<Button
					onClick={props.handleScrollToItems}
					className="contribute-button"
					variant="contained"
					style={{
						padding: "8px 16px",
					}}
				>
					<Typography variant="h4">View Items</Typography>
				</Button>
				<Button
					onClick={() => navigate("/contribute")}
					className="signup-button"
					variant="outlined"
					style={{
						padding: "7px 20px",

						minWidth: "fit-content",
					}}
				>
					<Typography fontWeight={600} variant="h4">
						Contribute
					</Typography>
				</Button>
			</div>
		</div>
	);
}
