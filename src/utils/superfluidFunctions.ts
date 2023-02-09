import { useContext } from "react"
import globalContext from "./globalState"
import { ethers } from "ethers"
import type { Signer } from "ethers"

const sf = useContext(globalContext)

export const asyncWrapper = async (asyncFunction: () => {}, params: Array) => {
    try {
        const data = await asyncFunction(...params)
        return [data, null]
    }
    catch (error) {
        return [ null, error ]
    }
}

const startFlow = async (sender: string, receiver: string, flowRate: string, signer: Signer, userData?: string ) => {
//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const superToken = await sf?.loadSuperToken("DAIx");

let flowOp = superToken?.createFlow({
  sender,
  receiver,
  flowRate,
  userData
});

await flowOp?.exec( signer ); // should have same address as `sender`
}

const updateFlow = async (sender: string, receiver: string, flowRate: string, signer: Signer, userData?: string ) => {
//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const superToken = await sf?.loadSuperToken("DAIx");

let flowOp = superToken?.createFlow({
  sender,
  receiver,
  flowRate,
  userData
});

await flowOp?.exec( signer ); // should have same address as `sender`
}

const stopFlow = async (sender: string, receiver: string, userData?: string, signer: Signer) => {
    //load the token you'd like to use like this 
    //note that tokens may be loaded by symbol or by address
    const superToken = await sf?.loadSuperToken("DAIx");
    
    let flowOp = superToken?.deleteFlow({
        sender,
        receiver,
        userData
    });
    
    await flowOp?.exec( signer ); // should have same address as `sender`
}

const approveContractToSpend = async (tokenAddress: string,tokenABI: Array,signer: Signer, amount: string, ) => {
    const tokenContract = new ethers.Contract(
        "0x88271d333C72e51516B67f5567c728E702b3eeE8",
        tokenABI,
        signer
      );
      
    await tokenContract.approve(
        tokenAddress,
        ethers.utils.parseEther(amount)
    )
}

const upgradeTokens = async (superTokenAddress: string, amount: string, signer: Signer) => {
    const superToken = await sf?.loadSuperToken(superTokenAddress);

    const upgradeOperation = superToken?.upgrade({ amount });

    await upgradeOperation.exec(signer);
}

const downgradeTokens = async (superTokenAddress: string, amount: string, signer: Signer) => {
    const superToken = await sf?.loadSuperToken(superTokenAddress);

    const upgradeOperation = superToken?.downgrade({ amount });

    await upgradeOperation.exec(signer);
}

const batchTxns = async (txnArray: Array, signer: Signer) => {
    await sf?.batchCall(txnArray).exec(signer)
}

export {startFlow, updateFlow, stopFlow, approveContractToSpend, upgradeTokens, downgradeTokens, batchTxns};