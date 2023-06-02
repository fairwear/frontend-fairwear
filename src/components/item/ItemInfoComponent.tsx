import BrandAPI from "@api/BrandAPI";
import BrandResponse from "@models/brand/BrandResponse";
import ItemResponse from "@models/item/ItemResponse";
import { CloseRounded } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./Items.css";

interface ItemInfoComponentProps {
	item: ItemResponse;
	handleClose: () => void;
}

const ItemInfoComponent = (props: ItemInfoComponentProps) => {
	const { item, handleClose } = props;
	const [brand, setBrand] = useState<BrandResponse | undefined>();

	useEffect(() => {
		getBrand(item.brandId);
	}, []);

	const getBrand = async (brandId: number) => {
		let response = await BrandAPI.findById(brandId);
		setBrand(response);
	};

	return (
		<div className="item-drawer-container">
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
			<img className="item-image" src={item.imageUrl} />
		</div>
	);
};

export default ItemInfoComponent;
