import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import {
	Alert,
	AlertProps,
	AlertTitle,
	AlertTitleProps,
	Button,
	IconButton,
	Snackbar,
	Typography,
} from "@mui/material";
import AppTheme from "../../AppTheme";
import "./AlertComponents.css";

interface ToastComponentProps extends AlertProps {
	alertMessage: string;
	closeAlert: () => void;
	actionTitle?: string;
	alertAction?: () => void | React.ReactNode;
	AlertTitleProps?: AlertTitleProps;
}

const ToastComponent = (props: ToastComponentProps) => {
	const { alertMessage, closeAlert, actionTitle, alertAction, ...other } =
		props;
	return (
		<Snackbar
			open={true}
			onClose={() => closeAlert()}
			autoHideDuration={6000000}
			className="fairwear-toast"
		>
			<Alert
				{...other}
				variant="filled"
				className="toast-alert"
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
			>
				<div className="alert-content">
					<div className="text-and-logo-container">
						<AlertTitle
							className="fairwear-banner-title"
							{...other.AlertTitleProps}
						>
							<Typography
								variant="h3"
								color={
									other.severity === "warning"
										? AppTheme.palette.warning.contrastText
										: AppTheme.palette.background.default
								}
							>
								{alertMessage}
							</Typography>
						</AlertTitle>
					</div>
					<div className="action-button-container">
						{actionTitle && alertAction && (
							<Button
								variant="contained"
								className="fairwear-banner-action-button"
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
						<IconButton
							size="small"
							onClick={() => closeAlert()}
							className="fairwear-banner-close-button"
						>
							<CloseRoundedIcon className="toast-close-icon" />
						</IconButton>
					</div>
				</div>
			</Alert>
		</Snackbar>
	);
};

export default ToastComponent;
