import classnames from "classnames";

const AddServiceCard = ({ className = "" }) => {
  return (
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
          {[...Array(2).keys()].map(() => (
            <div className="mb-2.5 h-[0.6rem] max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
          ))}
        </div>
        <a
          href="#"
          className="my-3 mt-[1.4rem] inline-block rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
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
        </a>
      </div>
    </div>
  );
};

export default AddServiceCard;
// d="M12 4.5v15m7.5-7.5h-15"
