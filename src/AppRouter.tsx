import AlertComponent from "@components/alert/AlertComponent";
import common from "@redux/common";
import { useAppSelector } from "@redux/store/hooks";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./AppRouter.css";
import Header from "./components/common/Header";
import routes from "./constants/routes";
import RouteItem from "./models/routes/RouteItem";
import Footer from "@components/common/Footer";

function App() {
	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);
	const appAlerts = useAppSelector((state) => state.alerts.alerts);
	useEffect(() => {
		common.getStatus();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		common.getStatus();
	}, [isLoggedIn]);

	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				height: "100%",
				flexDirection: "column",
			}}
			className="App"
		>
			<Header />
			<>
				{appAlerts.length > 0 && (
					<>
						{appAlerts.map((alertValue) => (
							<AlertComponent
								key={alertValue.message}
								alertValue={alertValue}
							/>
						))}
					</>
				)}
			</>
			<Routes>
				{[...routes[0].items, ...routes[1].items].map((route: RouteItem) => (
					<Route key={route.key} path={route.path} element={route.element} />
				))}
			</Routes>
			<Footer/>
		</div>
	);
}

export default App;
