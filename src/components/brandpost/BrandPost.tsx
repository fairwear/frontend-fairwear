import BrandPostAPI from "@api/BrandPostAPI";
import ItemAPI from "@api/ItemAPI";
import ReportAPI from "@api/ReportAPI";
import ItemComponent from "@components/brand/Product";
import BrandPostDialog from "@components/brandpost/BrandPostDialog";
import VoteComponent from "@components/brandpost/VoteComponent";
import DeleteConfirmationDialog from "@components/dialog/DeleteConfirmationDialog";
import CreateReportDialog from "@components/report/CreateReportDialog";
import { CreateReportFormValues } from "@components/report/CreateReportForm";
import TopicViewComponent from "@components/topic/TopicViewComponent";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import ItemResponse from "@models/item/ItemResponse";
import CreateReportRequest from "@models/report/CreateReportRequest";
import { DeleteOutlined, ErrorOutlineRounded } from "@mui/icons-material";
import { Divider, IconButton, Link, Tooltip, Typography } from "@mui/material";
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
	isPreview?: boolean;
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const BrandPostComponent = (props: BrandPostComponentProps) => {
	const { brandPost, isPreview } = props;

	const isUserAdmin = useAppSelector((state) => state.common.userInfo?.isAdmin);
	const isUserLoggedIn = useAppSelector((state) => state.common.isLoggedIn);

	const [reportDialogOpen, setReportDialogOpen] = useState<boolean>(false);
	const [relatedItems, setRelatedItems] = useState<ItemResponse[]>([]);
	const [isThePostOwner, setIsThePostOwner] = useState<boolean>(false);
	const [isReported, setIsReported] = useState<boolean>(false);
	const [activeStep, setActiveStep] = useState(0);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
	const [isBrandPostDialogOpen, setIsBrandPostDialogOpen] =
		useState<boolean>(false);

	const handleIndexChange = (index: number) => {
		setActiveStep(index);
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

	const getIsReported = async () => {
		if (!isUserLoggedIn) return;
		const response = await ReportAPI.getIfUserAlreadyReportedPost(brandPost.id);
		setIsReported(response);
	};

	const handleDeleteBrandPost = async () => {
		await BrandPostAPI.delete(brandPost.id);
	};

	const getIsThePostOwner = async () => {
		if (!isUserLoggedIn) return;
		let res = await BrandPostAPI.isUserThePostOwner(brandPost.id);
		setIsThePostOwner(res);
	};

	const handleReportDialogOpen = () => {
		setReportDialogOpen(true);
	};

	const handleReportDialogClose = () => {
		setReportDialogOpen(false);
	};

	const handleDeleteDialogOpen = () => {
		setDeleteDialogOpen(true);
	};

	const handleDeleteDialogClose = () => {
		setDeleteDialogOpen(false);
	};

	const handleBrandPostDialogOpen = () => {
		setIsBrandPostDialogOpen(true);
	};

	const handleBrandPostDialogClose = () => {
		setIsBrandPostDialogOpen(false);
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

	return (
		<div
			className={"brandpost-outer-container" + (isPreview ? " preview" : "")}
		>
			<div
				className={"brandpost-container" + (isPreview ? " preview" : "")}
				onClick={() => {
					if (
						isPreview &&
						!isBrandPostDialogOpen &&
						!reportDialogOpen &&
						!deleteDialogOpen
					) {
						handleBrandPostDialogOpen();
					}
				}}
			>
				<div className="primary-section-outter-container">
					<div className="vote-section">
						<VoteComponent brandPostId={brandPost.id} />
						<Divider
							orientation="vertical"
							style={{
								borderColor: AppTheme.palette.grey[600],
								borderRightWidth: 0,
								borderLeftWidth: 1,
								marginLeft: "12px",
								marginTop: "-16px",
								height: "140px",
							}}
						/>
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
								{isUserLoggedIn && !isPreview && (
									<>
										{!isReported && !isThePostOwner && (
											<Tooltip title="Report post">
												<div>
													<IconButton
														className="report-button"
														disabled={isReported}
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
												</div>
											</Tooltip>
										)}
										{(isThePostOwner || isUserAdmin) && (
											<Tooltip title="Delete post">
												<div>
													<IconButton
														className="report-button"
														onClick={handleDeleteDialogOpen}
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
												</div>
											</Tooltip>
										)}
									</>
								)}
							</div>
						</div>

						<div className="brandpost-topics-container">
							{brandPost.topics.map((topic) => (
								<TopicViewComponent
									key={`${topic.topicId}-${topic.postId}`}
									containerStyle={{
										width: "100%",
										minWidth: "fit-content",
									}}
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
						Description
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
						{relatedItems.length > 0 && (
							<div className="related-items-container">
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
										maxLength={getMaxItemSliderLength(relatedItems.length)}
										index={activeStep}
										autoplay={relatedItems.length > 2}
										interval={3000}
										axis={AppTheme.direction === "rtl" ? "x-reverse" : "x"}
										onChangeIndex={handleIndexChange}
										enableMouseEvents
										style={{
											overflow: "hidden !important",
										}}
										slideStyle={{
											width: relatedItems.length > 1 ? "47%" : "100%",
										}}
										containerStyle={{
											width: "100%",
											display: "flex",
											gap: "12px",
											transform: "translateX(50%)",
										}}
									>
										{relatedItems.map((item, index) => (
											<div
												key={item.id}
												style={{
													width: "100%",
													maxWidth: "260px",
													borderRadius: "8px",
												}}
											>
												<ItemComponent key={item.id} item={item} />
											</div>
										))}
									</AutoPlaySwipeableViews>
								</div>
							</div>
						)}

						{brandPost.sourceUrls.length > 0 && (
							<>
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
									{brandPost.sourceUrls.map((sourceUrl, index) => (
										<div
											key={`${sourceUrl}-${index}`}
											className="reference-item"
										>
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
								</div>
							</>
						)}
					</div>

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

				<BrandPostDialog
					open={isBrandPostDialogOpen}
					handleDialogClose={handleBrandPostDialogClose}
					brandPost={brandPost}
				/>

				<CreateReportDialog
					open={reportDialogOpen}
					brandPost={brandPost}
					handleClose={handleReportDialogClose}
					handleSubmit={handleSubmitReport}
				/>
				<DeleteConfirmationDialog
					open={deleteDialogOpen}
					handleClose={handleDeleteDialogClose}
					objectToDelete={`${brandPost.title}`}
					nameToDelete={brandPost.title}
					dialogSubtext={`The Brand Post "${brandPost.title}" will be deleted. Are you sure?`}
					buttonText="Topic"
					handleDelete={handleDeleteBrandPost}
					reloadAfterDelete={false}
				/>
			</div>
		</div>
	);
};

const getMaxItemSliderLength = (count: number) => {
	if (count >= 5) {
		return 3;
	}
	if (count >= 3) {
		return 2;
	}
	return 1;
};

export default BrandPostComponent;
