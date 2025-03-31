import Token from "./ABI/ERC20Token.json";
import Money_IDO from "./ABI/Money_IDO.json";
import { defineChain } from "@reown/appkit/networks";
// 正式
export const isMain = false;
export const curentBSCChainId: number = isMain ? 56 : 97;
export const curentETHChainId: number = isMain ? 1 : 17000;

export const LOCAL_KEY = "PIJS_LANG";
export let baseUrl: string = isMain
  ? `https://pijswap.xyz/pjisswap-api`
  : // "http://192.168.1.37:28856/";
    "https://oraai.io/api/";
// "http://47.119.120.177:28856/";

export let ContractUrl: string = isMain
  ? "https://bscscan.com/address/"
  : "https://testnet.bscscan.com/address/";
export let BlockUrl: string = isMain
  ? "https://bscscan.com/tx/"
  : "https://testnet.bscscan.com/tx/";
export const BitNumber = 8;
export const GoTo = "https://node.pijswap.com/";
// Documentation
export const Documentation = "https://pijswap.gitbook.io/pijswap";
// InviteRebateKOLApplication
export const InviteRebateKOLApplication = "https://pijswap.gitbook.io/pijswap";
// TermsofService
export const TermsofService =
  "https://pijswap.gitbook.io/pijswap/terms-of-service";
// TokenEconomicModel
export const TokenEconomicModel =
  "https://pijswap.gitbook.io/pijswap/token-economic-model";
//@ts-ignore
export const customNetwork_BSC = defineChain({
  id: 56,
  caipNetworkId: "eip155:56",
  chainNamespace: "eip155",
  name: "BSC",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  rpcUrls: {
    default: {
      http: ["https://bsc-dataseed.binance.org"],
      webSocket: ["WS_RPC_URL"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://bscscan.com",
    },
  },
});

export const customNetwork_BSC_TEST = defineChain({
  id: 97,
  caipNetworkId: "eip155:97",
  chainNamespace: "eip155",
  name: "BSC",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  rpcUrls: {
    default: {
      http: ["https://bsc-testnet-rpc.publicnode.com"],
      webSocket: ["WS_RPC_URL"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://data-seed-prebsc-2-s1.bnbchain.org:8545",
    },
  },
});

export const defaultNetwork: any = {
  chainId: 656898,
  name: "UNI",
  currency: "UAC",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "http://chain.uniagent.co/",
};
export const loginNetworkId = [
  { id: isMain ? 56 : 97, name: "BSC" },
  { id: isMain ? 1 : 17000, name: "Ethereum" },
];

interface abiObjType {
  [propName: string]: any;
}

interface contractAddressType {
  [propName: string]: string;
}

export const abiObj: abiObjType = {
  USDT: Token,
  Money: Token,
  Money_IDO: Money_IDO,
};

export const Main: contractAddressType = {
  USDTBSC: "0x55d398326f99059fF775485246999027B3197955",
  BridgeBSC: "0x6f7cDbB867088D5945b465726834a782a2c0D7D0",
  USDTUNI: "0x74cA830003Bc76693830d37DCcE9C56be78Ae66C",
  BridgeUNI: "0x68d1CbEF2D485052385dD2a209F6F105528838B5",
  PIJSBSC: "0x74cA830003Bc76693830d37DCcE9C56be78Ae66C",
  PiBSC: "0x74cA830003Bc76693830d37DCcE9C56be78Ae66C",
  UACFactory: "0x55D3a5458be5AFc639858825FaBc34CD3D5a6117",
  WUAC: "0x001C41f7b0cB226a19dfBEc7a18C8a8DA249eC46",
  UACRouter: "0x51d5273F6Eb69e37C86De5bDCF6efb0424255A5a",
  WBNB: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
  PIJSFactory: "0x748C54e7bd5592F755DDFFE6Ad59b6Ef519E0635",
  PIJSRouter: "0x83728DF7204BDbDE3cd23122a224F36C0Dbd6892",
};

const Test = {
  USDT: "0x2b11640f31b84dc727841FE6B5a905D366A00e78",
  Money: "0xA0385e50e80D8e6c147e14354A8d38E2fD2b91a7",
  Money_IDO: "0xA83bbcf9Dfe88FF073EA920A4BAEEB1ceBA67191",
};
export const contractAddress: contractAddressType = isMain ? Main : Test;
