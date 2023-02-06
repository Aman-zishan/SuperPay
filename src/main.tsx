import React from "react";
import ReactDOM from "react-dom/client";
import { ProvideAuth } from "@arcana/auth-react";
import App from "./App";
import "./index.css";
import { arcanaProvider } from "./utils/auth";

// const { provider, webSocketProvider } = configureChains(
//   [polygon, polygonMumbai],
//   [publicProvider()]
// );

// const client = createClient({
//   provider,
//   webSocketProvider,
// });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProvideAuth provider={arcanaProvider}>
      <App />
    </ProvideAuth>
  </React.StrictMode>
);
