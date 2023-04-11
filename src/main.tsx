import React from "react";
import ReactDOM from "react-dom/client";
import App from "./AppRouter";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import AppTheme from "./AppTheme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={AppTheme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
);
