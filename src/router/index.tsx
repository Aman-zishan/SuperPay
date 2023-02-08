import App from "../App";
import VendorDashboard from "../pages/Vendor";
import ServicePage from "../pages/manageService";

const routerConfig = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/vendor",
    element: <VendorDashboard />,
  },
  { path: "/vendor/:serviceId", element: <ServicePage /> },
];

export default routerConfig;
