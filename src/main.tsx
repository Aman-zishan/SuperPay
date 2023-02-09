import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routerConfig from "./router";
import "./index.css";
import { connector } from "./utils/auth";
import { polygon, polygonMumbai } from "@wagmi/core/chains";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const router = createBrowserRouter(routerConfig);

const { chains, provider } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider()]
);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: connector(chains),
  provider,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RouterProvider router={router} />
    </WagmiConfig>
  </React.StrictMode>
);
