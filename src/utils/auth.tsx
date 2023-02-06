import { AuthProvider, CHAIN } from "@arcana/auth";

const appAddress = "9c099be4fac444b173f2ad6495b06d658dc9f48b"; // App Address Example

export const arcanaProvider = new AuthProvider(`${appAddress}`, {
  alwaysVisible: true, // defaults to true which is Full UI mode
  chainConfig: {
    chainId: CHAIN.POLYGON_MUMBAI_TESTNET,
    rpcUrl: "",
  },
});
