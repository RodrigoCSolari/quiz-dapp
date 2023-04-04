import quizTokenAbi from "./quizTokenAbi.json";

export const getConfig = () => {
  const env = process.env.NEXT_PUBLIC_VERCEL_ENV || "goerli";
  const tokenQuizAddressGoerli =
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_GOERLI ||
    "0x437eF217203452317C3C955Cf282b1eE5F6aaF72";

  switch (env) {
    case "mainnet":
      return {
        abi: quizTokenAbi,
        blockExplorerUrls: ["https://etherscan.io"],
        chainId: "0x1",
        chainName: "Homestead",
        nativeCurrency: {
          decimals: 18,
          name: "Ether",
          symbol: "ETH",
        },
        rpcUrls: [
          "https://eth-mainnet.g.alchemy.com/v2",
          "https://mainnet.infura.io/v3",
          "https://cloudflare-eth.com",
        ],
        tokenQuizAddress: "",
      };
    case "goerli":
      return {
        abi: quizTokenAbi,
        blockExplorerUrls: ["https://goerli.etherscan.io"],
        chainId: "0x5",
        chainName: "Goerli",
        nativeCurrency: {
          decimals: 18,
          name: "Goerli Ether",
          symbol: "ETH",
        },
        rpcUrls: [
          "https://eth-goerli.g.alchemy.com/v2",
          "https://rpc.ankr.com/eth_goerli",
          "https://goerli.infura.io/v3",
        ],
        tokenQuizAddress: tokenQuizAddressGoerli,
      };
    case "localhost":
      return {
        abi: quizTokenAbi,
        blockExplorerUrls: ["http://127.0.0.1:8545"],
        chainId: "0x539",
        chainName: "Localhost",
        nativeCurrency: {
          decimals: 18,
          name: "Ether",
          symbol: "ETH",
        },
        rpcUrls: ["http://127.0.0.1:8545"],
        tokenQuizAddress: "",
      };
    default:
      throw Error(
        `Unconfigured environment '${env}'. Can be configured in src/config.js.`
      );
  }
};
