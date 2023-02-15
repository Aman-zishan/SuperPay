import { useAuth } from "@arcana/auth-react";
import "flowbite";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "./utils/supabaseClient";
import React, { useEffect, useState } from "react";
import { arcanaProvider } from "./utils/auth";
import Register from "./pages/register";
import { ConnectButton } from "./components/ConnectButton";

export default function App() {
  const [data, setData] = useState<any>();
  const [userLoggedIn, setUserLoggedIn] = useState<any>();
  const [arcanaUserInfo, setArcanaUserInfo] = useState<any>();
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
        item.isVendor
          ? navigate(`vendor/${item.address}`)
          : navigate(`user/${item.address}`);
      } else {
        navigate("register");
        return;
      }
    });
  }
  return (
    <>
      {loading && <p style={{ color: "white" }}>loading</p>}
      {!loading && !isLoggedIn && <ConnectButton></ConnectButton>}
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
}
