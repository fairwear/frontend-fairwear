import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, OutlinedTextFieldProps } from "@mui/material";
import { useState } from "react";
import FormTextField from "./FormTextField";

interface HiddenPasswordFieldProps extends OutlinedTextFieldProps {
	title?: string;
	autoComplete?: string;
	name: string;
	className?: string;
	enableEnterSubmit?: boolean;
	enterSubmitAction?: () => void;
	inputRef?: React.RefObject<HTMLInputElement>;
}

const HiddenPasswordField = ({
	inputRef,
	title,
	autoComplete = "off",
	name,
	className,
	enableEnterSubmit,
	enterSubmitAction,
	...props
}: HiddenPasswordFieldProps) => {
	const [hidden, setHidden] = useState<boolean>(true);
	const changeVisibility = () => setHidden(!hidden);

	return (
		<FormTextField
			title={title}
			name={name}
			inputRef={inputRef}
			label={props.label || "Password"}
			type={hidden ? "password" : "text"}
			autoComplete={autoComplete}
			enableEnterSubmit={enableEnterSubmit}
			enterSubmitAction={enterSubmitAction}
			className={className}
			endIcon={
				<IconButton onClick={changeVisibility}>
					{hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
				</IconButton>
			}
		/>
	);
};

export default HiddenPasswordField;
