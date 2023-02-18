const Navbar = () => {
  return (
    <nav className="border-gray-200 bg-white px-2 py-2.5 dark:bg-[#111213] sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <a href="" className="flex items-center">
          <h5 className="body-font font-monda text-2xl tracking-[0.5rem] text-white ">
            SUPERPAY
          </h5>
        </a>
        <div className="flex items-center md:order-2">
          <button
            type="button"
            className="mr-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
            id="user-menu-button"
            aria-expanded="true"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src="/icons/user.svg"
              alt="user photo"
            />
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            className="z-50 my-4 hidden list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              <span className="block truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                name@flowbite.com
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="hidden w-full items-center justify-between md:order-1 md:mx-24 md:ml-auto md:flex md:w-auto"
          id="mobile-menu-2"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-[#111213]">
            <li>
              <a
                href="#"
                className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
              >
                About Us
              </a>
            </li>
            <div
              id="mega-menu"
              className="hidden w-full items-center justify-between text-sm md:order-1 md:flex md:w-auto"
            >
              <ul className="mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:space-x-8">
                <li>
                  <button
                    id="mega-menu-dropdown-button"
                    data-dropdown-toggle="mega-menu-dropdown"
                    className="flex  w-full items-center justify-between overscroll-y-auto border-b border-gray-100 py-2 pl-3 pr-4 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-600 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  >
                    Company{" "}
                    <svg
                      aria-hidden="true"
                      className="ml-1 mt-1 h-5 w-5 md:h-4 md:w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <div
                    id="mega-menu-dropdown"
                    className="absolute z-10 hidden max-h-[330px] w-auto grid-cols-2 overflow-y-scroll rounded-lg border border-gray-100 bg-white text-sm shadow-md dark:border-gray-700 dark:bg-gray-700 md:grid-cols-3"
                  >
                    <div className="p-4 pb-0 text-gray-900 dark:text-white md:pb-4">
                      <ul
                        className="space-y-4"
                        aria-labelledby="mega-menu-dropdown-button"
                      >
                        <li className="border-b-[1px] border-solid border-gray-400 pb-4">
                          <div className="format max-w-[300px] dark:format-invert">
                            <h3 className="mb-0">Subscription started!</h3>
                            <p>
                              A new Subscription to 0x..39 has been started!
                            </p>
                          </div>
                        </li>
                        <li className="border-b-[1px] border-solid border-gray-400 pb-4">
                          <div className="format max-w-[300px] dark:format-invert">
                            <h3 className="mb-0">Subscription started!</h3>
                            <p>
                              A new Subscription to 0x..39 has been started!
                            </p>
                          </div>
                        </li>
                        <li className="border-b-[1px] border-solid border-gray-400 pb-4">
                          <div className="format max-w-[300px] dark:format-invert">
                            <h3 className="mb-0">Subscription started!</h3>
                            <p>
                              A new Subscription to 0x..39 has been started!
                            </p>
                          </div>
                        </li>
                        <li className="border-b-[1px] border-solid border-gray-400 pb-4">
                          <div className="format max-w-[300px] dark:format-invert">
                            <h3 className="mb-0">Subscription started!</h3>
                            <p>
                              A new Subscription to 0x..39 has been started!
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
