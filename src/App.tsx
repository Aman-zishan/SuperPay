import { Auth, useAuth } from "@arcana/auth-wagmi";
import { ethers } from "ethers";
import "flowbite";
import "./App.css";
import { redirect, Router } from "react-router";
import {
  getNotification,
  sendNotification,
} from "./utils/notificationservices";

const getAccount = async () => {
  // Route to authenticated page
  const provider = new ethers.providers.Web3Provider(arcanaProvider.provider);
  const signer = provider.getSigner();
  console.log(await signer.getAddress());
};

const sendMessage = async (address: string) => {
  // Route to authenticated page
  const result = await sendNotification(address);
  console.log(result);
};
const recieveMessage = async (address: string) => {
  // Route to authenticated page
  const result = await getNotification(address);
  console.log(result);
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
          <br />
          <label className="pr-5 pl-5 text-white">Recipient Address:</label>
          <input type="text" id="address" name="address" />
          <button
            className="pl-10 text-white"
            onClick={() => {
              const address: string = document.querySelector<HTMLInputElement>(
                'input[name="address"]'
              )!.value;
              console.log(address);
              sendMessage(address);
            }}
          >
            send
          </button>
          <br />
          <label className="pr-5 pl-5 text-white"> Address:</label>
          <input type="text" id="getmsg" name="getmsg" />
          <button
            className="pl-10 text-white"
            onClick={() => {
              const address: string = document.querySelector<HTMLInputElement>(
                'input[name="getmsg"]'
              )!.value;
              console.log(address);
              recieveMessage(address);
            }}
          >
            fetch messages
          </button>
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
