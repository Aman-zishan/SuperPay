import React from "react";
import ReactDOM from "react-dom/client";
import { ProvideAuth } from "@arcana/auth-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routerConfig from "./router";
import "./index.css";
import { arcanaProvider } from "./utils/auth";

const router = createBrowserRouter(routerConfig);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
     <ProvideAuth provider={arcanaProvider}>
      <RouterProvider router={router} />
   </ProvideAuth>
  </React.StrictMode>
);
