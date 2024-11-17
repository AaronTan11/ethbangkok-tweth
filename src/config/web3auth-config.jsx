"use client";

import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { AuthAdapter } from "@web3auth/auth-adapter";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";

// Chain Configuration
function getChainConfig() {
  return {
    chainId: "0xaa36a7",
    displayName: "Ethereum Sepolia",
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    tickerName: "Ethereum Sepolia",
    ticker: "ETH",
    rpcTarget: "https://rpc.ankr.com/eth_sepolia",
    blockExplorerUrl: "https://sepolia.etherscan.io",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  };
}

// Private Key Provider
function createPrivateKeyProvider(chainConfig) {
  return new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });
}

// Web3Auth Options
function getWeb3AuthOptions(chainConfig, privateKeyProvider) {
  return {
    chainConfig,
    clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "BPJGyd80hz48YgMjZZnB2CJvJVlWFs2pym4Delk2TOp6G0sxXJvMlFl1EHQ271NnFRHkXco5obFJfH1bVA-KeWE",
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    uiConfig: {
      uxMode: "popup",
      appName: "TwETH",
      appUrl: "https://tweth.vercel.app",
      theme: { primary: "#7ed6df" },
      logoLight: "/tweth.png",
      logoDark: "/tweth.png",
      defaultLanguage: "en",
      mode: "auto",
      useLogoLoader: true,
      primaryButton: "externalLogin",
    },
    privateKeyProvider: privateKeyProvider,
    sessionTime: 86400,
  };
}

// Auth Adapter
function createAuthAdapter() {
  return new AuthAdapter({
    loginSettings: { mfaLevel: "optional" },
    adapterSettings: {
      uxMode: "popup",
      whiteLabel: {
        logoLight: "/tweth.png",
        logoDark: "/tweth.png",
        defaultLanguage: "en",
        mode: "dark",
      },
    },
  });
}

// Wallet Services Plugin
function createWalletServicesPlugin() {
  return new WalletServicesPlugin();
  //   {
  //   wsEmbedOpts: {
  //     // web3AuthClientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
  //   },
  //   walletInitOptions: {
  //     whiteLabel: { showWidgetButton: true },
  //   },
  // }
}

// Get Wallet Adapters
async function getWalletAdapters(web3AuthOptions) {
  return await getDefaultExternalAdapters({ options: web3AuthOptions });
}

const chainConfig = getChainConfig();
const privateKeyProvider = createPrivateKeyProvider(chainConfig);
const web3AuthOptions = getWeb3AuthOptions(chainConfig, privateKeyProvider);
const authAdapter = createAuthAdapter();
const walletServicesPlugin = createWalletServicesPlugin();
// const walletAdapters = await getWalletAdapters(web3AuthOptions);

const web3AuthConfig ={
  web3AuthOptions,
  adapters: [authAdapter],
  plugins: [walletServicesPlugin],
};
// Exports
export { web3AuthConfig, getChainConfig, getWeb3AuthOptions };
