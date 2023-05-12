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

	const paperScrollPaper = {
		minHeight: "100%",
	};

	return (
		<Dialog
			open={open}
			fullWidth
			classes={{
				paperScrollPaper: paperScrollPaper.minHeight,
			}}
			style={{
				minHeight: "100%",
			}}
			PaperProps={{
				style: {
					width: "100%",
					// height: "680px",
					height: "100%",
					minHeight: "min-content",
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

			<DialogContent>
				<CreateItemForm handleSubmit={handleSubmit} />
			</DialogContent>
		</Dialog>
	);
};

export default CreateItemDialog;
