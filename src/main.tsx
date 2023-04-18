import React from "react";
import ReactDOM from "react-dom/client";
import App from "./AppRouter";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import AppTheme from "./AppTheme";
import setupAxiosInterceptors from "@services/axiosInterceptors";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

setupAxiosInterceptors();

root.render(
	<BrowserRouter>
		<ThemeProvider theme={AppTheme}>
			<App />
		</ThemeProvider>
	</BrowserRouter>
);
