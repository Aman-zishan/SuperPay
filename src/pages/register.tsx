import { useAuth } from "@arcana/auth-react";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../layout";
import { arcanaProvider } from "../utils/auth";
import { supabase } from "../utils/supabaseClient";

const Register = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    user,
    connect,
    isLoggedIn,
    loading,
    loginWithSocial,
    provider,
    logout,
  } = auth;
  const onConnectClick = async (name: string, isVendor: boolean) => {
    try {
      await connect();
      const isLoggedin = await arcanaProvider.isLoggedIn();
      const userInfo = await arcanaProvider.getUser();
      console.log(isLoggedin);

      if (isLoggedin) {
        const address = userInfo.address;
        console.log(address);
        if (!address) {
          return;
        }
        const { data, error } = await supabase
          .from("user")
          .insert([{ address: address, name: name, isVendor: isVendor }])
          .select();

        if (error) {
          alert("error updating DB");
          console.log(error);
          return;
        }
        if (data) {
          alert("successfully updated data");
          navigate("/test");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onConnect = () => {
    console.log("connected");
  };
  const handleChange = (event: any) => {
    console.log(event.target.checked);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const userName = event.target.name.value;
    const userIsVendor = event.target.isVendor.checked;
    if (!userName || !userIsVendor) {
      alert("form data empty!");
      return;
    }
    await onConnectClick(userName, userIsVendor);
  };
  React.useEffect(() => {
    provider.on("connect", onConnect);
    return () => {
      provider.removeListener("connect", onConnect);
    };
  }, [provider]);

  return (
    <Layout>
      <div className="drop-shadow-[0_16px_16px_rgba(38, 213, 55, 0.15)] format m-auto mt-[6rem] h-auto w-[450px] items-center rounded-[20px] border-[0.5px] border-[#26D537] py-[30px]  dark:format-invert">
        <header className="format m-auto my-[3rem] dark:format-invert">
          <h5 className="body-font font-monda text-2xl tracking-[0.5rem] text-white ">
            SUPERPAY
          </h5>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="format m-auto my-[25px] dark:format-invert">
            <input
              type="text"
              name="name"
              className="h-[54px] w-[326px] rounded-lg border border-white bg-transparent p-2.5 font-monda text-sm text-white focus:border-[#26D537] focus:ring-[#26D537]"
              placeholder="Enter Name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="Toggle3"
              className="inline-flex cursor-pointer items-center rounded-md p-2 dark:text-gray-800"
            >
              <input
                id="Toggle3"
                type="checkbox"
                className="peer hidden"
                name="isVendor"
                onChange={handleChange}
              />
              <span className="rounded-l-[30px] border-[3px] border-[#26D537] bg-[#26D537] px-7 py-2 font-monda text-sm font-bold uppercase peer-checked:border-[3px] peer-checked:border-[#26D537] peer-checked:bg-transparent peer-checked:text-white">
                User
              </span>
              <span className="rounded-r-[30px] border-[3px] border-[#26D537] bg-transparent px-4 py-2 font-monda text-sm font-bold  uppercase text-white peer-checked:bg-[#26D537] peer-checked:text-black">
                Vendor
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="mx-auto my-[20px] mt-[50px] rounded-[10px] bg-[#26D537] py-[10px] px-[50px] font-monda font-bold uppercase text-white"
          >
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
