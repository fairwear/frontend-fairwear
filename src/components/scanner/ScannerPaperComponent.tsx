import PermissionNotice from "@components/scanner/PermissionNotice";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { CircularProgress, IconButton, Paper } from "@mui/material";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { useFormikContext } from "formik";
import { useState } from "react";
import "./Scanner.css";

interface ScannerPaperComponentProps {
	name: string;
	isLoaded: boolean;
	hasPermission: boolean;
	handleScannerClose: () => void;
	handleAskCameraPermission: () => void;
	closeOnSuccessfulScan?: boolean;
	actionButtonIcon?: JSX.Element;
	actionButtonAction?: () => void;
	paperStyle?: React.CSSProperties;
	containerStyle?: React.CSSProperties;
	videoStyle?: React.CSSProperties;
	scannerProps?: React.ComponentProps<typeof QrScanner>;
}

const ScannerPaperComponent = (props: ScannerPaperComponentProps) => {
	const {
		name,
		isLoaded,
		hasPermission,
		closeOnSuccessfulScan,
		actionButtonIcon,
		handleScannerClose,
		actionButtonAction,
		handleAskCameraPermission,
	} = props;

	const [scannerResult, setScannerResult] = useState<string | undefined>();
	const [errorMessage, setErrorMessage] = useState<string | undefined>();

	const formikContext = useFormikContext();

	const handleSuccessfulScan = async (result: string) => {
		setScannerResult(result);
		formikContext.setFieldTouched(name, true);
		formikContext.setFieldValue(name, result);
		formikContext.setFieldError(name, undefined);
		formikContext.validateField(name);
		if (closeOnSuccessfulScan) {
			setTimeout(() => {
				handleScannerClose();
			}, 1000);
		}
	};

	const handleScanError = (error: Error) => {
		setErrorMessage(error.message);
		formikContext.setFieldError(name, errorMessage);
		formikContext.setFieldTouched(name, true);
	};

	return (
		<Paper
			className="scanner-paper"
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-end",
				boxShadow: "none",
				...props.paperStyle,
			}}
		>
			<IconButton
				onClick={actionButtonAction ? actionButtonAction : handleScannerClose}
				style={{
					margin: "6px",
				}}
			>
				{actionButtonIcon ? (
					actionButtonIcon
				) : (
					<CloseRoundedIcon
						style={{
							height: "30px",
							width: "30px",
						}}
					/>
				)}
			</IconButton>
			{!isLoaded && <CircularProgress />}
			{isLoaded && hasPermission && (
				<QrScanner
					constraints={{
						sampleRate: 5,
						frameRate: 5,
					}}
					containerStyle={{
						width: "calc(100% - 192px)",
						padding: "50%",
						boxSizing: "border-box",
						...props.containerStyle,
					}}
					videoStyle={{
						width: "100%",
						...props.videoStyle,
					}}
					onDecode={(result) => {
						if (scannerResult !== result) {
							handleSuccessfulScan(result);
						}
					}}
					onError={(error) => {
						if (errorMessage !== error.message) {
							handleScanError(error);
						}
					}}
					onResult={(result) => {
						if (result && scannerResult !== result.getText()) {
							handleSuccessfulScan(result.getText());
						}
					}}
					scanDelay={400}
					{...props.scannerProps}
				/>
			)}
			{isLoaded && !hasPermission && (
				<PermissionNotice
					handleAskCameraPermission={handleAskCameraPermission}
				/>
			)}
		</Paper>
	);
};

export default ScannerPaperComponent;
