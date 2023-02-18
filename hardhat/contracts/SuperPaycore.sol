// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import './SuperApp.sol';

contract SuperPayCore is SuperApp {

    ISuperToken internal immutable acceptedToken;

        constructor(
        ISuperfluid host,
        IConstantFlowAgreementV1 cfa,
        ISuperToken acceptedToken_
    ) SuperApp(acceptedToken_, host, cfa) {
        acceptedToken = acceptedToken_;
    }

    function withdrawAll() onlyOwner {
        uint256 memory bal = acceptedToken.balanceOf(address(this));
        address memory owner = owner();
        acceptedToken.transfer(owner, bal);
    }

}