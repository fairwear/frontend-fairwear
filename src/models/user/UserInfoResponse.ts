interface UserInfoResponse {
	userId: number;
	username: string;
	email: string;
	isAdmin: boolean;
	isLoggedIn: boolean;
}

export default UserInfoResponse;