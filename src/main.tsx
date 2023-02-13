import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Framework } from "@superfluid-finance/sdk-core";
import DefaultContext from "./utils/globalState";
import { ethers } from "ethers";
import { ProvideAuth } from "@arcana/auth-react";
import routerConfig from "./router";
import { arcanaProvider } from "./utils/auth";
import "./index.css";

const router = createBrowserRouter(routerConfig);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProvideAuth provider={arcanaProvider}>
      <RouterProvider router={router} />
    </ProvideAuth>
  </React.StrictMode>
);
