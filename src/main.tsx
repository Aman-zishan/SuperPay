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

// const sf = await Framework.create({
//   chainId: 80001,
//   provider: new ethers.providers.Web3Provider(arcanaProvider.provider),
// });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProvideAuth provider={arcanaProvider}>
      {/* <DefaultContext.Provider value={sf}>
      </DefaultContext.Provider> */}
      <RouterProvider router={router} />
    </ProvideAuth>
  </React.StrictMode>
);
