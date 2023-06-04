import BrandPostAPI from "@api/BrandPostAPI";
import BrandPostPreview from "@components/brandpost/BrandPostPreview";
import DialogHeader from "@components/dialog/DialogHeader";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import ReportResponse from "@models/report/ReportResponse";
import {
	Button,
	Dialog,
	DialogContent,
	Divider,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AppTheme from "../../AppTheme";
import "./Report.css";
import ReportStatusEnum from "@models/report/ReportStatusEnum";

interface ReportPreviewDialogProps {
	open: boolean;
	report: ReportResponse;
	handleClose: () => void;
	handleRejectReport: (report: ReportResponse) => void;
	handleDeleteBrandPost: (report: ReportResponse) => void;
    handleReopenReport: (report: ReportResponse) => void;
}

const ReportPreviewDialog = (props: ReportPreviewDialogProps) => {
	const { open, report, handleClose } = props;

	const [brandPost, setBrandPost] = useState<BrandPostResponse>();

	useEffect(() => {
		getBrandPost();
	}, []);

	const getBrandPost = async () => {
		const response = await BrandPostAPI.findById(report.post.id);
		setBrandPost(response);
	};

	return (
		<Dialog
			open={open}
			fullWidth
			onClose={handleClose}
			PaperProps={{
				style: {
					width: "100%",
				},
			}}
		>
			<DialogHeader
				title="Report Preview"
				returnButtonAction={handleClose}
				returnButtonLabel="Cancel"
				containerStyle={{
					width: "calc(100% - 48px)",
					backgroundColor: "#f5f5f5",
				}}
			/>
			<Divider
				variant="inset"
				style={{
					marginLeft: "0px",
					borderColor: AppTheme.palette.grey[300],
				}}
			/>
			<DialogContent
				style={{
					overflow: "auto",
					height: "100%",
					marginBottom: "24px",
				}}
			>
				<div className="report-preview-container">
					<div className="report-body-container">
						<div className="report-body">
							<Typography variant="h4" fontWeight={500}>
								Reported Post
							</Typography>
							<Typography variant="h4" fontWeight={700}>
								{report.post.title}
							</Typography>
						</div>

						<div className="report-body">
							<Typography variant="h4" fontWeight={500}>
								Reported Reason
							</Typography>
							<Typography variant="h4" fontWeight={700}>
								{report.reportReason}
							</Typography>
						</div>
						{report.comment && (
							<div className="report-body">
								<Typography variant="h4" fontWeight={500}>
									Reported Comment
								</Typography>
								<Typography variant="h4" fontWeight={700}>
									{report.comment}
								</Typography>
							</div>
						)}
					</div>
					<Divider
						variant="inset"
						style={{
							padding: "12px 0px",
							marginLeft: "-8px",
							width: "calc(100% + 32px)",
							marginBottom: "16px",
							borderColor: AppTheme.palette.grey[400],
						}}
					/>
					<div className="brandpost-preview-container">
						{brandPost && <BrandPostPreview brandPost={brandPost} />}
					</div>
					<Divider
						variant="inset"
						style={{
							padding: "12px 0px",
							marginLeft: "0px",
							width: "calc(100% + 92px)",
							marginTop: "-16px",
							marginBottom: "16px",
							borderColor:
								report.status === ReportStatusEnum.RESOLVED
									? AppTheme.palette.grey[600]
									: AppTheme.palette.grey[300],
						}}
					/>
					{report.status !== ReportStatusEnum.RESOLVED && (
						<div className="report-preview-button-container">
							<Button
								fullWidth
								style={{
									marginTop: "auto",
									padding: "12px 16px",
								}}
								onClick={() => props.handleRejectReport(report)}
								sx={{
									border: `1.5px solid ${AppTheme.palette.grey[700]}`,
									"&:hover": {
										backgroundColor: `${AppTheme.palette.grey[300]} !important`,
									},
								}}
							>
								<Typography variant="h5">Reject Report</Typography>
							</Button>
							<Button
								fullWidth
								onClick={() => props.handleDeleteBrandPost(report)}
								style={{
									marginTop: "auto",
									padding: "13px 16px",
									marginBottom: "-24px",
									backgroundColor: AppTheme.palette.red[400],
									border: `1.5px solid ${AppTheme.palette.red[700]}`,
								}}
								sx={{
									"&:hover": {
										backgroundColor: `${AppTheme.palette.red[600]} !important`,
									},
								}}
							>
								<Typography variant="h5" color="#FFFFFF">
									Remove Post
								</Typography>
							</Button>
						</div>
					)}
					{report.status === ReportStatusEnum.RESOLVED && (
						<div className="report-preview-button-container">
							<Typography
								variant="h4"
								style={{
									alignSelf: "flex-start",
									marginBottom: "24px",
									fontSize: "22px",
									fontStyle: "italic",
								}}
							>
								Report was already resolved
							</Typography>
							<Button
								fullWidth
								style={{
									marginTop: "auto",
									padding: "12px 16px",
									marginBottom: "-24px",
								}}
								onClick={() => props.handleReopenReport(report)}
								sx={{
									border: `1.5px solid ${AppTheme.palette.grey[700]}`,
									"&:hover": {
										backgroundColor: `${AppTheme.palette.grey[300]} !important`,
									},
								}}
							>
								<Typography variant="h5">Reopen Report</Typography>
							</Button>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ReportPreviewDialog;
