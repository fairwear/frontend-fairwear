export interface AlertValue {
	isOpen: boolean;
	message: string;
	alertSeverity: "success" | "info" | "warning" | "error";
	alertType: "banner" | "toast";
	actionTitle?: string;
	alertAction?: () => void;
	hasCloseButton?: boolean;
}

export interface AlertState {
	alerts: AlertValue[];
}

export default AlertState;
