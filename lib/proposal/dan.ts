export const DanContractABI = [
    { inputs: [], name: "AccessControlBadConfirmation", type: "error" },
    {
        inputs: [
            { internalType: "address", name: "account", type: "address" },
            { internalType: "bytes32", name: "neededRole", type: "bytes32" },
        ],
        name: "AccessControlUnauthorizedAccount",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "target", type: "address" }],
        name: "AddressEmptyCode",
        type: "error",
    },
    { inputs: [], name: "AlreadyInitialized", type: "error" },
    { inputs: [], name: "ContentHashExists", type: "error" },
    { inputs: [], name: "ContentHashIsEmpty", type: "error" },
    { inputs: [], name: "EitherContentHashOrUUID", type: "error" },
    { inputs: [], name: "FailedCall", type: "error" },
    { inputs: [], name: "HasStaked", type: "error" },
    { inputs: [], name: "InsufficientStake", type: "error" },
    { inputs: [], name: "InvalidInitialization", type: "error" },
    { inputs: [], name: "InvalidState", type: "error" },
    { inputs: [], name: "InvalidTokenId", type: "error" },
    { inputs: [], name: "NewOwnerIsZeroAddress", type: "error" },
    { inputs: [], name: "NoCurators", type: "error" },
    { inputs: [], name: "NoHandoverRequest", type: "error" },
    { inputs: [], name: "NotInitializing", type: "error" },
    {
        inputs: [{ internalType: "bytes4", name: "selector", type: "bytes4" }],
        name: "NotPermissionCallable",
        type: "error",
    },
    { inputs: [], name: "OnlyContentCreatorAllowed", type: "error" },
    { inputs: [], name: "OnlyOneContentHashOrUUID", type: "error" },
    { inputs: [], name: "ProposalAlreadyExists", type: "error" },
    { inputs: [], name: "ProposalHasReadyToMint", type: "error" },
    { inputs: [], name: "ProposalIsNotDisputed", type: "error" },
    { inputs: [], name: "ProposalIsNotProposed", type: "error" },
    { inputs: [], name: "ProposalNotExists", type: "error" },
    { inputs: [], name: "ProposalPeriodEnded", type: "error" },
    { inputs: [], name: "ProposalPeriodNotEnded", type: "error" },
    { inputs: [], name: "ProposalURIExists", type: "error" },
    {
        inputs: [{ internalType: "address", name: "token", type: "address" }],
        name: "SafeERC20FailedOperation",
        type: "error",
    },
    { inputs: [], name: "UUIDIsEmpty", type: "error" },
    { inputs: [], name: "Unauthorized", type: "error" },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "string", name: "uuid", type: "string" },
            {
                indexed: true,
                internalType: "string",
                name: "newContentHash",
                type: "string",
            },
        ],
        name: "ContentHashUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint64",
                name: "version",
                type: "uint64",
            },
        ],
        name: "Initialized",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "pendingOwner",
                type: "address",
            },
        ],
        name: "OwnershipHandoverCanceled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "pendingOwner",
                type: "address",
            },
        ],
        name: "OwnershipHandoverRequested",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "oldOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "contentCreator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "string",
                name: "contentHash",
                type: "string",
            },
            {
                indexed: false,
                internalType: "address",
                name: "proposer",
                type: "address",
            },
            {
                indexed: false,
                internalType: "string",
                name: "contentURI",
                type: "string",
            },
            {
                indexed: false,
                internalType: "enum Dan.ProposalState",
                name: "state",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "proposeWeight",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "disputeWeight",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "roundIndex",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "payment",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "ProposalCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "contentHash",
                type: "string",
            },
            {
                indexed: false,
                internalType: "address",
                name: "proposer",
                type: "address",
            },
            {
                indexed: false,
                internalType: "string",
                name: "contentURI",
                type: "string",
            },
            {
                indexed: false,
                internalType: "enum Dan.ProposalState",
                name: "state",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "proposeWeight",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "disputeWeight",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "roundIndex",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "payment",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "ProposalDisputed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "contentHash",
                type: "string",
            },
            {
                indexed: false,
                internalType: "address",
                name: "proposer",
                type: "address",
            },
            {
                indexed: false,
                internalType: "string",
                name: "contentURI",
                type: "string",
            },
            {
                indexed: false,
                internalType: "enum Dan.ProposalState",
                name: "state",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "proposeWeight",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "disputeWeight",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "roundIndex",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "payment",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "ProposalProposed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "contentHash",
                type: "string",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "roundIndex",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "string",
                name: "contentURI",
                type: "string",
            },
        ],
        name: "ProposalReadyToMint",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32",
            },
        ],
        name: "RoleAdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleGranted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleRevoked",
        type: "event",
    },
    {
        inputs: [],
        name: "BIP",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "MAX_PAID_CURATORS",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "SIGNER_ROLE",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "uint256", name: "totalCuratorFee", type: "uint256" },
        ],
        name: "calculateCuratorFees",
        outputs: [
            { internalType: "address[]", name: "", type: "address[]" },
            { internalType: "uint256[]", name: "", type: "uint256[]" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "_stake", type: "uint256" }],
        name: "calculateWeight",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [],
        name: "cancelOwnershipHandover",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "channelHost",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "checkTokenIdValid",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "pendingOwner", type: "address" },
        ],
        name: "completeOwnershipHandover",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    { internalType: "string", name: "uuid", type: "string" },
                    { internalType: "string", name: "contentHash", type: "string" },
                    { internalType: "address", name: "contentCreator", type: "address" },
                    { internalType: "address", name: "beneficiary", type: "address" },
                    { internalType: "string", name: "contentURI", type: "string" },
                ],
                internalType: "struct Dan.ProposalConfig",
                name: "_config",
                type: "tuple",
            },
            { internalType: "uint256", name: "_payment", type: "uint256" },
        ],
        name: "createProposal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "deadlineDuration",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "string", name: "_contentHash", type: "string" },
            { internalType: "uint256", name: "_payment", type: "uint256" },
            { internalType: "address", name: "_beneficiary", type: "address" },
        ],
        name: "disputeProposal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "string", name: "", type: "string" },
            { internalType: "uint256", name: "", type: "uint256" },
        ],
        name: "downVote",
        outputs: [
            { internalType: "address", name: "voter", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "_contentHash", type: "string" }],
        name: "finalizeProposal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "getContent",
        outputs: [
            {
                components: [
                    { internalType: "string", name: "uuid", type: "string" },
                    { internalType: "string", name: "contentHash", type: "string" },
                    { internalType: "address", name: "creator", type: "address" },
                    { internalType: "uint256", name: "createAt", type: "uint256" },
                    { internalType: "string", name: "contentURI", type: "string" },
                ],
                internalType: "struct Dan.Content",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "getContentHash",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "_contentHash", type: "string" }],
        name: "getDisputePrice",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "getFeeRecipients",
        outputs: [
            { internalType: "address", name: "_creator", type: "address" },
            { internalType: "address", name: "_channelHost", type: "address" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "key", type: "string" }],
        name: "getProposal",
        outputs: [
            {
                components: [
                    { internalType: "string", name: "currentKey", type: "string" },
                    { internalType: "string", name: "uuid", type: "string" },
                    { internalType: "string", name: "contentHash", type: "string" },
                    { internalType: "string", name: "contentURI", type: "string" },
                    { internalType: "address", name: "contentCreator", type: "address" },
                    { internalType: "address[]", name: "curators", type: "address[]" },
                    { internalType: "uint256", name: "proposeWeight", type: "uint256" },
                    { internalType: "uint256", name: "disputeWeight", type: "uint256" },
                    { internalType: "uint256", name: "deadline", type: "uint256" },
                    { internalType: "uint256", name: "roundIndex", type: "uint256" },
                    {
                        internalType: "enum Dan.ProposalState",
                        name: "state",
                        type: "uint8",
                    },
                ],
                internalType: "struct Dan.Proposal",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "_contentHash", type: "string" }],
        name: "getProposePrice",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "hash", type: "bytes32" },
            { internalType: "bytes", name: "authData", type: "bytes" },
        ],
        name: "getRequestAuthorization",
        outputs: [
            {
                internalType: "enum IOffchainAuthorization.Authorization",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
        name: "getRoleAdmin",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "getTokenDeadline",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "getTokenURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "role", type: "bytes32" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "grantSignerRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "role", type: "bytes32" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "hasRole",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "", type: "string" }],
        name: "hashToTokenId",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "initialStake",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IERC20",
                name: "_paymentToken",
                type: "address",
            },
            { internalType: "uint256", name: "_initialStake", type: "uint256" },
            { internalType: "uint256", name: "_period", type: "uint256" },
            { internalType: "uint256", name: "_deadlineDuration", type: "uint256" },
            {
                components: [
                    { internalType: "address", name: "creator", type: "address" },
                    { internalType: "string", name: "contentURI", type: "string" },
                ],
                internalType: "struct IDan.ContentZero",
                name: "_ContentZero",
                type: "tuple",
            },
            { internalType: "address", name: "_channelHost", type: "address" },
            { internalType: "address", name: "_protocolAddr", type: "address" },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "result", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "pendingOwner", type: "address" },
        ],
        name: "ownershipHandoverExpiresAt",
        outputs: [{ internalType: "uint256", name: "result", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "paymentToken",
        outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "period",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes", name: "call", type: "bytes" }],
        name: "permissionedCall",
        outputs: [{ internalType: "bytes", name: "res", type: "bytes" }],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "", type: "string" }],
        name: "proposalCurrentKey",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "", type: "string" }],
        name: "proposals",
        outputs: [
            { internalType: "string", name: "currentKey", type: "string" },
            { internalType: "string", name: "uuid", type: "string" },
            { internalType: "string", name: "contentHash", type: "string" },
            { internalType: "string", name: "contentURI", type: "string" },
            { internalType: "address", name: "contentCreator", type: "address" },
            { internalType: "uint256", name: "proposeWeight", type: "uint256" },
            { internalType: "uint256", name: "disputeWeight", type: "uint256" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
            { internalType: "uint256", name: "roundIndex", type: "uint256" },
            { internalType: "enum Dan.ProposalState", name: "state", type: "uint8" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "string", name: "_contentHash", type: "string" },
            { internalType: "uint256", name: "_payment", type: "uint256" },
            { internalType: "address", name: "_beneficiary", type: "address" },
        ],
        name: "proposeProposal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "protocolAddr",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "role", type: "bytes32" },
            { internalType: "address", name: "callerConfirmation", type: "address" },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "requestOwnershipHandover",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "role", type: "bytes32" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "revokeSignerRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "string", name: "", type: "string" },
            { internalType: "uint256", name: "", type: "uint256" },
            { internalType: "address", name: "", type: "address" },
        ],
        name: "round",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
        name: "supportsPermissionedCallSelector",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "tokenIdToContent",
        outputs: [
            { internalType: "string", name: "uuid", type: "string" },
            { internalType: "string", name: "contentHash", type: "string" },
            { internalType: "address", name: "creator", type: "address" },
            { internalType: "uint256", name: "createAt", type: "uint256" },
            { internalType: "string", name: "contentURI", type: "string" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "string", name: "", type: "string" },
            { internalType: "uint256", name: "", type: "uint256" },
        ],
        name: "upVote",
        outputs: [
            { internalType: "address", name: "voter", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "string", name: "_uuid", type: "string" },
            { internalType: "string", name: "_contentHash", type: "string" },
        ],
        name: "updateContentHash",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "", type: "string" }],
        name: "uriToTokenId",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
];
