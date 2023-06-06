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
import NotLoggedInComponent from "@components/login/NotLoggedInComponent";
import BrandCreateRequest from "@models/brand/BrandCreateRequest";
import BrandPostCreateRequest from "@models/brandpost/BrandPostCreateRequest";
import ItemCreateRequest from "@models/item/ItemCreateRequest";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import alerts from "@redux/alerts";
import { useAppSelector } from "@redux/store/hooks";
import { useState } from "react";
import "./ContributePage.css";

const ContributePage = () => {
	const isUserLoggedIn = useAppSelector((state) => state.common.isLoggedIn);

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

		let brandLogo = await FileAPI.upload(formData);

		let request: BrandCreateRequest = {
			name: values.name,
			imageUrl: brandLogo.url,
			description: values.description,
			createdAt: new Date(),
		};

		await BrandAPI.create(request);
		handleBrandDialogClose();
		alerts.addAlert({
			isOpen: true,
			message: `Brand ${values.name} created`,
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
		<>
			<div className="contribute-page-container">
				{!isUserLoggedIn && <NotLoggedInComponent />}
				{isUserLoggedIn && (
					<div className="contribute-components">
						<ContributeComponent
							icon={AddShoppingCartRoundedIcon}
							title="Expand Brands"
							description="Tell people about a company that is not on our platform yet"
							buttonText="Add Brand"
							handleClick={handleBrandDialogOpen}
						/>
						<ContributeComponent
							icon={CelebrationRoundedIcon}
							title="Spread The Truth"
							description="Tell people more about a brand or a company"
							buttonText="Create Brand Post"
							handleClick={handleBrandPostDialogOpen}
						/>
						<ContributeComponent
							icon={CheckroomRoundedIcon}
							title="Add Items"
							description="Add items to the platform, relate them to brands and topics. Share how it looks and help other people find it by scanning the barcode."
							buttonText="Add Item"
							handleClick={handleItemDialogOpen}
						/>
						{/* <ContributeComponent
							icon={FlagRoundedIcon}
							title="Report"
							description="Report a brand post, brand or item that is inacurate or inappropriate."
							buttonText="Report "
							handleClick={handleReportDialogOpen}
						/> */}
					</div>
				)}
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
		</>
	);
};

export default ContributePage;
