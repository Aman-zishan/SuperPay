import App from "../App";
import VendorDashboard from "../pages/VendorDashboard";

const routerConfig = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/vendor",
    element: <VendorDashboard />,
  },
];

export default routerConfig;
