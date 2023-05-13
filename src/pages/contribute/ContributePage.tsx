import BrandAPI from "@api/BrandAPI";
import BrandPostAPI from "@api/BrandPostAPI";
import ReportAPI from "@api/ReportAPI";
import CreateUpdateBrandDialog from "@components/brand/CreateUpdateBrandDialog";
import { CreateBrandFormValues } from "@components/brand/form/CreateBrandForm";
import CreateBrandPostDialog from "@components/brandpost/CreateBrandPostDialog";
import { CreateBrandPostFormValues } from "@components/brandpost/CreateBrandPostForm";
import ContributeComponent from "@components/common/ContributeComponent";
import NotLoggedInComponent from "@components/login/NotLoggedInComponent";
import CreateReportDialog from "@components/report/CreateReportDialog";
import { CreateReportFormValues } from "@components/report/CreateReportForm";
import BrandCreateRequest from "@models/brand/BrandCreateRequest";
import BrandPostCreateRequest from "@models/brandpost/BrandPostCreateRequest";
import CreateReportRequest from "@models/report/CreateReportRequest";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import alerts from "@redux/alerts";
import { useAppSelector } from "@redux/store/hooks";
import { FormikHelpers } from "formik";
import { useState } from "react";
import "./ContributePage.css";

const dummyBrandPostId = 4;

const ContributePage = () => {
	const isUserLoggedIn = useAppSelector((state) => state.common.isLoggedIn);

	const [brandDialogOpen, setBrandDialogOpen] = useState<boolean>(false);
	const [itemDialogOpen, setItemDialogOpen] = useState<boolean>(false);
	const [reportDialogOpen, setReportDialogOpen] = useState<boolean>(false);
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

	/* deepscan-disable-line */ const handleItemDialogClose = () => {
		setItemDialogOpen(false);
	};

	const handleReportDialogOpen = () => {
		setReportDialogOpen(true);
	};

	/* deepscan-disable-line */ const handleReportDialogClose = () => {
		setReportDialogOpen(false);
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
			title: values.title,
			body: values.body,
			brandId: +values.brandId,
			itemIds: values.itemIds.map((item) => +item),
			topics: values.selectedTopics,
			references: values.references,
			createdAt: new Date(),
		};

		await BrandPostAPI.create(request);
		setTimeout(() => {
			handleBrandDialogClose();
		}, 350);
	};

	const handleSubmitReport = async (
		values: CreateReportFormValues,
		formikHelpers: FormikHelpers<any>
	) => {
		const request: CreateReportRequest = {
			postId: dummyBrandPostId,
			reportReason: values.reportReason,
			comment: values.comment,
			createdAt: new Date(),
		};

		try {
			const response = await ReportAPI.create(request);
			console.log(response);

			alerts.add("Report submitted", "success", undefined, undefined, "toast");
			setTimeout(() => {
				handleReportDialogClose();
			}, 350);
		} catch (error: any) {
			formikHelpers.setSubmitting(false);
			if (error.response.data.statusCode) {
				if (error.response.data.statusCode === 409) {
					alerts.add(
						"You have already reported this post",
						"error",
						undefined,
						undefined,
						"toast"
					);
				}
				formikHelpers.setErrors({ reportReason: "Something went wrong" });
			}
		}
	};

	return (
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
						title="Add Items // Not yet implemented"
						description="Add items to the platform, relate them to brands and topics. Share how it looks and help other people find it by scanning the barcode."
						buttonText="Add Item // Not yet implemented"
						handleClick={handleItemDialogOpen}
					/>
					<ContributeComponent
						icon={FlagRoundedIcon}
						title="Report // Not yet implemented"
						description="Report a bran post, brand or item that is inacurate or inappropriate."
						buttonText="Report // Not yet implemented"
						handleClick={handleReportDialogOpen}
					/>
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
			<CreateReportDialog
				open={reportDialogOpen}
				brandPostId={dummyBrandPostId}
				handleClose={handleReportDialogClose}
				handleSubmit={handleSubmitReport}
			/>
		</div>
	);
};

export default ContributePage;
