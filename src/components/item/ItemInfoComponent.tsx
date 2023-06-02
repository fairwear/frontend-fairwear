import BrandAPI from "@api/BrandAPI";
import TopicAPI from "@api/TopicAPI";
import BrandResponse from "@models/brand/BrandResponse";
import ItemResponse from "@models/item/ItemResponse";
import TopicResponse from "@models/topic/TopicResponse";
import { CloseRounded } from "@mui/icons-material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./Items.css";
import { useNavigate } from "react-router-dom";

interface ItemInfoComponentProps {
	item: ItemResponse;
	handleClose: () => void;
	handleDialogClose: () => void;
}

const ItemInfoComponent = (props: ItemInfoComponentProps) => {
	const { item, handleClose, handleDialogClose } = props;
	const [brand, setBrand] = useState<BrandResponse | undefined>();
	const [topics, setTopics] = useState<TopicResponse[]>([]);

	const navigate = useNavigate();

	useEffect(() => {
		getBrand(item.brandId);
		getTopic();
	}, []);

	const getBrand = async (brandId: number) => {
		let response = await BrandAPI.findById(brandId);
		setBrand(response);
	};

	const getTopic = async () => {
		const response = await TopicAPI.findTopicsFromBrandByItemId(item.id);
		setTopics(response);
	};

	return (
		<div className="item-info-container">
			<div className="header-container">
				<div className="item-title-container">
					<Typography className="item-title" variant="h3">
						{item.name}
					</Typography>
					<Typography className="brand-name" variant="h4">
						{brand?.name}
					</Typography>
				</div>
				<IconButton
					className="item-close-button"
					size="large"
					onClick={handleClose}
				>
					<CloseRounded />
				</IconButton>
			</div>
			{topics.length > 0 && (
				<div className="topic-container">
					<Typography variant="h5">{topics[0].name}</Typography>
					<div className="score-container">
						<Typography variant="h5">{topics[0].brands[0].score}/10</Typography>
						{getIcon(topics[0].brands[0].score)}
					</div>
				</div>
			)}

			<img className="item-image" src={item.imageUrl} />
			<Button
				fullWidth
				onClick={() => {
					handleDialogClose();
					handleClose();
					navigate(`/brand/${brand?.id}`);
				}}
				style={{
					marginTop: "auto",
					padding: "16px 16px",
					margin: "24px 0px 8px 0px",
				}}
				variant="contained"
			>
				<Typography variant="h5">See more</Typography>
			</Button>
		</div>
	);
};

const getIcon = (score: number) => {
	if (score > 7) {
		return (
			<CheckCircleOutlineRoundedIcon
				style={{
					color: "#388E3C",
				}}
			/>
		);
	} else if (score < 4) {
		return (
			<HighlightOffRoundedIcon
				style={{
					color: "#D32F2F",
				}}
			/>
		);
	} else {
		return (
			<RemoveCircleOutlineRoundedIcon
				style={{
					color: "#FFC107",
				}}
			/>
		);
	}
};

export default ItemInfoComponent;
