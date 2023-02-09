import { AuthProvider, CHAIN } from "@arcana/auth";
import { ArcanaConnector } from "@arcana/auth-wagmi";
import { polygon, polygonMumbai } from "@wagmi/core/chains";
const appAddress = import.meta.env.VITE_APP_ID;

export const arcanaProvider = new AuthProvider(`${appAddress}`, {
  alwaysVisible: true, // defaults to true which is Full UI mode
  chainConfig: {
    chainId: CHAIN.POLYGON_MUMBAI_TESTNET,
    // rpcUrl: `https://${
    //   import.meta.env.VITE_QUICKNODE_CLIENTD
    // }.matic-testnet.discover.quiknode.pro/${
    //   import.meta.env.VITE_QUICKNODE_TOKEN
    // }/`,
  },
});

export const connector = new ArcanaConnector({
  chains: [polygon, polygonMumbai],
  options: {
    chainConfig: {
      chainId: CHAIN.POLYGON_MUMBAI_TESTNET,
      // rpcUrl: `https://${
      //   import.meta.env.VITE_QUICKNODE_CLIENTD
      // }.matic-testnet.discover.quiknode.pro/${
      //   import.meta.env.VITE_QUICKNODE_TOKEN
      // }/`,
    },
    appId: `${appAddress}`,
    alwaysVisible: true, // Defaults to true
  },
});
