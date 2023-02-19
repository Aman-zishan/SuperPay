import { useAuth } from "@arcana/auth-react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "./utils/supabaseClient";
import React, { useEffect, useState } from "react";
import { arcanaProvider } from "./utils/auth";
import Register from "./pages/register";
import { ConnectButton } from "./components/ConnectButton";

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
      {loading && <p style={{ color: "white" }}>loading</p>}
      {!loading && !isLoggedIn && <LandingPageTemplate />}
      {!loading && isLoggedIn && (
        <h2 style={{ color: "white" }}>{user?.email} logged in!</h2>
      )}
      {!loading && isLoggedIn && (
        <button style={{ color: "white" }} onClick={() => logout()}>
          disconnect
        </button>
      )}
    </>
  );
};

export default App;

const LandingPageTemplate = () => {
  return (
    <div>
      {/* <!-- Section: Design Block --> */}
      <section className="mb-40">
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat"
          style={{
            backgroundPosition: "50%",
            backgroundImage: `url(
              "https://mdbcdn.b-cdn.net/img/new/slides/146.webp"
            )`,
            height: "100vh",
          }}
        >
          <div
            className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
          >
            <div className="flex h-full items-center justify-center">
              <div className="px-6 text-center text-white md:px-12">
                <h1 className="mb-12 font-monda text-5xl font-bold tracking-tight md:text-6xl xl:text-6xl">
                  Super Fuel Your business with Super Pay! <br />
                  <span className="font-mono text-[28px]">
                    DeFi payment gateway for streaming money payments
                  </span>
                </h1>
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Section: Design Block --> */}
    </div>
  );
};
