import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { commonSlice } from "./common/commonSlice";
import alertSlice from "@redux/store/alert/alertSlice";

export const rootReducer = combineReducers({
	common: commonSlice.reducer,
	alerts: alertSlice.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
