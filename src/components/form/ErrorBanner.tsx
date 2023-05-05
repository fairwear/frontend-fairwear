import { ErrorRounded } from "@mui/icons-material";
import { Typography, TypographyProps } from "@mui/material";
import AppTheme from "../../AppTheme";
import "./FormComponents.css";

interface ErrorBannerProps {
	errorMessage: string;
	errorTextProps?: TypographyProps;
	errorContainerStyle?: React.CSSProperties;
}

const ErrorBanner = (props: ErrorBannerProps) => {
	const { errorMessage, errorTextProps, errorContainerStyle } = props;

	return (
		<div className="error-banner-container" style={errorContainerStyle}>
			<ErrorRounded className="error-banner-icon" />
			<Typography
				variant="subtitle1"
				color={AppTheme.palette.red[800]}
				align="left"
				{...errorTextProps}
			>
				{errorMessage}
			</Typography>
		</div>
	);
};

export default ErrorBanner;
