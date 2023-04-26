import { Box, Button } from "@mui/material";
import "./Dialog.css";

interface Props {
	cancelButtonLabel?: string;
	cancelButtonAction?: () => void;
	confirmButtonLabel?: string;
	confirmButtonAction: () => void;
	confirmButtonType?: "submit" | "button" | "reset";
	isConfirmDisabled?: boolean;
	buttonsProportion?: "1to1" | "1to3";
	containerStyle?: React.CSSProperties;
}

const DialogFooter = (props: Props) => {
	const {
		cancelButtonLabel = "Cancel",
		cancelButtonAction,
		confirmButtonLabel = "Save",
		confirmButtonAction,
		confirmButtonType = "submit",
		isConfirmDisabled = false,
		buttonsProportion = "1to1",
		containerStyle,
	} = props;
	return (
		<div
			style={{
				display: "flex",
				flex: 1,
				gap: "10px",
				...containerStyle,
			}}
		>
			{cancelButtonAction && (
				<div
					style={{
						display: "flex",
						flex: 1,
					}}
				>
					<Button
						fullWidth
						color="primary"
						variant="grey"
						onClick={cancelButtonAction}
					>
						{cancelButtonLabel}
					</Button>
				</div>
			)}
			<Box
				style={{
					display: "flex",
					flex: buttonsProportion === "1to1" ? 1 : 3,
				}}
				sx={{
					"&:hover": {
						cursor: isConfirmDisabled
							? "not-allowed !important"
							: "pointer !important",
					},
				}}
			>
				<Button
					fullWidth
					color="primary"
					variant="contained"
					type={confirmButtonType}
					disabled={isConfirmDisabled}
					onClick={confirmButtonAction}
				>
					{confirmButtonLabel}
				</Button>
			</Box>
		</div>
	);
};

export default DialogFooter;
