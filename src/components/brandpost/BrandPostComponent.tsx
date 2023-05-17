import VoteComponent from "@components/brandpost/VoteComponent";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import { IconButton, Typography } from "@mui/material";
import moment from "moment";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import "./BrandPost.css";
import AppTheme from "../../AppTheme";
import { useState } from "react";
import alerts from "@redux/alerts";
import ReportAPI from "@api/ReportAPI";
import { FormikHelpers } from "formik";
import { CreateReportFormValues } from "@components/report/CreateReportForm";
import CreateReportRequest from "@models/report/CreateReportRequest";
import CreateReportDialog from "@components/report/CreateReportDialog";

interface BrandPostComponentProps {
	brandPost: BrandPostResponse;
}

const BrandPostComponent = (props: BrandPostComponentProps) => {
	const [reportDialogOpen, setReportDialogOpen] = useState<boolean>(false);

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

	const url = props.brandPost.references.map((url) => {
		return url.sourceUrl;
	});

	const getUserName = () => {
		if (props.brandPost.author.name) {
			return props.brandPost.author.name;
		}
		return "Anonymous";
	};

	return (
		<div className="brandpost-container">
			<VoteComponent brandPostId={props.brandPost.id} />
			<div className="brandpost-content-container">
				<div className="brandpost-name-container">
					<Typography align="left" variant="h2">
						{props.brandPost.brand.name}
					</Typography>
					<IconButton
						className="report-button"
						onClick={handleReportDialogOpen}
						sx={{
							"& :hover": {
								color: AppTheme.palette.red[500],
							},
						}}
					>
						<ErrorOutlineRoundedIcon
							className="report-icon"
							sx={{
								color: AppTheme.palette.red[200],
							}}
						/>
					</IconButton>
				</div>
				<div className="brandpost-desc-container">
					<Typography align="left" variant="h3">
						{props.brandPost.title}
					</Typography>
					<Typography align="left" variant="body1">
						{props.brandPost.body}
						<br></br>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia
						temporibus laboriosam soluta eum! Perspiciatis rerum, reiciendis
						repellendus, fugit dignissimos numquam quasi in ab vel consectetur
						eveniet dolorum consequuntur, error atque. Lorem ipsum dolor, sit
						amet consectetur adipisicing elit. Consectetur ad veniam temporibus!
					</Typography>
				</div>
				<div className="brandpost-info-container">
					{url.map((url) => (
						<Typography key={url} variant="subtitle1">
							Reference url:<a href={url}>{url}</a>
						</Typography>
					))}

					<Typography variant="subtitle1">
						{moment(props.brandPost.createdAt).format("YYYY-MM-DD")}
					</Typography>

					<Typography align="right" variant="subtitle1" fontStyle="italic">
						- {getUserName()}
					</Typography>
				</div>
			</div>
			<CreateReportDialog
				open={reportDialogOpen}
				brandPostId={props.brandPost.id}
				handleClose={handleReportDialogClose}
				handleSubmit={handleSubmitReport}
			/>
		</div>
	);
};

export default BrandPostComponent;
