import PermissionsIcon from "@assets/svg/undraw_authentication.svg";
import { Button, Typography } from "@mui/material";

interface PermissionNoticeProps {
	handleAskCameraPermission: () => void;
	handlePermissionError?: (error: Error) => void;
}

const PermissionNotice = (props: PermissionNoticeProps) => {
	const { handleAskCameraPermission } = props;

	return (
		<div className="permission-notice-container">
			<div className="permission-notice">
				<img src={PermissionsIcon} />
				<Typography variant="h3">
					Please allow camera access to be able to scan barcodes.
				</Typography>
				<Button variant="outlined" onClick={handleAskCameraPermission}>
					Allow Camera Access
				</Button>
			</div>
		</div>
	);
};

export default PermissionNotice;
