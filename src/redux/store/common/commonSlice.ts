import CommonState from "./CommonState";
import { createSlice } from "@reduxjs/toolkit";

export const initialState: CommonState = {
	isLoggedIn: undefined,
	userInfo: undefined,
};

export const commonSlice = createSlice({
	name: "common",
	initialState: initialState,
	reducers: {
		setStatus(state, action) {
			state.isLoggedIn = action.payload.isLoggedIn;
		},
		setUserInfo(state, action) {
			state.userInfo = action.payload.userInfo;
		},

		handleLogin(state, action) {
			state.isLoggedIn = action.payload.isLoggedIn;
		},
	},
});

export const { setStatus, setUserInfo, handleLogin } = commonSlice.actions;
// export default commonSlice.reducer;
export default commonSlice;
