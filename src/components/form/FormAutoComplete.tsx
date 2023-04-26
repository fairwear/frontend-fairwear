import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import {
	Autocomplete,
	Box,
	IconButton,
	ListItemText,
	OutlinedTextFieldProps,
	TextField,
	Tooltip,
	Typography,
	TypographyProps,
} from "@mui/material";
import AppTheme from "../../AppTheme";
import { FieldHookConfig, useField, useFormikContext } from "formik";
import { useState } from "react";

interface OtherProps extends OutlinedTextFieldProps {
	options: any[];
	title?: string;
	titleRightClickableIcon?: JSX.Element;
	titleRightClickableIconAction?: () => void;
	description?: string;
	titleprops?: TypographyProps;
	descriptionProps?: TypographyProps;
	errorProps?: TypographyProps;
	tooltip?: string;
	popupIcon?: React.ReactNode;
	isPricingField?: boolean;
	disableOptionValidation?: boolean;
	disableClearable?: boolean;
	onClearSetToEmptyString?: boolean;
	textInputPriority?: boolean;
	initialValue?: string | null;
	inputstyle?: React.CSSProperties;
	getOptionLabel?: (option: any) => string;
	isOptionEqualToValue?: (option: any, value: any) => boolean;
	renderOption?: (props: any, option: any) => JSX.Element;
}

function FormAutocomplete(prop: OtherProps & FieldHookConfig<string>) {
	const [field, meta] = useField(prop);
	const {
		popupIcon,
		title,
		tooltip,
		description,
		disabled,
		titleRightClickableIcon,
		disableOptionValidation,
		disableClearable = false,
		onClearSetToEmptyString = false,
		textInputPriority,
		initialValue,
		titleRightClickableIconAction = () => {},
		variant = "outlined",
		getOptionLabel = defaultGetOptionLabel,
		isOptionEqualToValue = defaultIsOptionEqualToValue,
		renderOption = defaultRenderOption,
		...other
	} = prop;

	const formikContext = useFormikContext();

	const [open, setOpen] = useState(false);
	// const [value, setValue] = useState<string | undefined | null>(field.value);
	const [value, setValue] = useState<any | undefined | null>(field.value);

	const handleChange = (newValue: any | undefined) => {
		setValue(newValue);
		formikContext.setFieldTouched(prop.name, true);
		formikContext.setFieldValue(prop.name, newValue);
	};

	return (
		<div className="textfield-container">
			{title && (
				<div className="textfield-title-container">
					<Typography
						color={AppTheme.palette.text.primary}
						variant="h5"
						{...other.titleprops}
					>
						{title}
					</Typography>
					{tooltip && (
						<Tooltip title={tooltip}>
							<HelpRoundedIcon className="textfield-tooltip" />
						</Tooltip>
					)}
					{titleRightClickableIcon && (
						<IconButton onClick={titleRightClickableIconAction}>
							{titleRightClickableIcon}
						</IconButton>
					)}
				</div>
			)}
			<Autocomplete
				id="form-autocomplete"
				open={open}
				value={value ? value : field.value}
				disableClearable={disableClearable}
				autoHighlight
				disabled={disabled}
				key={field.name}
				onOpen={() => {
					if (textInputPriority) {
						if (!open && field.value && field.value.length <= 0) {
							setOpen(true);
						}
					} else {
						setOpen(true);
					}
				}}
				onClick={() => {
					if (textInputPriority) {
						if (!open && field.value && field.value.length <= 0) {
							setOpen(true);
						}
					} else {
						setOpen(true);
					}
				}}
				onDoubleClick={() => {
					setOpen(true);
				}}
				onClose={() => {
					setOpen(false);
				}}
				onFocus={() => {
					if (!field.value || field.value.length <= 0) {
						setOpen(true);
					}
				}}
				onChange={(event: any, newValue: string | undefined) => {
					if (textInputPriority) {
						setOpen(false);
					}
					handleChange(onClearSetToEmptyString ? newValue ?? "" : newValue);
				}}
				onBlur={(event: any) => {
					handleChange(event.target.value);
				}}
				clearOnBlur={!textInputPriority}
				onKeyDownCapture={(event: any) => {
					if (event.key === "Enter") {
						event.target.blur();
					}
				}}
				options={["", ...other.options]}
				fullWidth
				popupIcon={popupIcon || <ArrowDropDownRoundedIcon />}
				componentsProps={{
					popupIndicator: {
						onClick: () => {
							setOpen(!open);
						},
					},
				}}
				getOptionLabel={getOptionLabel}
				isOptionEqualToValue={isOptionEqualToValue}
				renderOption={renderOption}
				renderInput={(params) => (
					<TextField
						{...field}
						{...other}
						{...params}
						fullWidth
						error={meta.touched && Boolean(meta.error)}
						InputLabelProps={{
							...params.InputLabelProps,
							...prop.InputLabelProps,
						}}
						InputProps={{
							...params.InputProps,
							style: {
								...prop.inputstyle,
							},
							startAdornment: other.InputProps?.startAdornment,
						}}
					/>
				)}
			/>
			{meta.touched && Boolean(meta.error) && (
				<Box className="textfield-error-container">
					<ErrorRoundedIcon className="textfield-error-icon" />

					<Typography
						variant="subtitle1"
						color={AppTheme.palette.red[800]}
						align="left"
						{...other.errorProps}
					>
						{meta.error}
					</Typography>
				</Box>
			)}
			{description && (
				<Typography
					variant="subtitle1"
					align="left"
					color={AppTheme.palette.grey[700]}
					{...other.descriptionProps}
				>
					{description}
				</Typography>
			)}
		</div>
	);
}

export default FormAutocomplete;

const defaultRenderOption = (props: any, option: any) => (
	<div key={option}>
		{option ? (
			<Box component="li" {...props} key={option}>
				<ListItemText
					style={{
						padding: "0px",
					}}
				>
					<Typography variant="body1">{option}</Typography>
				</ListItemText>
			</Box>
		) : null}
	</div>
);

const defaultGetOptionLabel = (option: any) => option.toString();

const defaultIsOptionEqualToValue = (option: any, value: any) =>
	option.toString() === value.toString();
