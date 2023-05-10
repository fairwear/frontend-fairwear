import AuthAPI from "@api/AuthAPI";
import UserAPI from "@api/UserInfoAPI";
import commonSlice from "@redux/store/common/commonSlice";
import { RootState } from "@redux/store/rootReducer";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";

const commonActions = commonSlice.actions;

const getStatus =
	(): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
		let status = await AuthAPI.getStatus();
		if (status.isLoggedIn) {
			let response = await AuthAPI.getProfile();
			dispatch(commonActions.setStatus(status));
			console.log(response);
			dispatch(commonActions.setUserInfo({ userInfo: response }));
		} else {
			dispatch(commonActions.setStatus(status));
		}
	};

const setUserInfo =
	(userId: number): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch) => {
		let response = await UserAPI.getUserInfo(userId);
		dispatch(commonActions.setStatus({ ...response }));
	};

const handleLogin =
	(isLoggedIn: boolean): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch) => {
		dispatch(commonActions.handleLogin(isLoggedIn));
	};

export { getStatus, setUserInfo, handleLogin };
