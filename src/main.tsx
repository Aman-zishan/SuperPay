import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Framework } from "@superfluid-finance/sdk-core";
import DefaultContext from "./utils/globalState";
import { CHAIN } from "@arcana/auth";
import { ethers } from "ethers";
import { ProvideAuth } from "@arcana/auth-react";
import routerConfig from "./router";
import { arcanaProvider } from "./utils/auth";
import "./index.css";

const router = createBrowserRouter(routerConfig);

const sf = await Framework.create({
  chainId: parseInt(CHAIN.POLYGON_MUMBAI_TESTNET, 16),
  provider: ethers.getDefaultProvider(
    "https://intensive-wispy-rain.matic-testnet.discover.quiknode.pro/949bfe065d64157bb216deed0b3148aa1ca4effd/"
  ),
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
