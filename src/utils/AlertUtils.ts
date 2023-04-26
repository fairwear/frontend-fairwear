import { AlertValue } from "@redux/store/alert/AlertState";

const AlertUtils = {
	createNewAlert: (
		isOpen: boolean,
		message: string,
		alertSeverity: "success" | "info" | "warning" | "error",
		alertType: "banner" | "toast" = "banner",
		actionTitle?: string,
		alertAction?: () => void
	) => {
		let newAlert: AlertValue = {
			isOpen: isOpen,
			message: message,
			alertSeverity: alertSeverity,
			alertType: alertType,
			actionTitle: actionTitle,
			alertAction: alertAction,
		};
		return newAlert;
	},
};

export default AlertUtils;
