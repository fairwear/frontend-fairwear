import apiEndpoints from "@constants/apiEndpoints";
import LoginRequest from "@models/auth/LoginRequest";
import SignUpRequest from "@models/auth/SignUpRequest";
import StatusResponse from "@models/auth/StatusResponse";
import axios from "axios";

const baseUrl = apiEndpoints.auth;
const uninterceptedAxios = axios.create({});

const AuthAPI = {
	login: async (request: LoginRequest) => {
		let res = await uninterceptedAxios.post(`${baseUrl}/login`, request);
		let token = res.data.accessToken;

		if (token) {
			localStorage.setItem("token", token);
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
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

	logout: async (): Promise<StatusResponse> => {
		await axios.post(`${baseUrl}/logout`);
		localStorage.removeItem("token");
		axios.defaults.headers.common["Authorization"] = "";
		return axios.get(`${baseUrl}/status`);
	},

	getStatus: (): Promise<StatusResponse> => axios.get(`${baseUrl}/status`),

	getProfile: (): Promise<any> => axios.get(`${baseUrl}/profile`),
};

export default AuthAPI;
