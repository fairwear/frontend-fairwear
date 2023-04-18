import { Route, Routes } from "react-router-dom";
import "./AppRouter.css";
import routes from "./constants/routes";
import RouteItem from "./models/routes/RouteItem";
import Header from "./components/common/Header";
import SubHeader from "./components/common/SubHeader";

function App() {
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
