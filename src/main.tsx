import React from "react";
import ReactDOM from "react-dom/client";
import App from "./AppRouter";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import AppTheme from "./AppTheme";
import setupAxiosInterceptors from "@services/axiosInterceptors";
import { Provider } from "react-redux";
import { store } from "@redux/store/rootReducer";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

setupAxiosInterceptors();

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<ThemeProvider theme={AppTheme}>
				<App />
			</ThemeProvider>
		</Provider>
	</BrowserRouter>
);
