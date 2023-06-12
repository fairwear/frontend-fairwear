import { CloseOutlined } from "@mui/icons-material";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { ChangeEvent, InputHTMLAttributes } from "react";

interface DragOnFileInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	images: File[];
	hiddenInputRef: React.RefObject<HTMLInputElement>;
	singleImage?: boolean;
	handleClick: () => void;
	handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleImageChange: (removedImage: File) => void;
	buttonText?: string;
	buttonContainerStyle?: React.CSSProperties;
	buttonStyle?: React.CSSProperties;
}

const DragOnFileInput = (props: DragOnFileInputProps) => {
	const {
		handleFileChange,
		handleClick,
		handleImageChange,
		hiddenInputRef,
		images,
		buttonContainerStyle,
		buttonStyle,
		singleImage = false,
		buttonText = "Upload Image",
	} = props;

	const formikContext = useFormikContext();

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "12px",
			}}
		>
			{((singleImage && images.length === 0) || !singleImage) && (
				<div
					style={{
						...buttonContainerStyle,
					}}
				>
					<Button
						style={{
							background: "transparent",
							padding: "8px 16px",
							...buttonStyle,
						}}
						onClick={() => {
							handleClick();
						}}
						sx={{
							"&:hover": {
								backgroundColor: "#e5e5e5",
								opacity: 0.8,
							},
						}}
					>
						<span className="drop-title">{buttonText}</span>{" "}
					</Button>
					<input
						name={props.name}
						multiple
						alt={props.alt}
						accept="image/*"
						type="file"
						onChange={(event) => {
							handleFileChange(event);
							if (event.currentTarget.files) {
								formikContext.setFieldValue(
									props.name,
									event.currentTarget.files[0]
								);
							} else {
								formikContext.setFieldValue(props.name, null);
							}
						}}
						ref={hiddenInputRef}
						hidden
					/>
				</div>
			)}
			{images.length > 0 && (
				<>
					<Divider
						style={{
							width: "100%",
							borderColor: "rgba(34, 34, 34, 0.3)",
							marginTop: "24px",
							marginBottom: "24px",
						}}
					/>
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							alignItems: "center",
						}}
					>
						{images.map((image) => (
							<div
								key={image.lastModified * Math.random()}
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									gap: "12px",
									maxWidth: "50%",
								}}
							>
								<div
									style={{
										display: "flex",
										alignItems: "flex-start",
										marginLeft: "12px",
									}}
								>
									<img
										src={URL.createObjectURL(image)}
										alt="uploaded"
										style={{
											width: "100px",
											height: "100px",
										}}
									/>
									<IconButton
										style={{
											marginLeft: "-36px",
											padding: "8px",
										}}
										onClick={() => {
											let removedImage = images.find((i) => i === image);
											if (removedImage) {
												handleImageChange(removedImage);
											} else {
												console.error("Image not found");
											}

											// handleImageChange(filteredImages);
										}}
									>
										<CloseOutlined
											style={{
												color: "#FFFFFF",
											}}
										/>
									</IconButton>
								</div>
								<Typography
									variant="h6"
									align="right"
									style={{
										maxWidth: "50%",
									}}
								>
									{image.name}
								</Typography>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default DragOnFileInput;
