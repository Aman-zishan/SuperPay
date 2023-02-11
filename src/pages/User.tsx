import Navbar from "../components/Navbar";
import UserSubscriptions from "../components/UserSubscriptions";

const UserDashboard = () => {
  return (
    <>
      <Navbar />
      <header className="format my-12 flex flex-col px-12 text-left dark:format-invert">
        <h2 className="mb-[0.588889em]">mikeLord007</h2>
        <p>0x921717352D4094e5F89d87273Eb5213F23DBEdAB</p>
      </header>
      <UserSubscriptions className="mt-16" />
    </>
  );
};

export default UserDashboard;
