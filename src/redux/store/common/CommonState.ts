import UserInfoResponse from "@models/user/UserInfoResponse";

interface CommonState {
	isLoggedIn?: boolean;
	userInfo?: UserInfoResponse;
}

export default CommonState;
