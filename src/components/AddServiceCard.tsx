import classnames from "classnames";
import { useState } from "react";

const AddServiceCard = ({ className = "" }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className={classnames(
          className,
          "max-w-xs rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
        )}
      >
        <a href="#">
          <div className="flex h-52 w-full items-center justify-center bg-gray-300 dark:bg-gray-700">
            <svg
              className="h-12 w-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
        </a>
        <div className="p-5">
          <div className="m-auto my-[0.7rem] h-[1.325rem] w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mt-[1.4rem]">
            {[...Array(2).keys()].map((num) => (
              <div
                key={num}
                className="mb-2.5 h-[0.6rem] max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"
              ></div>
            ))}
          </div>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="my-3 mt-[1.4rem] inline-block rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            type="button"
          >
            Add a New Service
            <svg
              aria-hidden="true"
              className="relative ml-2 -mr-1 inline-block h-4 w-4 stroke-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                className="absolute inset-0"
                d="M12 4.5v15m7.5-7.5h-15"
                clipRule="evenodd"
                strokeWidth="0.15rem"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* <!-- Main modal --> */}
      <div
        style={{ display: `${showModal ? "block" : "none"}` }}
        className="fixed inset-0 z-50 h-full w-full overflow-y-auto  overflow-x-hidden bg-[#0000004f] p-4"
      >
        <div className="absolute top-1/2 left-1/2 m-auto h-full w-full max-w-md -translate-x-1/2 -translate-y-1/2 md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => setShowModal(false)}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="format px-20 py-12 dark:format-invert lg:px-8">
              <h2 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
                Add a new service
              </h2>
              <form className="space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="text-md mb-2 block font-medium text-gray-900 dark:text-white"
                  >
                    Service Name
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Music Streaming"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-md mb-2 block font-medium text-gray-900 dark:text-white"
                  >
                    Service Rate ( / sec)
                  </label>
                  <input
                    name="password"
                    id="password"
                    placeholder="100"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-md mb-2 block font-medium text-gray-900 dark:text-white"
                  >
                    Image Link
                  </label>
                  <input
                    name="password"
                    id="password"
                    placeholder="https://xyz.com/placeholder.png"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-[3rem] w-[12rem] rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddServiceCard;
// d="M12 4.5v15m7.5-7.5h-15"
