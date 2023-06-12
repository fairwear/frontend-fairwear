import BrandAPI from "@api/BrandAPI";
import BrandPostAPI from "@api/BrandPostAPI";
import FileAPI from "@api/FileAPI";
import ItemAPI from "@api/ItemAPI";
import CreateUpdateBrandDialog from "@components/brand/CreateUpdateBrandDialog";
import { CreateBrandFormValues } from "@components/brand/form/CreateBrandForm";
import CreateBrandPostDialog from "@components/brandpost/CreateBrandPostDialog";
import { CreateBrandPostFormValues } from "@components/brandpost/CreateBrandPostForm";
import ContributeComponent from "@components/common/ContributeComponent";
import CreateItemDialog from "@components/item/CreateItemDialog";
import { CreateItemFormValues } from "@components/item/CreateItemForm";
import BrandCreateRequest from "@models/brand/BrandCreateRequest";
import BrandPostCreateRequest from "@models/brandpost/BrandPostCreateRequest";
import ItemCreateRequest from "@models/item/ItemCreateRequest";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import { Typography } from "@mui/material";
import alerts from "@redux/alerts";
import { useState } from "react";
import "./HomeComponents.css";
const ContributeSection = () => {
	const [brandDialogOpen, setBrandDialogOpen] = useState<boolean>(false);
	const [itemDialogOpen, setItemDialogOpen] = useState<boolean>(false);

	const [brandPostDialogOpen, setBrandPostDialogOpen] =
		useState<boolean>(false);

	const handleBrandDialogOpen = () => {
		setBrandDialogOpen(true);
	};

	const handleBrandDialogClose = () => {
		setBrandDialogOpen(false);
	};

	const handleBrandPostDialogOpen = () => {
		setBrandPostDialogOpen(true);
	};

	const handleBrandPostDialogClose = () => {
		setBrandPostDialogOpen(false);
	};

	const handleItemDialogOpen = () => {
		setItemDialogOpen(true);
	};

	const handleItemDialogClose = () => {
		setItemDialogOpen(false);
	};

	const handleSubmitBrand = async (values: CreateBrandFormValues) => {
		let logo = values.brandLogo;
		if (!logo) return;

		let formData = new FormData();
		formData.append("file", logo);

		let response = await FileAPI.upload(formData);

		let request: BrandCreateRequest = {
			name: values.name,
			imageUrl: response.url,
			description: values.description,
			createdAt: new Date(),
		};

		let res = await BrandAPI.create(request);

		handleBrandDialogClose();
		alerts.addAlert({
			isOpen: true,
			message: `Brand ${res.name} created`,
			alertSeverity: "success",
			alertType: "toast",
		});
	};

	const handleSubmitBrandPost = async (values: CreateBrandPostFormValues) => {
		let request: BrandPostCreateRequest = {
			title: values.title,
			body: values.body,
			brandId: +values.brandId,
			itemIds: values.itemIds.map((item) => +item),
			topics: values.selectedTopics,
			sourceUrls: values.sourceUrls || [],
			createdAt: new Date(),
		};

		await BrandPostAPI.create(request);
		handleBrandPostDialogClose();
		alerts.addAlert({
			isOpen: true,
			message: `Brand post ${values.title} created`,
			alertSeverity: "success",
			alertType: "toast",
		});
	};

	const handleSubmitItem = async (values: CreateItemFormValues) => {
		let imageRequest = new FormData();
		const image: "" | File = values.itemImage;
		if (image) {
			if (typeof image !== "string") {
				imageRequest.append("file", image);

				const imageResponse = await FileAPI.upload(imageRequest);
				const itemRequest: ItemCreateRequest = {
					name: values.name,
					barcode: values.barcode,
					brandId: +values.brandId,
					imageUrl: imageResponse.url,
					createdAt: new Date(),
				};

				const itemResponse = await ItemAPI.create(itemRequest);
				handleItemDialogClose();
				alerts.addAlert({
					isOpen: true,
					message: `Item ${itemResponse.name} created`,
					alertSeverity: "success",
					alertType: "toast",
				});
			} else {
				alerts.addAlert({
					isOpen: true,
					message: `The image you uploaded is not valid, please try again`,
					alertSeverity: "error",
					alertType: "toast",
				});
			}
		} else {
			alerts.addAlert({
				isOpen: true,
				message: `Please upload an image`,
				alertSeverity: "error",
				alertType: "toast",
			});
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				marginTop: "112px",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "12px",
				}}
			>
				<Typography variant="h1">Contribute</Typography>
				<Typography
					variant="subtitle1"
					style={{
						width: "50%",
					}}
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</Typography>
			</div>
			<div className="contribute-section-container">
				<ContributeComponent
					icon={AddShoppingCartRoundedIcon}
					title="Expand Brands"
					description="Tell people about a company that is not on our platform yet. Help others find it and make better decisions."
					buttonText="Add Brand"
					handleClick={handleBrandDialogOpen}
				/>
				<ContributeComponent
					icon={CelebrationRoundedIcon}
					title="Spread The Truth"
					description="Tell people more about a brand or a company. Share your experience and help others make better decisions."
					buttonText="Create Brand Post"
					handleClick={handleBrandPostDialogOpen}
				/>
				<ContributeComponent
					icon={CheckroomRoundedIcon}
					title="Add Items"
					description="Add items to the platform, relate them to brands and topics. Share how it looks and help other people find it."
					buttonText="Add Item"
					handleClick={handleItemDialogOpen}
				/>
				<CreateUpdateBrandDialog
					open={brandDialogOpen}
					handleDialogClose={handleBrandDialogClose}
					handleSubmit={handleSubmitBrand}
				/>
				<CreateBrandPostDialog
					open={brandPostDialogOpen}
					handleDialogClose={handleBrandPostDialogClose}
					handleSubmit={handleSubmitBrandPost}
				/>
				<CreateItemDialog
					open={itemDialogOpen}
					handleDialogClose={handleItemDialogClose}
					handleSubmit={handleSubmitItem}
				/>
			</div>
		</div>
	);
};

export default ContributeSection;
