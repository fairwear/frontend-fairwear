import { createSlice } from "@reduxjs/toolkit";
import AlertState, { AlertValue } from "./AlertState";
import AlertUtils from "src/utils/AlertUtils";

export const initialState: AlertState = {
	alerts: [],
};

export const alertSlice = createSlice({
	name: "alert",
	initialState: initialState,
	reducers: {
		addAlert(state, action) {
			let newAlert = AlertUtils.createNewAlert(
				true,
				action.payload.message,
				action.payload.alertSeverity,
				action.payload.alertType,
				action.payload.actionTitle,
				action.payload.alertAction
			);
			let oldAlerts = state.alerts as AlertValue[];

			if (oldAlerts.length === 0) {
				state.alerts = [...state.alerts, newAlert];
				return;
			}
			let alreadyExists = 0;
			oldAlerts.forEach((alert) => {
				if (
					alert.alertType === newAlert.alertType &&
					alert.message === newAlert.message
				) {
					alreadyExists++;
					return;
				}
			});

			if (alreadyExists === 0) {
				state.alerts = [...oldAlerts, newAlert];
			} else {
				state.alerts = oldAlerts;
			}
		},
		removeAlert(state, action) {
			state.alerts = state.alerts.filter(
				(alert) => alert.message !== action.payload.message
			);
		},
		hideAlert(state, action) {
			state.alerts.forEach((alert) => {
				if (
					alert.message === action.payload.message &&
					alert.alertSeverity === action.payload.alertSeverity
				) {
					alert.isOpen = false;
				}
			});
		},
		clearAllAlerts: (state) => {
			state.alerts = [];
		},
	},
});

export const { addAlert, removeAlert, hideAlert, clearAllAlerts } =
	alertSlice.actions;

export default alertSlice.reducer;
