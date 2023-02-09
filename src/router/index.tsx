import App from "../App";
import Test from "../pages/Test";
import VendorDashboard from "../pages/Vendor";

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
];

export default routerConfig;
