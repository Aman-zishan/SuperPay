import { AuthProvider, CHAIN } from "@arcana/auth";
import { ethers } from "ethers";

const appAddress = import.meta.env.VITE_APP_ID;

export const arcanaProvider = new AuthProvider(`${appAddress}`, {
  alwaysVisible: true, // defaults to true which is Full UI mode
  chainConfig: {
    chainId: CHAIN.POLYGON_MUMBAI_TESTNET,
    rpcUrl: import.meta.env.VITE_QUICKNODE_URL,
  },
});
