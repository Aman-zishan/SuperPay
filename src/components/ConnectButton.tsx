import { useAuth } from "@arcana/auth-react";
import React from "react";
import { arcanaProvider } from "../utils/auth";

export const ConnectButton = () => {
  const auth = useAuth();
  const {
    user,
    connect,
    isLoggedIn,
    loading,
    loginWithSocial,
    provider,
    logout,
  } = auth;
  const onConnect = async () => {
    try {
      await connect();
    } catch (error) {}
  };

  return (
    <button
      onClick={onConnect}
      className="mx-auto my-[20px] mt-[50px] rounded-[10px] bg-[#26D537] py-[10px] px-[50px] font-monda font-bold uppercase text-white"
    >
      CONNECT WALLET
    </button>
  );
};
