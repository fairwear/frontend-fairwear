import BrandPostAPI from "@api/BrandPostAPI";
import ItemAPI from "@api/ItemAPI";
import ReportAPI from "@api/ReportAPI";
import VoteComponent from "@components/brandpost/VoteComponent";
import CreateReportDialog from "@components/report/CreateReportDialog";
import { CreateReportFormValues } from "@components/report/CreateReportForm";
import TopicViewComponent from "@components/topic/TopicViewComponent";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import ItemResponse from "@models/item/ItemResponse";
import CreateReportRequest from "@models/report/CreateReportRequest";
import {
	DeleteOutlined,
	ErrorOutlineRounded,
	KeyboardArrowLeft,
	KeyboardArrowRight,
} from "@mui/icons-material";
import {
	Button,
	Divider,
	IconButton,
	Link,
	MobileStepper,
	Tooltip,
	Typography,
} from "@mui/material";
import alerts from "@redux/alerts";
import { useAppSelector } from "@redux/store/hooks";
import { FormikHelpers } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import AppTheme from "../../AppTheme";
import "./BrandPostComponents.css";

interface BrandPostComponentProps {
	brandPost: BrandPostResponse;
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const BrandPostComponent = (props: BrandPostComponentProps) => {
	const { brandPost } = props;

	const isUserAdmin = useAppSelector((state) => state.common.userInfo?.isAdmin);

	const [reportDialogOpen, setReportDialogOpen] = useState<boolean>(false);
	const [relatedItems, setRelatedItems] = useState<ItemResponse[]>([]);
	const [isThePostOwner, setIsThePostOwner] = useState<boolean>(false);
	const [isReported, setIsReported] = useState<boolean>(false);
	const [activeStep, setActiveStep] = useState(0);

	const handleIndexChange = (index: number) => {
		setActiveStep(index);
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	useEffect(() => {
		getRelatedItems();
		getIsReported();
		getIsThePostOwner();
	}, []);

	const getRelatedItems = async () => {
		const mappedItems = brandPost.relatedItems.map(async (item) => {
			const response = await ItemAPI.findById(item.itemId);
			return response;
		});

		const items = await Promise.all(mappedItems);
		setRelatedItems(items);
	};

	//TODO: Implement this
	const getIsReported = async () => {
		// const response = await ReportAPI.getIsReported(brandPost.id);
		// setIsReported(response);
	};

	const handleDeleteBrandPost = async () => {
		await BrandPostAPI.delete(brandPost.id);
	};

	const getIsThePostOwner = async () => {
		let res = await BrandPostAPI.isUserThePostOwner(brandPost.id);
		setIsThePostOwner(res);
	};

	const handleReportDialogOpen = () => {
		setReportDialogOpen(true);
	};

	const handleReportDialogClose = () => {
		setReportDialogOpen(false);
	};

	const handleSubmitReport = async (
		values: CreateReportFormValues,
		formikHelpers: FormikHelpers<any>
	) => {
		const request: CreateReportRequest = {
			postId: props.brandPost.id,
			reportReason: values.reportReason,
			comment: values.comment,
			createdAt: new Date(),
		};

		try {
			await ReportAPI.create(request);

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

	const styles = {
		slide: {
			padding: 15,
			minHeight: 100,
			color: "#fff",
		},
		slide1: {
			backgroundColor: "#FEA900",
		},
		slide2: {
			backgroundColor: "#B3DC4A",
		},
		slide3: {
			backgroundColor: "#6AC0FF",
		},
	};

	return (
		<div className="brandpost-outer-container">
			<div className="brandpost-container">
				<div className="primary-section-outter-container">
					<div className="brandpost-vote-section">
						<VoteComponent brandPostId={brandPost.id} />
					</div>
					<div className="primary-section">
						<div className="brandpost-header-container">
							<div className="brandpost-title-container">
								<Typography align="left" variant="h2">
									{brandPost.title}
								</Typography>
								<Typography
									align="left"
									variant="h3"
									style={{
										opacity: 0.8,
										fontStyle: "italic",
									}}
								>
									{brandPost.brand.name}
								</Typography>
							</div>
							<div className="button-container">
								<Tooltip title="Report post">
									<>
										<IconButton
											className="report-button"
											onClick={handleReportDialogOpen}
											sx={{
												alignSelf: "flex-start",
												"& :hover": {
													color: AppTheme.palette.red[500],
												},
											}}
										>
											<ErrorOutlineRounded
												className="report-icon"
												sx={{
													color: AppTheme.palette.red[200],
												}}
											/>
										</IconButton>
									</>
								</Tooltip>
								{(isThePostOwner || isUserAdmin) && (
									<Tooltip title="Delete post">
										<>
											<IconButton
												className="report-button"
												onClick={handleDeleteBrandPost}
												sx={{
													alignSelf: "flex-start",
													"& :hover": {
														color: AppTheme.palette.red[500],
													},
												}}
											>
												<DeleteOutlined
													className="report-icon"
													sx={{
														color: AppTheme.palette.red[200],
													}}
												/>
											</IconButton>
										</>
									</Tooltip>
								)}
							</div>
						</div>

						<div className="brandpost-topics-container">
							{brandPost.topics.map((topic) => (
								<TopicViewComponent
									containerStyle={{
										width: "90%",
										minWidth: "fit-content",
									}}
									key={topic.topicId}
									postToTopic={topic}
								/>
							))}
						</div>
						<Divider
							variant="middle"
							sx={{
								width: "calc(100% + 48px)",
								borderColor: AppTheme.palette.grey[300],
								borderWidth: "1.5px",
								marginLeft: "-24px",
							}}
						/>
					</div>
				</div>
				<div className="secondary-section">
					<Typography
						align="left"
						variant="h4"
						style={{
							opacity: 0.8,
							fontStyle: "italic",
						}}
					>
						Related Items
					</Typography>
					<div
						className="brandpost-description-container"
						style={{ minHeight: "120px" }}
					>
						<Typography align="left" variant="body2">
							{brandPost.body}
						</Typography>
					</div>
					<div className="top-container">
						<div className="related-items-container">
							<Typography
								align="left"
								variant="h4"
								style={{
									opacity: 0.8,
									fontStyle: "italic",
								}}
							>
								Description
							</Typography>
							{relatedItems.length > 0 && (
								<div
									style={{
										marginTop: "20px",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										justifyContent: "center",
										padding: "24px",
										boxSizing: "border-box",
										gap: "12px",
										width: "100%",
										overflow: "hidden",
										borderRadius: "8px",
										border: "1px solid rgb(34, 34, 34, 0.3) !important",
										boxShadow: " 0px 0px 5px rgba(-2, -4, 1, 0.)",
									}}
								>
									<AutoPlaySwipeableViews
										index={activeStep}
										onChangeIndex={handleIndexChange}
										maxLength={relatedItems.length}
										style={{
											overflow: "hidden !important",
											minWidth: "400px",
											minHeight: "300px",
										}}
									>
										{relatedItems.map((item, index) => (
											<img
												key={item.id}
												src={item.imageUrl}
												alt={`brandpost image ${index + 1}`}
												className="item-image"
												style={{
													width: "100%",
													height: "90%",
													borderRadius: "8px",
												}}
											/>
										))}
										<div
											style={{
												width: "100%",
												display: "flex",

												justifyContent: "center",
												alignItems: "center",
											}}
										></div>
									</AutoPlaySwipeableViews>
									<MobileStepper
										style={{
											width: "60%",
										}}
										steps={relatedItems.length}
										position="static"
										activeStep={activeStep}
										nextButton={
											<Button
												size="small"
												onClick={handleNext}
												disabled={activeStep === relatedItems.length - 1}
											>
												Next
												<KeyboardArrowRight />
											</Button>
										}
										backButton={
											<Button
												size="small"
												onClick={handleBack}
												disabled={activeStep === 0}
											>
												<KeyboardArrowLeft />
												Back
											</Button>
										}
									/>
								</div>
							)}
						</div>

						<div className="reference-container">
							<Typography
								align="left"
								variant="h4"
								style={{
									marginTop: "24px",
									opacity: 0.8,
									fontStyle: "italic",
								}}
							>
								References
							</Typography>
							{brandPost.sourceUrls.length > 0 && (
								<>
									{brandPost.sourceUrls.map((sourceUrl) => (
										<div key={sourceUrl} className="reference-item">
											<Link
												sx={{
													cursor: "pointer",
												}}
											>
												<Typography
													variant="subtitle1"
													align="left"
													style={{
														fontWeight: 500,
													}}
												>
													{sourceUrl}
												</Typography>
											</Link>
										</div>
									))}
								</>
							)}
						</div>
					</div>
					<div
						style={{
							display: "flex",
							gap: "16px",
						}}
					>
						<div className="author-container">
							<Typography
								align="right"
								variant="subtitle1"
								style={{
									fontWeight: 500,
									fontStyle: "italic",
								}}
							>
								- {props.brandPost.author.username}
							</Typography>
							<Typography
								align="right"
								variant="subtitle2"
								style={{
									fontStyle: "italic",
								}}
							>
								{moment(props.brandPost.createdAt).format("MMMM Do YYYY")}
							</Typography>
						</div>
					</div>
				</div>
				<CreateReportDialog
					open={reportDialogOpen}
					brandPostId={props.brandPost.id}
					handleClose={handleReportDialogClose}
					handleSubmit={handleSubmitReport}
				/>
			</div>
		</div>
	);
};

export default BrandPostComponent;
