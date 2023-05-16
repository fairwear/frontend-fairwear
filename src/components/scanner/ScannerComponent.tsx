import PermissionNotice from "@components/scanner/PermissionNotice";
import { ErrorRounded, InfoOutlined } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";
import alerts from "@redux/alerts";
import { AlertValue } from "@redux/store/alert/AlertState";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import "./Scanner.css";

interface ScannerComponentProps {
	name: string;
	open: boolean;
	handleScannerOpen: () => void;
	handleScannerClose: () => void;
}

const ScannerComponent = (props: ScannerComponentProps) => {
	const { name, open, handleScannerOpen, handleScannerClose } = props;
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [scannerResult, setScannerResult] = useState<string | undefined>();
	const [errorMessage, setErrorMessage] = useState<string | undefined>();

	useEffect(() => {
		handleAskCameraPermission();
	}, []);

	const formikContext = useFormikContext();

	const handleSuccessfulScan = async (result: string) => {
		setScannerResult(result);
		formikContext.setFieldValue(name, result);

		handleScannerClose;

		// const notFoundAlert: AlertValue = {
		// 	isOpen: true,
		// 	message: "Item with this barcode was not found.",
		// 	alertSeverity: "error",
		// 	alertType: "toast",
		// };
		// alerts.addAlert(notFoundAlert);
	};

	const handlePermissionError = (error: Error) => {
		handleScannerClose();
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
				handleScannerOpen();
			},
			(error) => {
				setIsLoaded(true);
				handlePermissionError(error);
			}
		);
	};

	return (
		<div className="scanner-outer-container">
			{/* <Typography variant="h1">Scan a Barcode</Typography> */}
			<div className="scanner-container">
				{!isLoaded && (
					<CircularProgress
						style={{
							width: "72px",
							height: "72px",
						}}
					/>
				)}
				{isLoaded && open && (
					<QrScanner
						constraints={{
							sampleRate: 5,
							frameRate: 5,
						}}
						tracker={false}
						containerStyle={{
							width: "100%",
							padding: "50% 50%",
						}}
						videoStyle={{
							width: "100%",
						}}
						onDecode={(result) => {
							if (scannerResult !== result) {
								handleSuccessfulScan(result);
							}
						}}
						onError={(error) => {
							if (errorMessage !== error.message) {
								setErrorMessage(error.message);
							}
						}}
						scanDelay={1000}
					/>
				)}
				{isLoaded && !open && (
					<PermissionNotice
						handleAskCameraPermission={handleAskCameraPermission}
					/>
				)}
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
