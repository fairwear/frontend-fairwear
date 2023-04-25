import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { alertSlice } from "./alertSlice";
import { AlertValue } from "./AlertState";

const alertActions = alertSlice.actions;
export const addAlert =
	(newAlert: AlertValue): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch) => {
		return dispatch(alertActions.addAlert(newAlert));
	};

export const removeAlert =
	(
		alertToRemove: AlertValue
	): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch) => {
		dispatch(alertActions.removeAlert(alertToRemove));
	};
export const hideAlert =
	(alertToHide: AlertValue): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch) => {
		dispatch(alertActions.hideAlert(alertToHide));
	};
export const clearAllAlerts =
	(): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
		dispatch(alertActions.clearAllAlerts());
	};

export default alertActions;
