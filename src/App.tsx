import { useAuth } from "@arcana/auth-react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "./utils/supabaseClient";
import React, { useEffect, useState } from "react";
import { arcanaProvider } from "./utils/auth";
import Register from "./pages/register";
import { ConnectButton } from "./components/ConnectButton";
import Layout from "./layout";

const App = () => {
  const [data, setData] = useState<any>();
  const [userExists, setUserExists] = useState<boolean>(false);
  const [loggedinuser, setloggedinuser] = useState<any>();

  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } = await supabase
        .from("user")
        .select("address,isVendor");
      console.log(userData);
      setData(userData);
    };

    fetchData().catch(console.error);
  }, []);

  const {
    user,
    connect,
    isLoggedIn,
    loading,
    loginWithSocial,
    provider,
    logout,
  } = auth;

  if (isLoggedIn && user) {
    console.log(user, data);
    data.find((item: any) => {
      if (item.address === user?.address) {
        // item.isVendor
        //   ? navigate(`vendor/${item.address}`)
        //   : navigate(`user/${item.address}`);
        setUserExists(true);
        setloggedinuser(item);
      }
    });
    if (userExists) {
      console.log("user exists");
      loggedinuser.isVendor
        ? navigate(`vendor/${loggedinuser.address}`)
        : navigate(`user/${loggedinuser.address}`);
    } else {
      //logout();
      navigate("register");
    }
  }

  return (
    <>
      {loading && !loggedinuser ? (
        <p style={{ color: "white" }}>loading</p>
      ) : (
        <LandingPageTemplate />
      )}
      {/* {loading && <p style={{ color: "white" }}>loading</p>}
      {!loading && !loggedinuser && <LandingPageTemplate />} */}
    </>
  );
};

export default App;

const LandingPageTemplate = () => {
  return (
    <Layout>
      <div className="m-auto">
        {/* <!-- Section: Design Block --> */}
        <section>
          <div className=" overflow-hidden">
            <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed">
              <div className="flex h-full items-center ">
                <div className="px-6 text-left text-white md:px-12">
                  <div className="flex">
                    {" "}
                    <h2 className="font-monda text-5xl font-normal leading-loose  md:text-6xl xl:text-6xl">
                      Super Fuel Your business with{" "}
                      <span className=" font-monda tracking-[0.5rem] text-[#26D537] ">
                        SUPERPAY
                      </span>
                    </h2>{" "}
                  </div>

                  <br />
                  <span className="font-mono text-[25px]">
                    DeFi payment gateway for streaming money payments
                  </span>
                  <ConnectButton />
                </div>
                <div className="">
                  {" "}
                  <img src="/Illustrations/bg.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Section: Design Block --> */}
      </div>
    </Layout>
  );
};
