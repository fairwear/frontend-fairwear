import DialogHeader from "@components/dialog/DialogHeader";
import ReportResponse from "@models/report/ReportResponse";
import { Dialog, DialogContent } from "@mui/material";

interface AdminReportPreviewDialogProps {
	open: boolean;
	report: ReportResponse;
	handleClose: () => void;
}

const AdminReportPreviewDialog = (props: AdminReportPreviewDialogProps) => {
	const { open, report, handleClose } = props;
	return (
		<Dialog
			open={open}
			fullWidth
			onClose={handleClose}
			PaperProps={{
				style: {
					width: "100%",
					height: "100%",
				},
			}}
		>
			<DialogHeader
				title="Report Preview"
				returnButtonAction={handleClose}
				returnButtonLabel="Cancel"
				containerStyle={{
					width: "calc(100% - 48px)",
				}}
			/>
			<DialogContent
				style={{
					overflow: "auto",
					height: "100%",
					// marginBottom: "48px",
					marginBottom: "24px",
				}}
			></DialogContent>
		</Dialog>
	);
};

export default AdminReportPreviewDialog;
