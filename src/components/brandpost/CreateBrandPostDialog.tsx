import CreateBrandPostForm, {
	CreateBrandPostFormValues,
} from "@components/brandpost/CreateBrandPostForm";
import ClosableDialog from "@components/dialog/ClosableDialog";
import DialogHeader from "@components/dialog/DialogHeader";

interface CreateBrandPostDialogProps {
	open: boolean;
	handleSubmit: (values: CreateBrandPostFormValues) => void;
	handleDialogClose: () => void;
}

const CreateBrandPostDialog = (props: CreateBrandPostDialogProps) => {
	const { open, handleDialogClose, handleSubmit } = props;
	return (
		<ClosableDialog
			open={open}
			handleDialogClosing={handleDialogClose}
			paperProps={{
				style: {
					width: "100%",
				},
			}}
			disableBackdropClick={true}
		>
			<div className="brandpost-dialog-inner-container">
				<DialogHeader
					title="Creating a Brand Post"
					returnButtonAction={handleDialogClose}
					returnButtonLabel="Close"
					containerStyle={{
						width: "100%",
						boxSizing: "border-box",
						backgroundColor: "rgba(242, 237, 237, 0.8)",
					}}
				/>
				<CreateBrandPostForm
					handleFormSubmit={handleSubmit}
					handleDialogClose={handleDialogClose}
				/>
			</div>
		</ClosableDialog>
	);
};

export default CreateBrandPostDialog;
