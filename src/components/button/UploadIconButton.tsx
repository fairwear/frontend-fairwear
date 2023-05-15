import { AddCircleOutlined } from "@mui/icons-material";
import {
	Button,
	ButtonProps,
	IconButton,
	SxProps,
	Theme,
	Tooltip,
} from "@mui/material";
import { useAppSelector } from "@redux/store/hooks";
import { useField, useFormikContext } from "formik";
import { ChangeEvent, useRef } from "react";
import "./Button.css";

interface UploadIconButtonProps extends ButtonProps {
	name: string;
	disabled?: boolean;
	handleUpload: (file: File) => void;
	buttonComponent?: JSX.Element;
	buttonSx?: SxProps<Theme>;
	buttonClassName?: string;
	multiple?: boolean;
}

const UploadIconButton = (props: UploadIconButtonProps) => {
	const { name, handleUpload, disabled = false, buttonComponent } = props;
	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);

	const hiddenInputRef = useRef<HTMLInputElement | null>(null);

	const formikContext = useFormikContext();
	const [field, meta, helpers] = useField(name);

	const handleClick = async () => {
		hiddenInputRef.current?.click();
		await new Promise((resolve) => setTimeout(resolve, 300));
		helpers.setTouched(true);
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			let image = e.target.files[0];
			handleUpload(image);
			helpers.setValue(image);
			helpers.setError(undefined);
			formikContext.validateField(name);
		} else {
			helpers.setValue("", true);
			formikContext.validateField(name);
		}
	};

	return (
		<>
			<Tooltip
				title={
					isLoggedIn
						? disabled
							? "Only 3 photos can be uploaded at a time"
							: ""
						: "Please log in upload a photo"
				}
				placement="bottom"
			>
				{buttonComponent ? (
					<Button
						disabled={disabled}
						fullWidth
						disableTouchRipple
						onClick={isLoggedIn && !disabled ? () => handleClick() : () => {}}
						sx={{
							width: "auto",
							opacity: isLoggedIn ? 1 : 0.5,
							padding: 0,
							"&:hover": {
								cursor: isLoggedIn && !disabled ? "normal" : "not-allowed",
								backgroundColor: "transparent",
							},
							...props.buttonSx,
						}}
					>
						{buttonComponent}
					</Button>
				) : (
					<IconButton
						className="hover-icon-effect"
						disableTouchRipple
						onClick={isLoggedIn && !disabled ? () => handleClick() : () => {}}
						sx={{
							opacity: isLoggedIn ? 1 : 0.5,
							"&:hover": {
								cursor: isLoggedIn && !disabled ? "normal" : "not-allowed",
							},
						}}
					>
						<DefaultUploadIconButton
							disabled={disabled}
							isLoggedIn={isLoggedIn}
						/>
					</IconButton>
				)}
			</Tooltip>
			<input
				alt="Upload Image"
				name={name}
				accept="image/*"
				type="file"
				multiple={props.multiple}
				onChange={(e) => {
					handleFileChange(e);
				}}
				ref={hiddenInputRef}
				style={{ display: "none" }}
			/>
		</>
	);
};

const DefaultUploadIconButton = (props: {
	disabled: boolean;
	isLoggedIn?: boolean;
}) => {
	const { disabled, isLoggedIn } = props;

	return (
		<AddCircleOutlined
			className="base-icon"
			style={{
				color: "#222222",
				opacity: isLoggedIn && !disabled ? 1 : 0.5,
				height: "32px",
				width: "32px",
			}}
			sx={{
				"&:hover": {
					cursor: isLoggedIn && !disabled ? "normal" : "not-allowed",
					boxShadow: isLoggedIn
						? "0 0 0 10px rgba(0, 0, 0, 0.4) !important"
						: "0 0 0 10px rgba(229, 57, 53, 0.4) !important",
					color: isLoggedIn ? "#FFFFFF" : "rgba(229, 57, 53, 0.55) !important",
				},
			}}
		/>
	);
};

export default UploadIconButton;
