import { EthereumProvider } from "@arcana/auth";
import { useAuth } from "@arcana/auth-react";
import * as PushAPI from "@pushprotocol/restapi";
import { ethers } from "ethers";
import { arcanaProvider } from "./auth";

interface argType {
  address: string;
  provider: any;
}

export const subscribeChannel = async ({ address, provider }: argType) => {
  const _provider = new ethers.providers.Web3Provider(provider); //id onn aaki nok call cheyumbo useAuth nte sanam pass chey
  const signer = _provider.getSigner();
  const result = await PushAPI.channels.subscribe({
    signer: signer,
    user: `eip155:80001:${address}`,
    channel: "eip155:80001:0x2b42dA16aEa56A6477c235D0de443a9a413B83E6",
    verifyingContractAddress: "0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa",
    env: "staging",
  });
  return result;
};

export const getNotification = async (address: string) => {
  const recievedNotifications = await PushAPI.user.getFeeds({
    user: `eip155:80001:${address}`, // user address in CAIP
    spam: true,
    env: "staging",
  });
  return recievedNotifications;
};

export const sendNotification = async (recipientAddress: string) => {
  const provider = new ethers.providers.Web3Provider(arcanaProvider.provider);
  const accounts = await provider.listAccounts();
  const signer = provider.getSigner(accounts[0]);
  const apiResponse = await PushAPI.payloads.sendNotification({
    signer,
    type: 3, // target
    identityType: 2, // direct payload
    notification: {
      title: `[SDK-TEST] notification TITLE:`,
      body: `[sdk-test] notification BODY`,
    },
    payload: {
      title: `[sdk-test] payload title`,
      body: `sample msg body`,
      cta: "",
      img: "",
    },
    recipients: `eip155:80001:${recipientAddress}`, // recipient address
    channel: "eip155:80001:0x6C000fAD7CF4Cae79314B32E2a82B6DB0cC62b3E", // your channel address
    env: "staging",
  });
  return apiResponse;
};
