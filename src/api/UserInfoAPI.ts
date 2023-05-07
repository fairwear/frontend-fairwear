import apiEndpoints from "@constants/apiEndpoints";
import UserInfoResponse from "@models/user/UserInfoResponse";
import axios from "axios";

const baseUrl = apiEndpoints.user;

const UserAPI = {
	getUserInfo: (userId: number): Promise<UserInfoResponse> =>
		axios.get(`${baseUrl}/${userId}`),
	existsByUsername: (username: string): Promise<boolean> =>
		axios.get(`${baseUrl}/exist/${username}`),
	existsByEmail: (email: string): Promise<boolean> =>
		axios.get(`${baseUrl}/exist/${email}`),
	findByUsername: (username: string): Promise<UserInfoResponse> =>
		axios.get(`${baseUrl}/username/${username}`),
	findByEmail: (email: string): Promise<UserInfoResponse> =>
		axios.get(`${baseUrl}/email/${email}`),
	
};
export default UserAPI;
