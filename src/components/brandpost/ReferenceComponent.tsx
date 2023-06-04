import { ErrorRounded, HelpRounded } from "@mui/icons-material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import {
	Box,
	IconButton,
	Link,
	StandardTextFieldProps,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { useField } from "formik";
import { useState } from "react";
import AppTheme from "../../AppTheme";
import "../form/FormComponents.css";
import "./BrandPost.css";

interface ReferenceComponentProps extends StandardTextFieldProps {
	name: string;
	sourceUrls: string[];
	handleChange: (newValue: string[]) => void;
}

const ReferenceComponent = (props: ReferenceComponentProps) => {
	const { name, sourceUrls, handleChange } = props;

	const [newSourceUrl, setNewSourceUrl] = useState<string>("");
	const [isValidUrl, setIsValidUrl] = useState<boolean>(false);

	const [field, meta, helper] = useField(name);

	const validateUrl = (url: string) => {
		const urlRegex =
			/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

		const urlRegExp = new RegExp(urlRegex);

		return urlRegExp.test(url);
	};

	const handleAddSourceUrl = () => {
		const newSourceUrls = [...sourceUrls, newSourceUrl];
		handleChange(newSourceUrls);
		helper.setValue(newSourceUrls);
		setNewSourceUrl("");
		helper.setTouched(false);
		setIsValidUrl(false);
	};

	const handleRemoveSourceUrl = (sourceUrl: string) => {
		const newSourceUrls = sourceUrls.filter((url) => url !== sourceUrl);
		handleChange(newSourceUrls);
		helper.setValue(newSourceUrls);
	};

	return (
		<div className="brand-post-reference-container">
			<div className="textfield-title-container">
				<Typography color={AppTheme.palette.text.primary} variant="h5">
					References
				</Typography>
				<Tooltip title={"Add a link to the source material"}>
					<HelpRounded className="textfield-tooltip" />
				</Tooltip>
			</div>
			{sourceUrls.length > 0 && (
				<div className="source-urls-container">
					{sourceUrls.map((sourceUrl, index) => (
						<div key={index} className="source-url-component">
							<Link
								sx={{
									cursor: "pointer",
								}}
								href={sourceUrl}
							>
								<Typography variant="body1">{sourceUrl}</Typography>
							</Link>
							<IconButton onClick={() => handleRemoveSourceUrl(sourceUrl)}>
								<Tooltip title="Delete this reference URL">
									<DeleteOutlinedIcon
										style={{
											height: "24px",
											width: "24px",
											color: AppTheme.palette.red[200],
										}}
										sx={{
											":hover": {
												cursor: "pointer",
											},
										}}
									/>
								</Tooltip>
							</IconButton>
						</div>
					))}
				</div>
			)}
			{sourceUrls.length < 3 && (
				<TextField
					value={newSourceUrl}
					placeholder="Add a new reference URL"
					onBlur={(event) => {
						let isValid = validateUrl(event.target.value);
						setIsValidUrl(isValid);
					}}
					onChange={(event) => {
						setNewSourceUrl(event.target.value);
						let isValid = validateUrl(event.target.value);
						setIsValidUrl(isValid);
					}}
					onInputCapture={(event) => {
						helper.setTouched(true);
					}}
					InputProps={{
						endAdornment: (
							<Tooltip title="Add a new reference URL">
								<LibraryAddOutlinedIcon
									onClick={handleAddSourceUrl}
									style={{
										height: "24px",
										width: "24px",
										color: isValidUrl
											? AppTheme.palette.grey[800]
											: AppTheme.palette.grey[400],
									}}
									sx={{
										":hover": {
											cursor: isValidUrl ? "pointer" : "not-allowed",
										},
									}}
								/>
							</Tooltip>
						),
					}}
				/>
			)}
			{meta.touched && !isValidUrl && newSourceUrl !== "" && (
				<Box className="textfield-error-container">
					<ErrorRounded className="textfield-error-icon" />
					<Typography variant="subtitle1" color="#C62828" align="left">
						Please enter a valid URL.
					</Typography>
				</Box>
			)}
			{meta.touched && Boolean(meta.error) && (
				<Box className="textfield-error-container">
					<ErrorRounded className="textfield-error-icon" />
					<Typography variant="subtitle1" color="#C62828" align="left">
						{meta.error}
					</Typography>
				</Box>
			)}
		</div>
	);
};

export default ReferenceComponent;
// "^(https?:\\/\\/)?" + // protocol

// "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|"+ // domain name
// "((\\d{1,3}\\.){3}\\d{1,3}))"+ // OR ip (v4) address
// "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*"+ // port and path
// "(\\?[;&a-z\\d%_.~+=-]*)?"+ // query string
// "(\\#[-a-z\\d_]*)?$", "i"
