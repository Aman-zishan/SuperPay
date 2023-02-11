import App from "../App";
import UserDashboard from "../pages/User";
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
    path: "/user/:userId",
    element: <UserDashboard />,
  },
];

export default routerConfig;
