export const FactoryContractABI = [
  {
    inputs: [
      { internalType: "address", name: "_uniswapV3Factory", type: "address" },
      {
        internalType: "address",
        name: "_nonfungiblePositionManager",
        type: "address",
      },
      { internalType: "address", name: "_quoter", type: "address" },
      { internalType: "address", name: "_router02", type: "address" },
      { internalType: "address", name: "_tokenTemplate", type: "address" },
      { internalType: "address", name: "_danTemplate", type: "address" },
      {
        internalType: "contract IBondingCurve",
        name: "_defaultBondingCurve",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "AlreadyInitialized", type: "error" },
  {
    inputs: [{ internalType: "string", name: "baseURI", type: "string" }],
    name: "CommunityCuration__BaseURIExists",
    type: "error",
  },
  { inputs: [], name: "CommunityCuration__HasGraduated", type: "error" },
  { inputs: [], name: "CommunityCuration__HasNotGraduated", type: "error" },
  {
    inputs: [],
    name: "CommunityCuration__InsufficientLeftForCurrentPriceRange",
    type: "error",
  },
  { inputs: [], name: "CommunityCuration__InsufficientPayment", type: "error" },
  { inputs: [], name: "CommunityCuration__InvalidAmount", type: "error" },
  { inputs: [], name: "CommunityCuration__InvalidFeeBip", type: "error" },
  { inputs: [], name: "CommunityCuration__InvalidTokenId", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "uint256", name: "maxPayment", type: "uint256" },
    ],
    name: "CommunityCuration__MaxPaymentExceeded",
    type: "error",
  },
  { inputs: [], name: "CommunityCuration__MintAmountIsZero", type: "error" },
  {
    inputs: [],
    name: "CommunityCuration__NotReachedGraduationPoint",
    type: "error",
  },
  { inputs: [], name: "CommunityCuration__OnlyCreatorAllowed", type: "error" },
  {
    inputs: [],
    name: "CommunityCuration__OnlyTokenCreatorAllowed",
    type: "error",
  },
  { inputs: [], name: "CommunityCuration__ProposalStakeZero", type: "error" },
  { inputs: [], name: "CommunityCuration__TokenNotExists", type: "error" },
  { inputs: [], name: "FailedDeployment", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "InsufficientBalance",
    type: "error",
  },
  { inputs: [], name: "NewOwnerIsZeroAddress", type: "error" },
  { inputs: [], name: "NoHandoverRequest", type: "error" },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  { inputs: [], name: "Unauthorized", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "dan", type: "address" },
      {
        indexed: true,
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      { indexed: false, internalType: "string", name: "name", type: "string" },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "CommunityCurationCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "totalLiquidity",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "LiquidityAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "from", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalNftSupply",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nftPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "contentHash",
        type: "string",
      },
    ],
    name: "NFTBurned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalNftSupply",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nftPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "contentHash",
        type: "string",
      },
    ],
    name: "NFTMinted",
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
    inputs: [],
    name: "BIP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CHANNEL_HOST_FEE_BIP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CREATOR_FEE_BIP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CURATOR_FEE_BIP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEGENCAST_FEE_BIP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEGENCAST_LIQUIDITY_FEE_BIP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_TICK",
    outputs: [{ internalType: "int24", name: "", type: "int24" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_TICK",
    outputs: [{ internalType: "int24", name: "", type: "int24" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "POOL_FEE",
    outputs: [{ internalType: "uint24", name: "", type: "uint24" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNIV3_POSITION_MANAGER",
    outputs: [
      {
        internalType: "contract INonfungiblePositionManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "baseURItoToken",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "burnNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "calculateFees",
    outputs: [
      { internalType: "uint256", name: "protocolFee", type: "uint256" },
      { internalType: "uint256", name: "channelHostFee", type: "uint256" },
      { internalType: "uint256", name: "creatorFee", type: "uint256" },
      { internalType: "uint256", name: "curatorFee", type: "uint256" },
    ],
    stateMutability: "view",
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
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "symbol", type: "string" },
          { internalType: "string", name: "baseURI", type: "string" },
          { internalType: "uint256", name: "unit", type: "uint256" },
          {
            internalType: "uint256",
            name: "maxTokensPerIdPerUser",
            type: "uint256",
          },
          { internalType: "uint256", name: "proposalStake", type: "uint256" },
          { internalType: "uint256", name: "proposalPeriod", type: "uint256" },
          {
            internalType: "uint256",
            name: "deadlineDuration",
            type: "uint256",
          },
          {
            internalType: "contract IERC20",
            name: "paymentToken",
            type: "address",
          },
          { internalType: "address", name: "channelHost", type: "address" },
          { internalType: "address", name: "protocolAddr", type: "address" },
        ],
        internalType:
          "struct CommunityCurationLiqManager.CommunityCurationConfig",
        name: "_tokenConfig",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "creator", type: "address" },
          { internalType: "string", name: "contentURI", type: "string" },
        ],
        internalType: "struct IDan.ContentZero",
        name: "_contentZero",
        type: "tuple",
      },
      {
        internalType: "contract IBondingCurve",
        name: "_bondingCurve",
        type: "address",
      },
    ],
    name: "createToken",
    outputs: [
      { internalType: "contract CommunityCuration", name: "", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "symbol", type: "string" },
          { internalType: "string", name: "baseURI", type: "string" },
          { internalType: "uint256", name: "unit", type: "uint256" },
          {
            internalType: "uint256",
            name: "maxTokensPerIdPerUser",
            type: "uint256",
          },
          { internalType: "uint256", name: "proposalStake", type: "uint256" },
          { internalType: "uint256", name: "proposalPeriod", type: "uint256" },
          {
            internalType: "uint256",
            name: "deadlineDuration",
            type: "uint256",
          },
          {
            internalType: "contract IERC20",
            name: "paymentToken",
            type: "address",
          },
          { internalType: "address", name: "channelHost", type: "address" },
          { internalType: "address", name: "protocolAddr", type: "address" },
        ],
        internalType:
          "struct CommunityCurationLiqManager.CommunityCurationConfig",
        name: "_tokenConfig",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "creator", type: "address" },
          { internalType: "string", name: "contentURI", type: "string" },
        ],
        internalType: "struct IDan.ContentZero",
        name: "_contentZero",
        type: "tuple",
      },
    ],
    name: "createTokenDefaultCurve",
    outputs: [
      { internalType: "contract CommunityCuration", name: "", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "danTemplate",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultBondingCurve",
    outputs: [
      { internalType: "contract IBondingCurve", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "getBurnNFTPriceAfterFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "getBurnNFTPriceAndFee",
    outputs: [
      { internalType: "uint256", name: "nftPrice", type: "uint256" },
      { internalType: "uint256", name: "protocolFee", type: "uint256" },
      { internalType: "uint256", name: "channelHostFee", type: "uint256" },
      { internalType: "uint256", name: "creatorFee", type: "uint256" },
      { internalType: "uint256", name: "totalCuratorFee", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "getMintNFTPriceAfterFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "getMintNFTPriceAndFee",
    outputs: [
      { internalType: "uint256", name: "nftPrice", type: "uint256" },
      { internalType: "uint256", name: "protocolFee", type: "uint256" },
      { internalType: "uint256", name: "channelHostFee", type: "uint256" },
      { internalType: "uint256", name: "creatorFee", type: "uint256" },
      { internalType: "uint256", name: "totalCuratorFee", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "getMintNFTPriceFromUniV3",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "getTokenInfo",
    outputs: [
      {
        components: [
          { internalType: "contract Dan", name: "dan", type: "address" },
          {
            internalType: "contract CommunityCuration",
            name: "token",
            type: "address",
          },
          {
            internalType: "contract IERC20",
            name: "paymentToken",
            type: "address",
          },
          {
            internalType: "contract IBondingCurve",
            name: "bondingCurve",
            type: "address",
          },
          {
            internalType: "contract Treasury",
            name: "treasury",
            type: "address",
          },
          { internalType: "address", name: "creator", type: "address" },
          { internalType: "uint256", name: "totalLiquidity", type: "uint256" },
          { internalType: "bool", name: "graduated", type: "bool" },
        ],
        internalType: "struct CommunityCurationLiqManager.TokenInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
    ],
    name: "graduate",
    outputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint128", name: "liquidity", type: "uint128" },
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "address", name: "_account", type: "address" },
    ],
    name: "grantDanSignerRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint256", name: "_maxPayment", type: "uint256" },
    ],
    name: "mintNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint256", name: "_paymentAmount", type: "uint256" },
    ],
    name: "mintNFTFromUniV3",
    outputs: [
      { internalType: "uint256", name: "tokenAmountOut", type: "uint256" },
    ],
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
    name: "protocolFeeAddr",
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
    inputs: [],
    name: "requestOwnershipHandover",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "address", name: "_account", type: "address" },
    ],
    name: "revokeDanSignerRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "degencastLiquidityFeeBip",
        type: "uint256",
      },
      { internalType: "uint256", name: "degencastFeeBip", type: "uint256" },
      { internalType: "uint256", name: "channelHostFeeBip", type: "uint256" },
      { internalType: "uint256", name: "creatorFeeBip", type: "uint256" },
      { internalType: "uint256", name: "curatorFeeBip", type: "uint256" },
    ],
    name: "setFeeBip",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "tokenCreators",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenTemplate",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "tokens",
    outputs: [
      { internalType: "contract Dan", name: "dan", type: "address" },
      {
        internalType: "contract CommunityCuration",
        name: "token",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "contract IBondingCurve",
        name: "bondingCurve",
        type: "address",
      },
      { internalType: "contract Treasury", name: "treasury", type: "address" },
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "uint256", name: "totalLiquidity", type: "uint256" },
      { internalType: "bool", name: "graduated", type: "bool" },
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
    inputs: [],
    name: "uniswapV3Factory",
    outputs: [
      { internalType: "contract IUniswapV3Factory", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_danTemplate", type: "address" },
    ],
    name: "updateDanTemplate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_token", type: "address" },
      {
        internalType: "uint256",
        name: "_maxTokensPerIdPerUser",
        type: "uint256",
      },
    ],
    name: "updateMaxTokensPerIdPerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "bool", name: "_allowed", type: "bool" },
    ],
    name: "updateTokenCreator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenTemplate", type: "address" },
    ],
    name: "updateTokenTemplate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
    ],
    name: "withdrawFee",
    outputs: [
      { internalType: "uint256", name: "paymentTokenAmount", type: "uint256" },
      {
        internalType: "uint256",
        name: "schellingTokenAmount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
