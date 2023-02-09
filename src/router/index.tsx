import App from "../App";
import Test from "../pages/Test";
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
  {
    path: "/test",
    element: <Test />,
  },
  { path: "/vendor/:serviceId", element: <ServicePage /> },
];

export default routerConfig;
