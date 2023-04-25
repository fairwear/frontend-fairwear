import BrandAPI from "@api/BrandAPI";
import CreateUpdateBrandDialog from "@components/brand/CreateUpdateBrandDialog";
import { CreateBrandFormValues } from "@components/brand/form/CreateBrandForm";
import BrandCreateRequest from "@models/brand/BrandCreateRequest";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

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

	// const handleBrandPostDialogOpen = () => {
	// 	setBrandPostDialogOpen(true);
	// };

	// const handleBrandPostDialogClose = () => {
	// 	setBrandPostDialogOpen(false);
	// };

	const handleSubmit = async (values: CreateBrandFormValues) => {
		let logo = values.brandLogo;
		if (!logo) return;

		let formData = new FormData();
		formData.append("brandLogo", logo);

		let request: BrandCreateRequest = {
			name: values.name,
			description: values.description,
			createdAt: new Date(),
		};

		let response = await BrandAPI.create(request);
		console.log(response);
	};

	return (
		<div className="contribute-page-container">
			<h1>Contributr </h1>
			<Button
				variant="outlined"
				className="add-brand-button"
				onClick={handleBrandDialogOpen}
			>
				<Typography variant="h5">Add Brand</Typography>
			</Button>
			<CreateUpdateBrandDialog
				open={brandDialogOpen}
				handleDialogClose={handleBrandDialogClose}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
};

export default ContributePage;
