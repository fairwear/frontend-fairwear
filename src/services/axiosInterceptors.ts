import alerts from "@redux/alerts";
import AlertUtils from "@utils/AlertUtils";
import axios, { AxiosError } from "axios";

/**
 * It intercepts all requests  responses from the axios library and if there's an error, it
 * dispatches an alert action to the Redux store
 * @param {any} store - any - this is the Redux store that we'll use to dispatch actions.
 */
const setupAxiosInterceptors = () => {
	const handleResponseError = async (error: AxiosError) => {
		if (error.response?.status === 401 || error.response?.status === 403) {
			// If forbidden or unauthorized, then move user to login page
			if (window.location.pathname !== "/") {
				// window.location.assign("/");
			}
		} else {
			let newAlert = AlertUtils.mapAxiosErrorToIError(error);
			if (newAlert) {
				alerts.addAlert(newAlert);
			}
		}
		return await Promise.reject(error.message);
	};

	const handleRequestError = async (error: AxiosError) => {
		console.log(error);

		return await Promise.reject(error.message);
	};

	/* It's intercepting all responses and if there's an error, it calls the handleResponseError function. */
	axios.interceptors.response.use(
		(response) => response.data,
		handleResponseError
	);
	axios.interceptors.request.use(async (config) => {
		const token = localStorage.getItem("token");
		if (token) {
			if (config.headers) {
				axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
				axios.defaults.headers.common.Authorization = `Bearer ${token}`;
				config.headers["Authorization"] = `Bearer ${token}`;
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		await Promise.resolve(config);
		return config;
	}, handleRequestError);
};

export default setupAxiosInterceptors;

export interface IError {
	message: string;
	code: number;
}
