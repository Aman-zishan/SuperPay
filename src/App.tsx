import { Auth, useAuth } from "@arcana/auth-react";
import { arcanaProvider } from "./utils/auth";
import { ethers } from "ethers";
import "flowbite";
import "./App.css";
import { redirect, Router } from "react-router";

const getAccount = async () => {
  // Route to authenticated page
  const provider = new ethers.providers.Web3Provider(arcanaProvider.provider);
  const signer = provider.getSigner();
  console.log(await signer.getAddress());
};
const sendMatic = async () => {
  // Route to authenticated page
  const provider = new ethers.providers.Web3Provider(arcanaProvider.provider);
  const accounts = await provider.listAccounts();
  const signer = provider.getSigner(accounts[0]);
  const pkey = (await arcanaProvider.getUser()).address;
  const transactionParameters = {
    from: pkey, // sender wallet address
    to: "0x6C000fAD7CF4Cae79314B32E2a82B6DB0cC62b3E", // receiver address
    data: "0x",
    value: ethers.utils.parseEther("0"),
  };
  await signer
    .sendTransaction(transactionParameters)
    .then((transaction) => {
      console.log(transaction);
    })
    .catch((e) => {
      console.log(e);
      console.log("failed!");

      return;
    });
};

function App() {
  const auth = useAuth();

  return (
    <div>
      {auth.loading ? (
        "Loading"
      ) : auth.isLoggedIn ? (
        <>
          <p className="text-white">Logged In</p> <br />{" "}
          <button
            className="text-white"
            onClick={() => {
              getAccount();
            }}
          >
            get account
          </button>{" "}
          <br />
          <button
            className="text-white"
            onClick={() => {
              sendMatic();
            }}
          >
            send matic
          </button>{" "}
          <br />
          <button className="text-white" onClick={() => auth.logout()}>
            logout
          </button>
        </>
      ) : (
        <div>
          <Auth
            externalWallet={false}
            theme={"dark"}
            onLogin={() => redirect("/vendor")}
          />
        </div>
      )}
    </div>
  );
}

export default App;
