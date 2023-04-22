import common from "@redux/common";
import { useAppSelector } from "@redux/store/hooks";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./AppRouter.css";
import Header from "./components/common/Header";
import SubHeader from "./components/common/SubHeader";
import routes from "./constants/routes";
import RouteItem from "./models/routes/RouteItem";

function App() {
	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);
	useEffect(() => {
		common.getStatus();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		common.getStatus();
		console.log(isLoggedIn);
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
			<SubHeader />
			<Routes>
				{[...routes[0].items, ...routes[1].items].map((route: RouteItem) => (
					<Route key={route.key} path={route.path} element={route.element} />
				))}
			</Routes>
		</div>
	);
}

export default App;
