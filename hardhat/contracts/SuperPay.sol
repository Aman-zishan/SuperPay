// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import {ISuperfluid, ISuperToken, ISuperApp, ISuperAgreement, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {SuperAppBase} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

interface IPUSHCommInterface {
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external;
}

/// @dev Constant Flow Agreement registration key, used to get the address from the host.
bytes32 constant CFA_ID = keccak256(
    "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
);

/// @dev Thrown when the callback caller is not the host.
error Unauthorized();

/// @dev Thrown when the token being streamed to this contract is invalid
error InvalidToken();

/// @dev Thrown when the agreement is other than the Constant Flow Agreement V1
error InvalidAgreement();

/// @title Stream Redirection Contract
/// @notice This contract is a registered super app, meaning it receives
contract SuperApp is Ownable, SuperAppBase {
    // SuperToken library setup
    using SuperTokenV1Library for ISuperToken;

    /// @dev Super token that may be streamed to this contract
    ISuperToken internal immutable _acceptedToken;

    ///@notice this is the superfluid host which is used in modifiers
    ISuperfluid immutable host;

    IConstantFlowAgreementV1 immutable cfa;

    //push protocl variables
    address EPNS__COMM = 0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa;
    address CHANNEL_ADDRESS;

    mapping(address => mapping(address => int96)) services; // user => vendor => flowRate
    mapping(address => address[]) vendorList; //user => list of vendors user subscribed to

    function getVendorList(address add) public view returns (address[] memory) {
        return vendorList[add];
    }

    function getServices(
        address usr,
        address vendor
    ) public view returns (int96) {
        return services[usr][vendor];
    }

    constructor(
        ISuperToken acceptedToken,
        ISuperfluid _host,
        IConstantFlowAgreementV1 _cfa,
        address channelAddress
    ) {
        assert(address(_host) != address(0));
        assert(address(acceptedToken) != address(0));

        _acceptedToken = acceptedToken;
        host = _host;
        cfa = _cfa;
        CHANNEL_ADDRESS = channelAddress;

        // Registers Super App, indicating it is the final level (it cannot stream to other super
        // apps), and that the `before*` callbacks should not be called on this contract, only the
        // `after*` callbacks.
        host.registerApp(
            SuperAppDefinitions.APP_LEVEL_FINAL |
                SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
                SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
                SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP
        );
    }

    // ---------------------------------------------------------------------------------------------
    // Helper Functions

    function addVendorToVendorList(address sender, address vendor) internal {
        //check if vendor doesn't exist in list
        //add vendor to list if they don't
        bool doesListContainVendor = false;

        for (uint i = 0; i < vendorList[sender].length; i++) {
            if (vendor == vendorList[sender][i]) {
                doesListContainVendor = true;

                break;
            }
        }

        if (!doesListContainVendor) {
            vendorList[sender].push(vendor);
        }
    }

    function removeVendorFromVendorList(
        address sender,
        address vendor
    ) internal {
        //check if vendor exists in list
        //remove vendor to list if they do

        bool doesListContainVendor = false;
        uint indexOfVendor;

        for (uint i = 0; i < vendorList[sender].length; i++) {
            if (vendor == vendorList[sender][i]) {
                doesListContainVendor = true;
                indexOfVendor = i;
                break;
            }
        }

        if (doesListContainVendor) {
            vendorList[sender][indexOfVendor] = vendorList[sender][
                vendorList[sender].length - 1
            ];
            vendorList[sender].pop();
        }
    }

    function sendNotification(
        string memory title,
        string memory message,
        address receiver
    ) internal {
        IPUSHCommInterface(EPNS__COMM).sendNotification(
            CHANNEL_ADDRESS, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
            receiver, // to recipient, put address(this) in case you want Broadcast or Subset. For Targetted put the address to which you want to send
            bytes(
                string(
                    // We are passing identity here: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                    abi.encodePacked(
                        "0", // this is notification identity: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                        "+", // segregator
                        "3", // this is payload type: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/payload (1, 3 or 4) = (Broadcast, targetted or subset)
                        "+", // segregator
                        title, // this is notificaiton title
                        "+", // segregator
                        message // notification body
                    )
                )
            )
        );
    }

    // ---------------------------------------------------------------------------------------------
    // MODIFIERS

    modifier onlyHost() {
        if (msg.sender != address(host)) revert Unauthorized();
        _;
    }

    modifier onlyExpected(ISuperToken superToken, address agreementClass) {
        if (superToken != _acceptedToken) revert InvalidToken();
        if (agreementClass != address(cfa)) revert InvalidAgreement();
        _;
    }

    // ---------------------------------------------------------------------------------------------
    // SUPER APP CALLBACKS

    function afterAgreementCreated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, //_agreementId
        bytes calldata _agreementData, //_agreementData
        bytes calldata, //_cbdata
        bytes calldata _ctx
    )
        external
        override
        onlyExpected(_superToken, _agreementClass)
        onlyHost
        returns (bytes memory newCtx)
    {
        newCtx = _ctx;

        ISuperfluid.Context memory decompiledContext = host.decodeCtx(newCtx);

        if (
            keccak256(abi.encodePacked(string(decompiledContext.userData))) ==
            keccak256(abi.encodePacked(""))
        ) {
            return newCtx;
        }

        (address vendorAddress, int96 flowRate) = abi.decode(
            decompiledContext.userData,
            (address, int96)
        );

        (address sender, ) = abi.decode(_agreementData, (address, address));

        //add flowData to services mapping
        vendorList[sender].push(vendorAddress);
        services[sender][vendorAddress] = flowRate;

        //split the streams to vendor and owner

        int96 outFlowRate = _acceptedToken.getFlowRate(
            address(this),
            vendorAddress
        );

        if (outFlowRate == 0) {
            newCtx = _acceptedToken.createFlowWithCtx(
                vendorAddress,
                (flowRate * 99) / 100,
                newCtx
            );
        } else {
            int96 newOutFlowRate = outFlowRate + ((flowRate * 99) / 100);

            newCtx = _acceptedToken.updateFlowWithCtx(
                vendorAddress,
                newOutFlowRate,
                newCtx
            );
        }

        int96 outFlowRateToOwner = _acceptedToken.getFlowRate(
            address(this),
            owner()
        );

        if (outFlowRateToOwner == 0) {
            newCtx = _acceptedToken.createFlowWithCtx(
                owner(),
                flowRate / 100,
                newCtx
            );
        } else {
            int96 newOutFlowRateToOwner = outFlowRateToOwner + (flowRate / 100);

            newCtx = _acceptedToken.updateFlowWithCtx(
                owner(),
                newOutFlowRateToOwner,
                newCtx
            );
        }

        sendNotification(
            "New Subscriber",
            string(abi.encode(sender)),
            vendorAddress
        );

        sendNotification(
            "Successfully Subscribed",
            string(abi.encode(vendorAddress)),
            sender
        );
    }

    function afterAgreementUpdated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, // _agreementId,
        bytes calldata _agreementData, //_agreementData
        bytes calldata, // _cbdata,
        bytes calldata _ctx
    )
        external
        override
        onlyExpected(_superToken, _agreementClass)
        onlyHost
        returns (bytes memory newCtx)
    {
        (address sender, ) = abi.decode(_agreementData, (address, address));

        newCtx = _ctx;

        ISuperfluid.Context memory decompiledContext = host.decodeCtx(newCtx);

        if (
            keccak256(abi.encodePacked(string(decompiledContext.userData))) ==
            keccak256(abi.encodePacked(""))
        ) {
            return newCtx;
        }

        (address vendorAddress, int96 flowRate, string memory operation) = abi
            .decode(decompiledContext.userData, (address, int96, string));

        int96 outFlowRate = _acceptedToken.getFlowRate(
            address(this),
            vendorAddress
        );

        int96 outFlowRateToOwner = _acceptedToken.getFlowRate(
            address(this),
            owner()
        );

        if (keccak256(bytes(operation)) == keccak256(bytes("addService"))) {
            if (outFlowRate == 0) {
                newCtx = _acceptedToken.createFlowWithCtx(
                    vendorAddress,
                    (flowRate * 99) / 100,
                    newCtx
                );

                addVendorToVendorList(sender, vendorAddress);
                services[sender][vendorAddress] = flowRate;
            } else {
                int96 newOutFlowRate = outFlowRate + ((flowRate * 99) / 100);

                newCtx = _acceptedToken.updateFlowWithCtx(
                    vendorAddress,
                    newOutFlowRate,
                    newCtx
                );

                addVendorToVendorList(sender, vendorAddress);
                services[sender][vendorAddress] += flowRate;
            }

            int96 newOutFlowRateToOwner = outFlowRateToOwner + (flowRate / 100);

            newCtx = _acceptedToken.updateFlowWithCtx(
                owner(),
                newOutFlowRateToOwner,
                newCtx
            );

            sendNotification(
                "New Service Added",
                string(abi.encode(vendorAddress)),
                sender
            );
            sendNotification(
                "New Subscriber",
                string(abi.encode(sender)),
                vendorAddress
            );
        } else if (
            keccak256(bytes(operation)) == keccak256(bytes("removeService"))
        ) {
            int96 newOutFlowRate = outFlowRate - ((flowRate * 99) / 100);

            if (newOutFlowRate == 0) {
                newCtx = _acceptedToken.deleteFlowWithCtx(
                    address(this),
                    vendorAddress,
                    newCtx
                );
            } else {
                newCtx = _acceptedToken.updateFlowWithCtx(
                    vendorAddress,
                    newOutFlowRate,
                    newCtx
                );
            }

            if (flowRate == services[sender][vendorAddress]) {
                removeVendorFromVendorList(sender, vendorAddress);
                delete services[sender][vendorAddress];
            }

            services[sender][vendorAddress] -= flowRate;

            int96 newOutFlowRateToOwner = outFlowRateToOwner - (flowRate / 100);

            if (newOutFlowRateToOwner == 0) {
                newCtx = _acceptedToken.deleteFlowWithCtx(
                    address(this),
                    owner(),
                    newCtx
                );
            } else {
                newCtx = _acceptedToken.updateFlowWithCtx(
                    owner(),
                    newOutFlowRateToOwner,
                    newCtx
                );
            }

            sendNotification(
                "Service Removed",
                string(abi.encode(vendorAddress)),
                sender
            );
            sendNotification(
                "Subscriber Revoked",
                string(abi.encode(sender)),
                vendorAddress
            );
        }
    }

    function afterAgreementTerminated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, // _agreementId,
        bytes calldata _agreementData, //_agreementData
        bytes calldata, // _cbdata,
        bytes calldata _ctx
    ) external override onlyHost returns (bytes memory newCtx) {
        // According to the app basic law, we should never revert in a termination callback
        if (_superToken != _acceptedToken || _agreementClass != address(cfa)) {
            return _ctx;
        }

        newCtx = _ctx;

        (address sender, address receiver) = abi.decode(
            _agreementData,
            (address, address)
        );

        if (receiver == address(this)) {
            int96 totalFlowRateFromSender;

            for (uint i = 0; i < vendorList[sender].length; i++) {
                address vendorAddress = vendorList[sender][i];
                totalFlowRateFromSender += services[sender][vendorAddress];

                //fetch current flowRate to vendor
                int96 outFlowRate = _acceptedToken.getFlowRate(
                    address(this),
                    vendorAddress
                );

                int96 newOutFlowRate = outFlowRate -
                    ((services[sender][vendorAddress] * 99) / 100);

                if (newOutFlowRate == 0) {
                    newCtx = _acceptedToken.deleteFlowWithCtx(
                        address(this),
                        vendorAddress,
                        newCtx
                    );
                } else {
                    newCtx = _acceptedToken.updateFlowWithCtx(
                        vendorAddress,
                        newOutFlowRate,
                        newCtx
                    );
                }
            }

            for (uint i = 0; i < vendorList[sender].length; i++) {
                address vendorAddress = vendorList[sender][i];
                delete services[sender][vendorAddress];
            }
            delete vendorList[sender];

            // fetch current flowRate to owner
            int96 outFlowRateToOwner = _acceptedToken.getFlowRate(
                address(this),
                owner()
            );

            if (outFlowRateToOwner != 0) {
                int96 newOutFlowRateToOwner = outFlowRateToOwner -
                    (totalFlowRateFromSender / 100);

                if (newOutFlowRateToOwner == 0) {
                    newCtx = _acceptedToken.deleteFlowWithCtx(
                        address(this),
                        owner(),
                        newCtx
                    );
                } else {
                    newCtx = _acceptedToken.updateFlowWithCtx(
                        owner(),
                        newOutFlowRateToOwner,
                        newCtx
                    );
                }
            }

            sendNotification(
                "All subscription terminated",
                "all of your subscriptions have been succesfully terminated",
                sender
            );
        }
    }
}
