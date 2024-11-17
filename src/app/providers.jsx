"use client";

import {
  Web3AuthInnerContext,
  Web3AuthProvider,
} from "@web3auth/modal-react-hooks";
import { WalletServicesProvider } from "@web3auth/wallet-services-plugin-react-hooks";
import { web3AuthConfig } from "@/config/web3auth-config";
import { ChatUIProvider, darkChatTheme } from "@pushprotocol/uiweb";

export default function Providers({ children }) {


  return (
    <Web3AuthProvider config={web3AuthConfig}>
      <WalletServicesProvider context={Web3AuthInnerContext}>
        <ChatUIProvider theme={darkChatTheme}>
          {children}
        </ChatUIProvider>
      </WalletServicesProvider>
    </Web3AuthProvider>
  );
}
