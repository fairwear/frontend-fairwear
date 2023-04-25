import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Card, Dialog, Typography } from "@mui/material";
import AppTheme from "../../AppTheme";
import ConfirmDeleteIcon from "assets/svg/deletion-confirmation-icon.svg";
import "./Dialog.css";
interface DeleteConfirmationDialogProps {
	open: boolean;
	handleClose: () => void;
	objectToDelete: string;
	nameToDelete: string;
	dialogSubtext: string;
	reloadAfterDelete?: boolean;
	simpleNaming?: boolean;
	buttonText: string;
	handleDelete: () => void;
}

const DeleteConfirmationDialog = (props: DeleteConfirmationDialogProps) => {
	const {
		handleClose,
		objectToDelete,
		nameToDelete,
		buttonText,
		dialogSubtext,
		reloadAfterDelete = true,
		simpleNaming = false,
	} = props;

	const handleDeleteConfirmation = () => {
		props.handleDelete();
		handleClose();
		if (reloadAfterDelete) {
			window.location.reload();
		}
	};

	return (
		<Dialog
			open={props.open}
			onClose={handleClose}
			disableScrollLock={false}
			PaperProps={{
				style: {
					width: "100%",
					maxWidth: "624px",
					boxShadow:
						"0px 6px 12px -6px rgba(0, 43, 0, 0.05), 0px 8px 22px -4px rgba(0, 43, 0, 0.05)",
				},
			}}
		>
			<Card
				style={{
					overflow: "auto",
					height: "100%",
				}}
			>
				<div className="dialog">
					<div className="dialog-header">
						<Button variant="text" className="button" onClick={handleClose}>
							<Typography variant="h5" color={AppTheme.palette.text.primary}>
								Atšaukti
							</Typography>
						</Button>
					</div>

					<ConfirmDeleteIcon />
					<div className="dialog-body-text">
						<Typography
							variant="h2"
							align="center"
							className="dialog-title"
							color={AppTheme.palette.text.primary}
							style={{
								paddingBottom: "8px",
								maxWidth: "480px",
							}}
						>
							{`Ar tikrai norite ištrinti ${objectToDelete}?`}
						</Typography>
						<Typography
							variant="body1"
							color={AppTheme.palette.text.primary}
							align="center"
						>
							<Typography
								align="center"
								variant="body1"
								color={AppTheme.palette.text.primary}
								fontWeight={700}
							>
								{nameToDelete}
							</Typography>
							{dialogSubtext}
						</Typography>
					</div>
					<div className="dialog-footer">
						<Button
							className="cancel-button"
							variant="grey"
							onClick={handleClose}
							style={{
								padding: "16px",
							}}
						>
							<Typography variant="h5" color={AppTheme.palette.text.primary}>
								{simpleNaming ? "Palikti" : `Palikti ${buttonText}`}
							</Typography>
						</Button>
						<Button
							variant="danger"
							className="delete-button"
							onClick={handleDeleteConfirmation}
							style={{
								padding: "16px",
							}}
						>
							<DeleteIcon
								style={{
									paddingRight: "8px",
									color: "#ffffff",
									height: "22px",
									width: "22px",
								}}
							/>
							<Typography variant="h5" color="#ffffff">
								{simpleNaming ? "Ištrinti" : `Ištrinti ${buttonText}`}
							</Typography>
						</Button>
					</div>
				</div>
			</Card>
		</Dialog>
	);
};

export default DeleteConfirmationDialog;
