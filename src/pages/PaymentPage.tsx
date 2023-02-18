import { useContext } from "react";
import globalContext from "../utils/globalState";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { startFlow, updateFlow } from "../utils/superfluidFunctions";
import { ethers } from "ethers";

const PaymentPage = () => {
  const [walletConnected, setwalletConnected] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const { serviceId } = useParams();
  const [serviceData, setserviceData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const { data: serviceData } = await supabase
        .from("service")
        .select()
        .eq("id", serviceId);
      setserviceData(serviceData);
    };

    fetchData().catch(console.error);
  }, []);
  if (!serviceData) {
    return <h2>Something went wrong</h2>;
  }

  const sf = useContext(globalContext);

  const startSubscription = () => {
    const wallet = new ethers.Wallet(
      "10a18b5294170edec5f8de73bc2650e8d0c112742275e0c5f229461340e67a28",
      ethers.getDefaultProvider(
        "https://intensive-wispy-rain.matic-testnet.discover.quiknode.pro/949bfe065d64157bb216deed0b3148aa1ca4effd/"
      )
    );
    const sender = "0x0c49FFE688435dD45F3Bc47Ad9D8B0BfBc7Bad11";
    const receiverContract = "0x76EdA1C989fF33fcbdff574afb925c82dbCc1a90";
    const vendorAddress = "0x40d77E65c59710260543c4Bd6e59704F28637D4B";
    const flowRate = "2500000000000000";
    const abi = new ethers.utils.AbiCoder();

    const userData = abi.encode(
      ["address", "int96"],
      [vendorAddress, flowRate]
    );

    startFlow(sf, sender, receiverContract, flowRate, wallet, userData).then(
      () => {
        setPaymentDone(true);
        console.log("p done");
      }
    );
  };

  const removeService = () => {
    const wallet = new ethers.Wallet(
      "10a18b5294170edec5f8de73bc2650e8d0c112742275e0c5f229461340e67a28",
      ethers.getDefaultProvider(
        "https://intensive-wispy-rain.matic-testnet.discover.quiknode.pro/949bfe065d64157bb216deed0b3148aa1ca4effd/"
      )
    );
    const sender = "0x0c49FFE688435dD45F3Bc47Ad9D8B0BfBc7Bad11";
    const receiverContract = "0x76EdA1C989fF33fcbdff574afb925c82dbCc1a90";
    const vendorAddress = "0x40d77E65c59710260543c4Bd6e59704F28637D4B";
    const flowRate = "1";
    const abi = new ethers.utils.AbiCoder();

    const userData = abi.encode(
      ["address", "int96", "string"],
      [vendorAddress, flowRate, "removeService"]
    );

    updateFlow(sf, sender, receiverContract, flowRate, wallet, userData).then(
      () => {
        setPaymentDone(true);
        console.log("p done");
      }
    );
  };

  return (
    <>
      <header className="format m-auto my-[3rem] dark:format-invert">
        <h1>{serviceData[0].name ? serviceData[0].name : ""}</h1>
      </header>
      <img
        className="m-auto max-w-[21rem] rounded-t-lg"
        src="https://flowbite.com/docs/images/blog/image-1.jpg"
        alt=""
      />
      <div className="format m-auto my-12 dark:format-invert">
        <p className="m-auto mb-12 max-w-[23rem]">Zomato gold service</p>
        <div className="flex flex-col gap-1">
          <h4>Service Name : {serviceData[0].name}</h4>
          <h4>Rate : {serviceData[0].rate}</h4>
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
