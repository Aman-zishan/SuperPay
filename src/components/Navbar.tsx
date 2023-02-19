import { useAuth } from "@arcana/auth-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { arcanaProvider } from "../utils/auth";
import { getNotification } from "../utils/notificationservices";

const Navbar = ({ notifications }: any) => {
  const [showNotification, setshowNotification] = useState(false);
  const auth = useAuth();
  const { isLoggedIn, logout } = auth;
  console.log(notifications);

  return (
    <nav className="border-gray-200 bg-white px-2 py-2.5 dark:bg-[#111213] sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <a href="" className="flex items-center gap-5">
          <img src="/icons/logo.png" className="h-12 w-12" />{" "}
          <h5 className="body-font font-monda text-2xl tracking-[0.5rem] text-white ">
            SUPERPAY
          </h5>
        </a>
        {isLoggedIn && (
          <>
            <div className="flex items-center md:order-2">
              <button
                type="button"
                className=" rounded-[10px] bg-[#26D537] py-[8px] px-[50px] font-monda font-bold uppercase text-white"
                onClick={() => {
                  logout();
                }}
              >
                logout
              </button>
              {/* <!-- Dropdown menu --> */}
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
                <div
                  id="mega-menu"
                  className="hidden w-full items-center justify-between text-sm md:order-1 md:flex md:w-auto"
                >
                  <ul className="mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:space-x-8">
                    <li className="relative">
                      <button
                        onClick={() => {
                          setshowNotification(!showNotification),
                            console.log("gg");
                        }}
                        className="flex  w-full items-center justify-between overscroll-y-auto border-b border-gray-100 py-2 pl-3 pr-4 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-600 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                      >
                        Notifications{" "}
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
                        style={{
                          display: `${showNotification ? "block" : "none"}`,
                        }}
                        className="absolute top-[35px] left-1/2 z-10 max-h-[330px] w-[327px] -translate-x-1/2  grid-cols-2 overflow-y-scroll rounded-lg border border-gray-100 bg-white text-sm shadow-md dark:border-gray-700 dark:bg-gray-700 md:grid-cols-3"
                      >
                        <div className="p-4 pb-0 text-gray-900 dark:text-white md:pb-4">
                          <ul
                            className="space-y-4"
                            aria-labelledby="mega-menu-dropdown-button"
                          >
                            {notifications ? (
                              notifications.map((notification: any) => {
                                return (
                                  <li className="border-b-[1px] border-solid border-gray-400 pb-4">
                                    <div className="format max-w-[300px] dark:format-invert">
                                      <h3 className="mb-0">
                                        {notification.title}
                                      </h3>
                                      <p>{notification.message}</p>
                                    </div>
                                  </li>
                                );
                              })
                            ) : (
                              <li className="border-b-[1px] border-solid border-gray-400 pb-4">
                                <div className="format max-w-[300px] dark:format-invert">
                                  <h3 className="mb-0">no notifications</h3>
                                </div>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
