import App from "../App";
import PaymentPage from "../pages/PaymentPage";
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
    path: "/pay/:serviceId",
    element: <PaymentPage />,
  },
];

export default routerConfig;
