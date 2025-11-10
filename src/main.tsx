import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./Context/ThemeContext"; 
import { BrowserRouter } from "react-router-dom";

import AutoRoutes from "App/AutoRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "Styles/theme.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AutoRoutes />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
