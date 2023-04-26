import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, ButtonProps, Typography } from "@mui/material";
import { ChangeEvent } from "react";

interface AddFileButtonProps extends ButtonProps {
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	label?: string;
	accept?: string;
	fileButtonId?: string;
	fileNames?: string;
	multiple?: boolean;
	boxStyle?: React.CSSProperties;
}

const AddFileButton = (props: AddFileButtonProps) => {
	const {
		handleInputChange,
		label = "Add File",
		accept = "*",
		fileButtonId = "",
		fileNames = "",
		multiple = false,
		boxStyle = {},
		...other
	} = props;

	return (
		<Box
			className="add-file-button-container"
			style={{
				...boxStyle,
			}}
		>
			<Box className="add-file-button">
				<label htmlFor={"file-upload-button" + fileButtonId}>
					<input
						id={"file-upload-button" + fileButtonId}
						name="file-upload-button"
						type="file"
						accept={accept}
						hidden
						multiple={multiple}
						onChange={handleInputChange}
					/>
					<Button variant="outlined" component="span" {...other}>
						<AddCircleIcon style={{ paddingRight: "5px" }} />
						<Typography noWrap fontWeight="bold" variant="h5">
							{label}
						</Typography>
					</Button>
				</label>
			</Box>
			<Typography variant="body1" className="filenames-text">
				{fileNames}
			</Typography>
		</Box>
	);
};

export default AddFileButton;
