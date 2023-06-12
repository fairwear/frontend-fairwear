import BrandPostPreview from "@components/brandpost/BrandPostPreview";
import DialogHeader from "@components/dialog/DialogHeader";
import CreateReportForm, {
	CreateReportFormValues,
} from "@components/report/CreateReportForm";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import { CircularProgress, Dialog } from "@mui/material";
import { FormikHelpers } from "formik";
import "./Report.css";

interface CreateReportDialogProps {
	open: boolean;
	brandPost: BrandPostResponse;
	handleSubmit: (
		values: CreateReportFormValues,
		formikHelpers: FormikHelpers<any>
	) => void;
	handleClose: () => void;
}

const CreateReportDialog = (props: CreateReportDialogProps) => {
	const { open, brandPost, handleSubmit, handleClose } = props;

	return (
		<Dialog
			open={open}
			fullWidth
			className="report-dialog"
			style={{
				backdropFilter: "blur(2px)",
			}}
			PaperProps={{
				style: {
					height: "90%",
					width: "70%",
				},
			}}
			keepMounted
		>
			<DialogHeader
				title="Report a Post"
				returnButtonAction={handleClose}
				returnButtonLabel="Cancel"
				containerStyle={{
					width: "calc(100% - 48px)",
				}}
			/>
			{brandPost && (
				<div className="report-dialog__brandpost-preview-container">
					<div className="report-dialog__brandpost-preview">
						<BrandPostPreview brandPost={brandPost} />
					</div>
				</div>
			)}
			{!brandPost && (
				<CircularProgress
					style={{
						width: "32px",
						height: "32px",
					}}
				/>
			)}

			<CreateReportForm handleSubmit={handleSubmit} handleClose={handleClose} />
		</Dialog>
	);
};

export default CreateReportDialog;
