import CreateBrandForm, {
	CreateBrandFormValues,
} from "@components/brand/form/CreateBrandForm";
import ClosableDialog from "@components/dialog/ClosableDialog";
import DialogHeader from "@components/dialog/DialogHeader";
import "./form/BrandFormComponents.css";

interface CreateUpdateBrandDialogProps {
	open: boolean;
	handleSubmit: (values: CreateBrandFormValues) => void;
	handleDialogClose: () => void;
}

const CreateUpdateBrandDialog = (props: CreateUpdateBrandDialogProps) => {
	const { open, handleSubmit, handleDialogClose } = props;

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
			<div className="brand-dialog-inner-container">
				<DialogHeader
					title="Create a Brand"
					returnButtonAction={handleDialogClose}
					returnButtonLabel="Close"
					containerStyle={{
						width: "100%",
						boxSizing: "border-box",
						backgroundColor: "rgba(242, 237, 237, 0.8)",
					}}
				/>
				<CreateBrandForm
					handleFormSubmit={handleSubmit}
					handleDialogClose={handleDialogClose}
				/>
			</div>
		</ClosableDialog>
	);
};

export default CreateUpdateBrandDialog;
