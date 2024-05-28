export const AttentionFactory = {
  address: "0x50F4Ec38320A56BAA5144CFceb4aD7dcF0C56d15",
  abi: [
    {
      type: "function",
      name: "deploy",
      inputs: [
        {
          name: "_config",
          type: "tuple",
          internalType: "struct AttentionTokenFactory.DeploymentConfig",
          components: [
            { name: "name", type: "string", internalType: "string" },
            { name: "symbol", type: "string", internalType: "string" },
            {
              name: "basePrice",
              type: "uint128",
              internalType: "uint128",
            },
            {
              name: "linearPriceSlope",
              type: "uint128",
              internalType: "uint128",
            },
            {
              name: "inflectionPrice",
              type: "uint128",
              internalType: "uint128",
            },
            {
              name: "inflectionPoint",
              type: "uint32",
              internalType: "uint32",
            },
            {
              name: "initialTokenSupply",
              type: "uint96",
              internalType: "uint96",
            },
            {
              name: "initialSupplyOwner",
              type: "address",
              internalType: "address",
            },
            {
              name: "payToken",
              type: "address",
              internalType: "contract IERC20",
            },
            {
              name: "tokenAdmin",
              type: "address",
              internalType: "address",
            },
            { name: "adminFee", type: "uint256", internalType: "uint256" },
          ],
        },
      ],
      outputs: [{ name: "", type: "address", internalType: "address" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "owner",
      inputs: [],
      outputs: [{ name: "", type: "address", internalType: "address" }],
      stateMutability: "view",
    },
    {
      type: "event",
      name: "AttentionTokenDeployed",
      inputs: [
        {
          name: "tokenAddress",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
  ],
};
