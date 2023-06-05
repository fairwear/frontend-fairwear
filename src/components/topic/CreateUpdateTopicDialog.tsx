import ClosableDialog from "@components/dialog/ClosableDialog";
import DialogHeader from "@components/dialog/DialogHeader";
import CreateUpdateTopicForm from "@components/topic/CreateUpdateTopicForm";
import TopicResponse from "@models/topic/TopicResponse";

interface CreateUpdateTopicDialogProps {
	open: boolean;
	state: "edit" | "create";
	handleClose: () => void;
	topic?: TopicResponse;
}

const CreateUpdateTopicDialog = (props: CreateUpdateTopicDialogProps) => {
	const { open, state, topic, handleClose } = props;
	console.log("topic:", topic);
	console.log("state:", state);

	return (
		<ClosableDialog
			open={open}
			handleDialogClosing={handleClose}
			paperProps={{
				style: {
					width: "100%",
				},
			}}
			disableBackdropClick={true}
		>
			<div className="topic-dialog-inner-container">
				<DialogHeader
					title={state === "create" ? "Creating a Topic" : "Editing a Topic"}
					returnButtonAction={handleClose}
					returnButtonLabel="Close"
					containerStyle={{
						width: "100%",
						boxSizing: "border-box",
						backgroundColor: "rgba(242, 237, 237, 0.8)",
					}}
				/>
				<CreateUpdateTopicForm
					state={state}
					topic={topic ? ((topic as any).row as TopicResponse) : undefined}
					handleClose={handleClose}
				/>
			</div>
		</ClosableDialog>
	);
};

export default CreateUpdateTopicDialog;
