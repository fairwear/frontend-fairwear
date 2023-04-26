import { ThemeProvider } from "@emotion/react";
import { store } from "./redux/store/rootReducer";
import setupAxiosInterceptors from "./services/axiosInterceptors";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./AppRouter";
import AppTheme from "./AppTheme";
import "./index.css";

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
