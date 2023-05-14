import { AlertValue } from "@redux/store/alert/AlertState";
import { IError } from "@services/axiosInterceptors";
import { AxiosError, AxiosResponse } from "axios";

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
		let errorArray = (error.response?.data as any).toString().split("[");
		console.log(errorArray);
		let iError: IError = {
			message: error.response?.data.message || error.message,
			
		}
		let newAlert = AlertUtils.createNewAlert(
			true,
			errorData.message,
			"error",
			"toast"
		);
		return newAlert;
	}
};

export default AlertUtils;
