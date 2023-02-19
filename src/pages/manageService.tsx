import ServicesCard from "../components/ServicesCard";
import Layout from "../layout";
import ServiceUsers from "../components/ServiceUsers";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { user } from "@pushprotocol/restapi";

const ServicePage = () => {
  const { serviceId } = useParams();
  const [serviceData, setserviceData] = useState<any>();
  const [serviceCustomers, setserviceCustomers] = useState<any>();
  console.log(serviceId);
  useEffect(() => {
    const fetchData = async () => {
      const { data: service_data } = await supabase
        .from("service")
        .select()
        .eq("id", serviceId);
      console.log(service_data);
      const { data: customerIds } = await supabase
        .from("service")
        .select("vendorCustomerIds")
        .eq("id", serviceId);
      console.log(customerIds);
      const { data: users } = await supabase
        .from("vendor_customer")
        .select()
        .in("address", customerIds![0].vendorCustomerIds);
      console.log(users);
      setserviceCustomers(users);

      setserviceData(service_data);
    };

    fetchData().catch(console.error);
  }, []);
  if (!serviceData) {
    return <h2 className="text-white">loading..</h2>;
  }
  return (
    <>
      <Layout>
        <div className="format m-auto mt-8 dark:format-invert">
          <h1>{serviceData[0].vendor_name}</h1>
        </div>

        <div className="pl-16 pt-16">
          <a
            href="#"
            className=" flex h-[270px] cursor-default flex-col items-center rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-[#111213] md:max-w-[50rem] md:flex-row"
          >
            <div className="p-8">
              <img
                className="h-96 rounded-t-lg object-cover md:h-auto md:w-[26rem] md:rounded-sm "
                src="https://flowbite.com/docs/images/blog/image-1.jpg"
                alt=""
              />
            </div>
            <div className="flex h-full flex-col p-4 py-8 leading-normal">
              <h5 className="mb-2 text-left text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {serviceData[0].name}
              </h5>
              <p className="mb-3 text-left font-normal text-gray-700 dark:text-gray-400">
                Youtube premium provides the best music quality and hi
                resolution sounds.
              </p>
              <div className="mt-auto ml-auto flex gap-6">
                <button
                  type="button"
                  className="mr-2 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300
                  dark:bg-[#26D537] dark:hover:bg-[#29a935] dark:focus:ring-blue-800"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    className="mr-2 -ml-1 h-5 w-5"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    ></path>
                  </svg>
                  Edit
                </button>
                <button
                  type="button"
                  className="mr-2 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-[#D52626] dark:hover:bg-[#a11a1a] dark:focus:ring-blue-800"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    className="mr-2 -ml-1 h-5 w-5"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    ></path>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </a>
        </div>

        <section className="max-w-full px-16 pt-32 pb-10">
          <button
            type="button"
            className="ml-auto flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300
                  dark:bg-[#26D537] dark:hover:bg-[#29a935] dark:focus:ring-blue-800"
          >
            Send Notifications
            <svg
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              className="ml-2 -mr-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              ></path>
            </svg>
          </button>
          <div className="format mt-12 dark:format-invert">
            <h2 className="text-left text-3xl">Service Users</h2>
          </div>
          <ServiceUsers users={serviceCustomers} />
        </section>
      </Layout>
    </>
  );
};

export default ServicePage;
