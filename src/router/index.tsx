import App from "../App";
import UserDashboard from "../pages/User";
import PaymentPage from "../pages/PaymentPage";
import Test from "../pages/Test";
import VendorDashboard from "../pages/Vendor";
import Register from "../pages/register";
import ServicePage from "../pages/manageService";

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
  { path: "/service/:serviceId", element: <ServicePage /> },
  { path: "/vendor/:vendorId", element: <VendorDashboard /> },
];

export default routerConfig;
