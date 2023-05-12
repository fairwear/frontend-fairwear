import { AddCircleOutlined } from "@mui/icons-material";
import { ButtonProps, IconButton, Tooltip } from "@mui/material";
import { useAppSelector } from "@redux/store/hooks";
import { ChangeEvent, useRef } from "react";
import "./Button.css";
import { useFormikContext } from "formik";

interface UploadIconButtonProps extends ButtonProps {
	name: string;
	handleUpload: (file: File) => void;

	disabled?: boolean;
}

const UploadIconButton = (props: UploadIconButtonProps) => {
	const { name, handleUpload, disabled = false } = props;
	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);

	const hiddenInputRef = useRef<HTMLInputElement | null>(null);

	const handleClick = () => {
		hiddenInputRef.current?.click();
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			if (e.target.files.length > 0) {
				let image = e.target.files[0];
				formikContext.setFieldValue(name, image);
				handleUpload(image);
			}
		}
	};

	const formikContext = useFormikContext();

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
								color: isLoggedIn
									? "#FFFFFF"
									: "rgba(229, 57, 53, 0.55) !important",
							},
						}}
					/>
				</IconButton>
			</Tooltip>
			<input
				alt="Upload Image"
				accept="image/*"
				type="file"
				multiple
				onChange={handleFileChange}
				ref={hiddenInputRef}
				style={{ display: "none" }}
			/>
		</>
	);
};

export default UploadIconButton;
