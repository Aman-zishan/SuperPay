import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddServiceCard from "../components/AddServiceCard";
import ServicesCard from "../components/ServicesCard";
import Layout from "../layout";
import { supabase } from "../utils/supabaseClient";

const VendorDashboard = () => {
  const { vendorId } = useParams();
  const [vendorData, setvendorData] = useState<any>();
  const [vendorServices, setvendorServices] = useState<any>();
  console.log(vendorId);
  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } = await supabase
        .from("vendor")
        .select()
        .eq("address", vendorId);
      const { data: vendorServiceData } = await supabase
        .from("service")
        .select()
        .eq("vendorId", vendorId);
      console.log(userData, vendorServiceData);
      setvendorServices(vendorServiceData);
      setvendorData(userData);
    };

    fetchData().catch(console.error);
  }, []);
  if (!vendorData) {
    return <h2 className="text-white">loading..</h2>;
  }
  return (
    <>
      <Layout>
        <div className="format m-auto mt-8 dark:format-invert">
          <h1>{vendorData[0].name}</h1>
        </div>
        <section className="max-w-full px-16 py-8 pt-16">
          <div className="format dark:format-invert">
            <h2 className="text-left text-3xl">Services</h2>
          </div>
          <div className="mt-14 grid grid-cols-3 justify-between gap-24 px-16">
            {vendorServices.map((item: any) => {
              console.log(item);
              return <ServicesCard service={item} key={item.id} />;
            })}
            <AddServiceCard vendor={vendorData} />
          </div>
        </section>
      </Layout>
    </>
  );
};

export default VendorDashboard;
