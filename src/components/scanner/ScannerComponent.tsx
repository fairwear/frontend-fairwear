import PermissionNotice from "@components/scanner/PermissionNotice";
import { ErrorRounded, InfoOutlined } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";
import alerts from "@redux/alerts";
import { AlertValue } from "@redux/store/alert/AlertState";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";
import "./Scanner.css";

interface ScannerComponentProps {}

const ScannerComponent = (props: ScannerComponentProps) => {
	const [scannerOpen, setScannerOpen] = useState<boolean>();
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [scannerResult, setScannerResult] = useState<string | undefined>();
	const [errorMessage, setErrorMessage] = useState<string | undefined>();

	useEffect(() => {
		handleAskCameraPermission();
	}, []);

	const handlePermissionError = (error: Error) => {
		setScannerOpen(false);
		const permissionAlert: AlertValue = {
			isOpen: true,
			message: "Please allow camera access to be able to scan barcodes.",
			alertSeverity: "error",
			alertType: "toast",
		};
		alerts.addAlert(permissionAlert);
		setErrorMessage(error.message);
	};

	const handleAskCameraPermission = () => {
		setIsLoaded(true);
		navigator.mediaDevices.getUserMedia({ video: true }).then(
			(stream) => {
				setTimeout(() => {
					setIsLoaded(true);
				}, 500);
				setScannerOpen(true);
			},
			(error) => {
				setIsLoaded(true);
				handlePermissionError(error);
			}
		);
	};

	return (
		<div className="scanner-outer-container">
			<Typography variant="h1">Scan a Barcode</Typography>
			<div className="scanner-container">
				{!isLoaded && (
					<CircularProgress
						style={{
							width: "72px",
							height: "72px",
						}}
					/>
				)}
				{isLoaded && scannerOpen && (
					<QrScanner
						containerStyle={{
							width: "100%",
							padding: "50% 50%",
						}}
						videoStyle={{
							width: "100%",
						}}
						onDecode={(result) => setScannerResult(result)}
						onError={(error) => setErrorMessage(error.message)}
						scanDelay={500}
					/>
				)}
				{isLoaded && !scannerOpen && (
					<PermissionNotice
						handleAskCameraPermission={handleAskCameraPermission}
					/>
				)}
				T
			</div>
			{errorMessage && (
				<Box className="scanner-error-container">
					<ErrorRounded className="scanner-error-icon" />
					<Typography variant="subtitle1" color="#C62828" align="left">
						{errorMessage}
					</Typography>
				</Box>
			)}
			{scannerResult && (
				<Box className="scanner-result-container">
					<InfoOutlined className="scanner-result-icon" />
					<Typography variant="subtitle1" color="#FFFFFF" align="left">
						{scannerResult}
					</Typography>
				</Box>
			)}
		</div>
	);
};

export default ScannerComponent;
