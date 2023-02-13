import { useAuth } from "@arcana/auth-react";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import DefaultContext from "../utils/globalState";
import { arcanaProvider } from "../utils/auth";
import {
  getNotification,
  sendNotification,
} from "../utils/notificationservices";
import { useEffect, useState } from "react";

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

const Test = () => {
  const auth = useAuth();

  const [sf, setsf] = useState<Framework>();

  const init = async () => {
    const result = await Framework.create({
      chainId: 80001,
      provider: new ethers.providers.Web3Provider(arcanaProvider.provider),
    });
    setsf(result);
  };
  useEffect(() => {
    init();
  }, [!sf]);

  return (
    <DefaultContext.Provider value={sf}>
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
    </DefaultContext.Provider>
  );
};

export default Test;
