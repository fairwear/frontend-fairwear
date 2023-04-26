import { Card } from "@mui/material";
import ClosableDialog from "./ClosableDialog";
import "./Dialog.css";

interface StyledClosableDialogProps {
	handleDialogClosing: () => void;
	header: JSX.Element;
	footer: JSX.Element;
	closeWhenMouseIsOutside?: boolean;
	children: any;
}

const StyledClosableDialog = (props: StyledClosableDialogProps) => {
	const {
		handleDialogClosing,
		header,
		footer,
		closeWhenMouseIsOutside,
		children,
	} = props;
	return (
		<ClosableDialog
			handleDialogClosing={handleDialogClosing}
			closeWhenMouseIsOutside={closeWhenMouseIsOutside}
		>
			<Card
				style={{
					overflow: "auto",
					height: "100%",
				}}
			>
				<div className="dialog">
					<div className="dialog-header" style={{ padding: "16px 40px" }}>
						{header}
					</div>
					<div className="dialog-body-text" style={{ minHeight: "400px" }}>
						{children}
					</div>
					<div className="dialog-footer">{footer}</div>
				</div>
			</Card>
		</ClosableDialog>
	);
};

export default StyledClosableDialog;
