import { Button, Typography } from "@mui/material";
import AppTheme from "../../AppTheme";
import "./Dialog.css";

interface DialogHeaderProps {
	title?: string;
	titleTypographyVariant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	titleStyle?: React.CSSProperties;
	subtitle?: string;
	stateText?: string;
	returnButtonLabel?: string;
	returnButtonAction?: () => void;
	containerStyle?: React.CSSProperties;
}

const DialogHeader = (props: DialogHeaderProps) => {
	const {
		title,
		titleTypographyVariant = "h2",
		titleStyle,
		subtitle,
		stateText,
		returnButtonLabel = "Cancel",
		returnButtonAction,
	} = props;
	return (
		<div
			className="dialog-header-container"
			style={{
				...props.containerStyle,
			}}
		>
			{title && (
				<div className="dialog-header-text">
					<Typography
						variant={titleTypographyVariant}
						color={AppTheme.palette.text.primary}
						style={titleStyle}
					>
						{title}
					</Typography>
					{subtitle && (
						<Typography
							variant="subtitle1"
							color={AppTheme.palette.text.secondary}
						>
							{subtitle}
						</Typography>
					)}
				</div>
			)}
			<div className="dialog-header-button-or-state">
				{!returnButtonAction ? (
					<Typography variant="h6" color={AppTheme.palette.text.secondary}>
						{stateText}
					</Typography>
				) : (
					<Button
						onClick={() => returnButtonAction()}
						style={{
							border: "1px solid rgba(34, 34, 34, 0.7)",
							borderRadius: "5px",
							padding: "8px 16px",
						}}
					>
						<Typography variant="h6" style={{}}>
							{returnButtonLabel}
						</Typography>
					</Button>
				)}
			</div>
		</div>
	);
};

export default DialogHeader;
