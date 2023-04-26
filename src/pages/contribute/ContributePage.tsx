import BrandAPI from "@api/BrandAPI";
import CreateUpdateBrandDialog from "@components/brand/CreateUpdateBrandDialog";
import { CreateBrandFormValues } from "@components/brand/form/CreateBrandForm";
import BrandCreateRequest from "@models/brand/BrandCreateRequest";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import "./ContributePage.css";
import CreateBrandPostDialog from "@components/brandpost/CreateBrandPostDialog";
import { CreateBrandPostFormValues } from "@components/brandpost/CreateBrandPostForm";
import BrandPostCreateRequest from "@models/brandpost/BrandPostCreateRequest";
import BrandPostAPI from "@api/BrandPostAPI";

const ContributePage = () => {
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

	// const handleItemDialogOpen = () => {
	// 	setItemDialogOpen(true);
	// };

	// const handleItemDialogClose = () => {
	// 	setItemDialogOpen(false);
	// };

	const handleBrandPostDialogOpen = () => {
		setBrandPostDialogOpen(true);
	};

	const handleBrandPostDialogClose = () => {
		setBrandPostDialogOpen(false);
	};

	const handleSubmitBrand = async (values: CreateBrandFormValues) => {
		console.log("values: ", values);
		let logo = values.brandLogo;
		if (!logo) return;

		let formData = new FormData();
		formData.append("brandLogo", logo);

		let request: BrandCreateRequest = {
			name: values.name,
			description: values.description,
			createdAt: new Date(),
		};

		await BrandAPI.create(request);
	};

	const handleSubmitBrandPost = async (values: CreateBrandPostFormValues) => {
		console.log("values: ", values);
		let request: BrandPostCreateRequest = {
			body: values.body,
			brandId: +values.brandId,
			topics: values.selectedTopics,
			itemIds: values.itemIds.map((item) => +item),
		};

		await BrandPostAPI.create(request);
	};

	return (
		<div className="contribute-page-container">
			<Button
				variant="outlined"
				className="add-brand-button"
				onClick={handleBrandDialogOpen}
			>
				<Typography variant="h5">Add Brand</Typography>
			</Button>
			<Button
				variant="outlined"
				className="add-brandpost-button"
				onClick={handleBrandPostDialogOpen}
			>
				<Typography variant="h5">Create Brand Post</Typography>
			</Button>
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
		</div>
	);
};

export default ContributePage;
