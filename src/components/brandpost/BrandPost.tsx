import ItemAPI from "@api/ItemAPI";
import ReportAPI from "@api/ReportAPI";
import CreateReportDialog from "@components/report/CreateReportDialog";
import { CreateReportFormValues } from "@components/report/CreateReportForm";
import TopicViewComponent from "@components/topic/TopicViewComponent";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import ItemResponse from "@models/item/ItemResponse";
import CreateReportRequest from "@models/report/CreateReportRequest";
import { ErrorOutlineRounded } from "@mui/icons-material";
import { IconButton, Link, Typography } from "@mui/material";
import alerts from "@redux/alerts";
import { FormikHelpers } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import AppTheme from "../../AppTheme";
import "./BrandPostComponents.css";

interface BrandPostComponentProps {
	brandPost: BrandPostResponse;
}

const BrandPostComponent = (props: BrandPostComponentProps) => {
	const { brandPost } = props;

	const [reportDialogOpen, setReportDialogOpen] = useState<boolean>(false);
	const [relatedItems, setRelatedItems] = useState<ItemResponse[]>([]);

	useEffect(() => {
		getRelatedItems();
	}, []);

	const getRelatedItems = async () => {
		const mappedItems = brandPost.relatedItems.map(async (item) => {
			const response = await ItemAPI.findById(item.itemId);
			return response;
		});

		const items = await Promise.all(mappedItems);
		console.log(items);
		setRelatedItems(items);
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
	return (
		<div className="brandpost-outer-container">
			<div className="brandpost-container">
				<div className="primary-section">
					<div className="left-section">
						<div className="brandpost-title-container">
							<Typography align="left" variant="h2">
								{props.brandPost.title}
							</Typography>
							<Typography
								align="left"
								variant="h4"
								style={{
									opacity: 0.8,
									fontStyle: "italic",
								}}
							>
								{props.brandPost.brand.name}
							</Typography>
						</div>
						<div className="brandpost-topics-container">
							{brandPost.topics.map((topic) => (
								<TopicViewComponent key={topic.topicId} postToTopic={topic} />
							))}
						</div>
					</div>
					<div className="right-section">
						<div className="brandpost-description-container" style={{}}>
							<Typography align="left" variant="body2">
								{props.brandPost.body}
							</Typography>
						</div>
					</div>
				</div>
				<div className="secondary-section">
					<div className="top-container">
						{relatedItems.length > 2 && (
							<div className="related-items-container">
								{relatedItems.slice(0, 3).map((item, index) => (
									<img
										key={item.id}
										className="item-image"
										src={relatedItems[index].imageUrl}
										alt={`related item ${index + 1}`}
									/>
								))}
							</div>
						)}
						<div className="reference-container">
							{brandPost.references.length > 0 && (
								<>
									{brandPost.references.map((reference) => (
										<div key={reference.id} className="reference-item">
											<Typography
												align="left"
												variant="subtitle1"
												style={{
													fontWeight: 600,
												}}
											>
												{reference.title}
											</Typography>
											<Link
												sx={{
													cursor: "pointer",
												}}
											>
												<Typography variant="subtitle2" align="left">
													{reference.sourceUrl}
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
						<IconButton
							className="report-button"
							onClick={handleReportDialogOpen}
							sx={{
								alignSelf: "flex-end",
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
