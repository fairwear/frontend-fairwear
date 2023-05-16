import { AdminReportFormValues } from "@components/report/AdminReportForm";
import { Dialog } from "@mui/material";
import { FormikHelpers } from "formik";
import "./Report.css";

interface AdminReportDialogProps {
	open: boolean;
	brandPostId: number;
	handleSubmit: (
		values: AdminReportFormValues,
		formikHelpers: FormikHelpers<any>
	) => void;
	onClose: () => void;
}

const AdminReportDialog = (props: AdminReportDialogProps) => {
	const { open, brandPostId, handleSubmit, onClose } = props;

	return (
		<Dialog open={open}>
			<div>
				<h1>Report</h1>
			</div>
		</Dialog>
	);
};

export default AdminReportDialog;
