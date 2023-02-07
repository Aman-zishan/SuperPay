import AddServiceCard from "../components/AddServiceCard";
import Navbar from "../components/Navbar";
import ServicesCard from "../components/ServicesCard";

const VendorDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="format m-auto mt-8 dark:format-invert">
        <h1>Google Inc.</h1>
      </div>
      <section className="max-w-full px-16 py-8 pt-16">
        <div className="format dark:format-invert">
          <h2 className="text-left text-3xl">Services</h2>
        </div>
        <div className="mt-14 grid grid-cols-3 justify-between gap-24 px-16">
          {[...Array(5).keys()].map((_, idx) => {
            return <ServicesCard key={idx} />;
          })}
          <AddServiceCard />
        </div>
      </section>
    </>
  );
};

export default VendorDashboard;
