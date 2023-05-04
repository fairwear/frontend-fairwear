import BrandAPI from "@api/BrandAPI";
import BrandPostAPI from "@api/BrandPostAPI";
import CreateUpdateBrandDialog from "@components/brand/CreateUpdateBrandDialog";
import { CreateBrandFormValues } from "@components/brand/form/CreateBrandForm";
import CreateBrandPostDialog from "@components/brandpost/CreateBrandPostDialog";
import { CreateBrandPostFormValues } from "@components/brandpost/CreateBrandPostForm";
import BrandCreateRequest from "@models/brand/BrandCreateRequest";
import BrandPostCreateRequest from "@models/brandpost/BrandPostCreateRequest";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import "./ContributePage.css";

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

	const imageUrl =
		"http://localhost:8080/api/v1/file/uploads/f44f57cb-598b-4f64-a686-9f60a9a66ec1.png";

	const handleBrandPostDialogOpen = () => {
		setBrandPostDialogOpen(true);
	};

	const handleBrandPostDialogClose = () => {
		setBrandPostDialogOpen(false);
	};

	const handleSubmitBrand = async (values: CreateBrandFormValues) => {
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
			<img src={imageUrl} />
			<Button
				onClick={() => {
					let formData = new FormData();
					let file = new File(["foo"], "foo.txt", {
						type: "text/plain",
					});
					formData.append("file", file);

					axios.post("/api/v1/file/upload", formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					});
				}}
			>
				Bruh
			</Button>
		</div>
	);
};

export default ContributePage;
