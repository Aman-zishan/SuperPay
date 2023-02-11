import classNames from "classnames";
import { useState } from "react";

const PaymentPage = () => {
  const [walletConnected, setwalletConnected] = useState(false);

  return (
    <>
      <header className="format m-auto my-[3rem] dark:format-invert">
        <h1>SuperPay X Google</h1>
      </header>
      <img
        className="m-auto max-w-[21rem] rounded-t-lg"
        src="https://flowbite.com/docs/images/blog/image-1.jpg"
        alt=""
      />
      <div className="format m-auto my-12 dark:format-invert">
        <p className="m-auto mb-12 max-w-[23rem]">
          Youtube premium provides the best music quality and hi resolution
          sounds.
        </p>
        <div className="flex flex-col gap-1">
          <h4>Service Name: Youtube Premium</h4>
          <h4>Rate: 0.03 USDC/sec</h4>
          <h4>Plan: 12 months</h4>
        </div>
      </div>
      <button
        type="button"
        className={classNames(
          "inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300",
          walletConnected ? "bg-green-500 hover:bg-green-700" : "bg-blue-700"
        )}
        onClick={() => setwalletConnected(true)}
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
