import { AlertValue } from "@redux/store/alert/AlertState";
import { IError } from "@services/axiosInterceptors";
import { AxiosError } from "axios";

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

	mapAxiosErrorToIError: (error: AxiosError) => {
		let errorData = error.response?.data as any;
		if (errorData) {
			let errorArray = errorData.message.toString().split(":");
			let message = errorArray[errorArray.length - 1];
			let iError: IError = {
				code: errorData.statusCode,
				message: message,
			};
			console.log(iError);
			let newAlert = AlertUtils.createNewAlert(
				true,
				message,
				"error",
				"banner"
			);
			return newAlert;
		}
	},
};

export default AlertUtils;
