import App from "../App";
import UserDashboard from "../pages/User";
import PaymentPage from "../pages/PaymentPage";
import Test from "../pages/Test";
import VendorDashboard from "../pages/Vendor";
import ServicePage from "../pages/manageService";
import Register from "../pages/register";

const routerConfig = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/vendor",
    element: <VendorDashboard />,
  },
  {
    path: "/user/:userId",
    element: <UserDashboard />,
  },
  {
    path: "/pay/:serviceId",
    element: <PaymentPage />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  { path: "/vendor/:serviceId", element: <ServicePage /> },
];

export default routerConfig;
