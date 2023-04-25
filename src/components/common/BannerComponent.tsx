import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import {
	Alert,
	AlertProps,
	AlertTitle,
	AlertTitleProps,
	Button,
	Typography,
} from "@mui/material";
import AppTheme from "AppTheme";

interface BannerComponentProps extends AlertProps {
	alertMessage: string;
	alertMessageFontVariant?:
		| "body"
		| "button"
		| "caption"
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "h5"
		| "h6"
		| "inherit"
		| "subtitle2"
		| "body2"
		| "hyperlink"
		| "subtitle";
	AlertMessageComponent?: JSX.Element;
	hasCloseButton?: boolean;
	closeAlert?: () => void;
	actionTitle?: string;
	alertAction?: () => void | React.ReactNode;
	AlertTitleProps?: AlertTitleProps;
}

const BannerComponent = (props: BannerComponentProps) => {
	const {
		alertMessage,
		hasCloseButton = true,
		alertMessageFontVariant = "h3",
		actionTitle,
		closeAlert,
		alertAction,
		AlertMessageComponent,
		...other
	} = props;
	return (
		<Alert
			className="druskininkai-banner"
			{...other}
			closeText="Uždaryti"
			variant="filled"
			iconMapping={{
				error: <ErrorOutlineRoundedIcon />,
				warning: (
					<WarningAmberRoundedIcon
						style={{
							color: AppTheme.palette.text.primary,
						}}
					/>
				),
				info: <InfoOutlinedIcon />,
				success: <CheckCircleOutlineRoundedIcon />,
			}}
			style={props.style}
		>
			<div className="content">
				<div className="text-and-logo-container">
					<AlertTitle
						className="druskininkai-banner-title"
						{...other.AlertTitleProps}
					>
						{AlertMessageComponent ? (
							AlertMessageComponent
						) : (
							<Typography
								variant={alertMessageFontVariant}
								color={
									other.severity === "warning"
										? AppTheme.palette.warning.contrastText
										: AppTheme.palette.background.default
								}
							>
								{alertMessage}
							</Typography>
						)}
					</AlertTitle>
				</div>
				{((actionTitle && alertAction) || hasCloseButton) && (
					<div className="action-button-container">
						{actionTitle && alertAction && (
							<Button
								variant="contained"
								className="druskininkai-banner-action-button"
								onClick={alertAction}
							>
								<Typography
									variant="h6"
									color={AppTheme.palette.background.default}
								>
									{actionTitle}
								</Typography>
							</Button>
						)}
						{hasCloseButton && (
							<Button
								variant="text"
								size="small"
								color="secondary"
								onClick={() => (closeAlert ? closeAlert() : null)}
								className="druskininkai-banner-close-button"
							>
								<Typography variant="h6">Uždaryti</Typography>
							</Button>
						)}
					</div>
				)}
			</div>
		</Alert>
	);
};

export default BannerComponent;
