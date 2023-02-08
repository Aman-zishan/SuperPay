import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Framework } from "@superfluid-finance/sdk-core";
import DefaultContext from "./utils/globalState";
import { ProvideAuth } from "@arcana/auth-react";
import routerConfig from "./router";
import { arcanaProvider } from "./utils/auth";
import "./index.css";

const router = createBrowserRouter(routerConfig);

const sf = await Framework.create({
  chainId: 137,
  provider: arcanaProvider,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProvideAuth provider={arcanaProvider}>
      <DefaultContext.Provider value={sf}>
        <RouterProvider router={router} />
      </DefaultContext.Provider>
    </ProvideAuth>
  </React.StrictMode>
);
