import React, { useContext } from "react";
import { useAuth } from "@arcana/auth-react";
import globalContext from "../utils/globalState";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { startFlow, updateFlow, getFlow } from "../utils/superfluidFunctions";
import { ethers } from "ethers";

const PaymentPage = () => {
  const [walletConnected, setwalletConnected] = useState(true);
  const [paymentDone, setPaymentDone] = useState(false);
  const { serviceId } = useParams();
  const [serviceData, setserviceData] = useState<any>();
  const [serviceIds, setserviceIds] = useState<any>();
  const [customerIds, setcustomerIds] = useState<any>();
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const { data: serviceData } = await supabase
        .from("service")
        .select()
        .eq("id", serviceId);
      setserviceData(serviceData![0]);
      console.log("serd: ", serviceData![0]);

      const { data: serviceIdsData } = await supabase
        .from("vendor_customer")
        .select("services")
        .eq("address", auth.user?.address);
      const { data: customerIdsData } = await supabase
        .from("service")
        .select("vendorCustomerIds")
        .eq("id", serviceId);

      setserviceIds(serviceIdsData);
      setcustomerIds(customerIdsData);
    };

    fetchData().catch(console.error);
  }, [serviceIds, customerIds]);
  if (!serviceData) {
    return <h2>Something went wrong</h2>;
  }

  function calculateFlowRate(amount) {
    if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
      alert("You can only calculate a flowRate based on a number");
      return;
    } else if (typeof Number(amount) === "number") {
      if (Number(amount) === 0) {
        return 0;
      }
      const amountInWei = ethers.BigNumber.from(amount);
      const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
      const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
      return calculatedFlowRate;
    }
  }

  const sf = useContext(globalContext);

  const updateDatabase = async () => {
    const userAddress = auth.user?.address;
    console.log(userAddress);

    if (serviceIds && customerIds) {
      console.log(customerIds![0].vendorCustomerIds);
      if (
        serviceId! in serviceIds![0].services ||
        userAddress! in customerIds![0].vendorCustomerIds
      ) {
        alert("user already subscribed");
        return;
      }

      //update serviceId list
      serviceIds![0].services.push(parseInt(serviceId!));
      console.log(serviceIds);
      const { data: updateServiceArray } = await supabase
        .from("vendor_customer")
        .update([{ services: serviceIds![0].services }])
        .eq("address", userAddress);

      //update customerId list
      customerIds![0].vendorCustomerIds.push(userAddress);
      console.log(customerIds);
      const { data: updateCustomerArray } = await supabase
        .from("service")
        .update([{ vendorCustomerIds: customerIds![0].vendorCustomerIds }])
        .eq("id", serviceId);
    }
  };
  const startSubscription = async () => {
    const provider = new ethers.providers.Web3Provider(auth.provider);
    const signer = provider.getSigner();
    const sender = auth.user?.address;
    const receiverContract = import.meta.env.VITE_SUPERAPP;
    const vendorAddress = serviceData.vendorId;
    const flowRate = serviceData.rate;
    const abi = new ethers.utils.AbiCoder();

    getFlow(sf!, sender!, receiverContract, signer).then((res) => {
      console.log("res: ", res);
      if (res.flowRate == 0) {
        const userData = abi.encode(
          ["address", "int96"],
          [vendorAddress, flowRate]
        );

        startFlow(
          sf!,
          sender!,
          receiverContract,
          flowRate,
          signer,
          userData
        ).then(() => {
          setPaymentDone(true);
          console.log("p done");
        });
      } else {
        const userData = abi.encode(
          ["address", "int96", "string"],
          [vendorAddress, flowRate, "addService"]
        );

        const updatedFlowRate = Number(flowRate) + res.flowRate; //vendor flow rate + current flow rate
        updateFlow(
          sf!,
          sender!,
          receiverContract,
          updatedFlowRate,
          signer,
          userData
        );
      }
    });
    updateDatabase();
  };

  return (
    <>
      <header className="format m-auto my-[3rem] dark:format-invert">
        <h1>{serviceData.name ? serviceData.name : ""}</h1>
      </header>
      <img
        className="m-auto h-[13rem] w-[20rem] rounded-t-lg"
        src={serviceData.image}
        alt=""
      />
      <div className="format m-auto my-12 dark:format-invert">
        <p className="m-auto mb-12 max-w-[23rem]">Zomato gold service</p>
        <div className="flex flex-col gap-1">
          <h4>Service Name : {serviceData.name}</h4>
          <h4>Rate : {calculateFlowRate(serviceData.rate)} SP/month</h4>
          <h4>Plan : 12 months</h4>
        </div>
      </div>
      <button
        type="button"
        className={classNames(
          "inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300",
          walletConnected ? "bg-green-500 hover:bg-green-700" : "bg-blue-700"
        )}
        onClick={() => startSubscription()}
      >
        {walletConnected ? "Subscribe To Plan" : "Connect Wallet"}
        {walletConnected ? (
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        )}
      </button>
    </>
  );
};

export default PaymentPage;
