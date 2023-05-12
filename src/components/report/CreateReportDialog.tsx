import { Dialog } from "@mui/material";

interface CreateReportDialogProps {
	open: boolean;
    onClose: () => void;
}

const CreateReportDialog = (props: CreateReportDialogProps) => {
	return (
		<Dialog open={props.open}>
			<div>
				<h1>Report</h1>
			</div>
		</Dialog>
	);
};

export default CreateReportDialog;
