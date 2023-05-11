import {
	addAlert,
	clearAllAlerts,
	hideAlert,
	removeAlert,
} from "./store/alert/alertActions";
import { AlertValue } from "./store/alert/AlertState";
import { store } from "./store/rootReducer";

const alerts = {
	add: (
		message: string,
		severity: "error" | "warning" | "info" | "success",
		actionTitle?: string,
		alertAction?: () => void | React.ReactNode,
		alertType: "banner" | "toast" = "banner"
	): void => {
		let newAlert = {
			isOpen: true,
			message: message,
			alertSeverity: severity,
			alertType: alertType,
			actionTitle: actionTitle,
			alertAction: alertAction,
		} as AlertValue;
		store.dispatch(addAlert(newAlert));
	},
	addAlert: (newAlert: AlertValue): void => {
		store.dispatch(addAlert(newAlert));
	},
	remove: (alertToRemove: AlertValue): void => {
		store.dispatch(removeAlert(alertToRemove));
	},
	hide: (alertToHide: AlertValue): void => {
		store.dispatch(hideAlert(alertToHide));
	},
	clearAll: (): void => {
		store.dispatch(clearAllAlerts());
	},
};

export default alerts;
