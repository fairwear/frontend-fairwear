import apiEndpoints from "@constants/apiEndpoints";
import LoginRequest from "@models/auth/LoginRequest";
import SignUpRequest from "@models/auth/SignUpRequest";
import axios from "axios";

const baseUrl = apiEndpoints.auth;

const AuthAPI = {
	login: async (request: LoginRequest) => {
		let res: {
			accessToken: string;
			refreshToken: string;
		} = await axios.post(`${baseUrl}/login`, request);

		let access_token = res.accessToken;
		console.log(access_token);

		if (access_token) {
			localStorage.setItem("token", access_token);

			axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
		}

		return res;
	},

	signup: async (request: SignUpRequest) => {
		let res: {
			accessToken: string;
			refresh_token: string;
		} = await axios.post(`${baseUrl}/signup`, request);

		let access_token = res.accessToken;
		if (access_token) {
			localStorage.setItem("token", access_token);

			axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
		}

		return res;
	},

	logout: (): Promise<StatusResponse> => {
		axios.post(`${baseUrl}/logout`);
		localStorage.removeItem("token");
		axios.defaults.headers.common["Authorization"] = "";
		return axios.get(`${baseUrl}/status`);
	},

	getStatus: (): Promise<StatusResponse> => axios.get(`${baseUrl}/status`),

	getProfile: (): Promise<any> => axios.get(`${baseUrl}/profile`),
};

export default AuthAPI;
