import DialogHeader from "@components/dialog/DialogHeader";
import CreateItemForm, {
	CreateItemFormValues,
} from "@components/item/CreateItemForm";
import { Dialog, DialogContent } from "@mui/material";

interface CreateItemDialogProps {
	open: boolean;
	handleDialogClose: () => void;
	handleSubmit: (values: CreateItemFormValues) => void;
}

const CreateItemDialog = (props: CreateItemDialogProps) => {
	const { open, handleDialogClose, handleSubmit } = props;

	return (
		<Dialog
			open={open}
			fullWidth
			PaperProps={{
				style: {
					width: "100%",
					height: "100%",
				},
			}}
		>
			<DialogHeader
				title="Create Item"
				returnButtonAction={handleDialogClose}
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
			>
				<CreateItemForm handleSubmit={handleSubmit} />
			</DialogContent>
		</Dialog>
	);
};

export default CreateItemDialog;
