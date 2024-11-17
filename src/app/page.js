"use client";
import { useEffect, useState } from "react";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { CHAIN_NAMESPACES, IProvider } from "@web3auth/base";

import MainContent from '@/components/home/MainContent';


// import "./App.css";
// import RPC from "./web3RPC"; // for using web3.js
import RPC from "./viemRPC"; // for using viem
// import RPC from "./ethersRPC"; // for using ethers.js
import { useWalletServicesPlugin } from "@web3auth/wallet-services-plugin-react-hooks";

const newChain = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x89", // hex of 137, polygon mainnet
  rpcTarget: "https://rpc.ankr.com/polygon",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Polygon Mainnet",
  blockExplorerUrl: "https://polygonscan.com",
  ticker: "MATIC",
  tickerName: "MATIC",
  logo: "https://images.toruswallet.io/polygon.svg",
};

function App() {
  const {
    provider,
    web3Auth,
    isConnected,
    connect,
    authenticateUser,
    logout,
    addChain,
    switchChain,
    userInfo,
    isMFAEnabled,
    enableMFA,
    status,
    addAndSwitchChain,
  } = useWeb3Auth();

  const { showCheckout, showWalletConnectScanner, showWalletUI, showSwap, isPluginConnected } = useWalletServicesPlugin();
  const [unloggedInView, setUnloggedInView] = useState(null);
  const [MFAHeader, setMFAHeader] = useState(
    <div>
      <h2>MFA is disabled</h2>
    </div>
  );

  const getChainId = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    uiConsole(chainId);
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    uiConsole(address);
    printUrl(address, "address");
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    uiConsole(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    uiConsole(receipt);
    printUrl(receipt.transactionHash, "transaction");
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    uiConsole(signedMessage);
  };

  const signTypedDataMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signTypedDataMessage();
    uiConsole(signedMessage);
  };

  const signTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signature = await rpc.signTransaction();
    uiConsole(signature);
  };

  const deployContract = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const message = await rpc.deployContract();
    uiConsole(message);
  };

  const readContract = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const message = await rpc.readContract();
    uiConsole(message);
  };

  const writeContract = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.writeContract();
    uiConsole(receipt);
    if (receipt) {
      setTimeout(async () => {
        await readContract();
      }, 10000);
    }
  };

  const getPrivateKey = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole(privateKey);
  };

  const uiConsole = (...args)=> {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  };

  const printUrl = (hash, type) => {
    const explorerLink = `https://sepolia.etherscan.io/${type === "transaction" ? "tx" : "address"}/${hash}`;
    const anchor = `<a href="${explorerLink}" target="_blank" rel="noopener noreferrer">${hash}</a>`;

    const consoleElement = document.querySelector("#console>p");
    if (consoleElement) {
      consoleElement.innerHTML = anchor;
    }
  };

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button
            onClick={() => {
              uiConsole(userInfo);
            }}
            className="card"
          >
            Get User Info
          </button>
        </div>
        <div>
          <button
            onClick={async () => {
              const { idToken } = await authenticateUser();
              uiConsole(idToken);
            }}
            className="card"
          >
            Get ID Token
          </button>
        </div>
        <div>
          <button
            disabled={isMFAEnabled}
            onClick={async () => {
              try {
                await enableMFA();
              } catch (e) {
                uiConsole(e);
              }
            }}
            className="card"
          >
            Enable MFA
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              if (isPluginConnected) {
                showWalletUI();
              }
            }}
            className="card"
          >
            Show Wallet UI
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              if (isPluginConnected) {
                showWalletConnectScanner();
              }
            }}
            className="card"
          >
            Show Wallet Connect
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              if (isPluginConnected) {
                uiConsole("Show Checkout doesn't work in Testnet network, please switch to mainnet. Click Add and Switch Chain button first.");
                showCheckout({
                  show: true,
                });
              }
            }}
            className="card"
          >
            Show Checkout
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              if (isPluginConnected) {
                showSwap({
                  show: true,
                });
              }
            }}
            className="card"
          >
            Show Swap
          </button>
        </div>
        <div>
          <button onClick={getChainId} className="card">
            Get Chain ID
          </button>
        </div>
        <div>
          <button
            onClick={async () => {
              try {
                await addAndSwitchChain(newChain);
                uiConsole("New Chain Added and Switched");
              } catch (error) {
                uiConsole(error);
              }
            }}
            className="card"
          >
            Add and Switch Chain
          </button>
        </div>
        <div>
          <button
            onClick={async () => {
              try {
                await addChain(newChain);
                uiConsole("New Chain Added");
              } catch (error) {
                uiConsole(error);
              }
            }}
            className="card"
          >
            Add Chain
          </button>
        </div>
        <div>
          <button
            onClick={async () => {
              try {
                await switchChain({ chainId: newChain.chainId });
                uiConsole("Switched to new Chain");
              } catch (error) {
                uiConsole(error);
              }
            }}
            className="card"
          >
            Switch Chain
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Personal Sign Message
          </button>
        </div>
        <div>
          <button onClick={signTypedDataMessage} className="card">
            signTypedData Message
          </button>
        </div>
        <div>
          <button onClick={signTransaction} className="card">
            Sign Transaction
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              const receipt = deployContract();
              uiConsole(receipt);
            }}
            className="card"
          >
            Deploy Contract
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              const message = readContract();
              uiConsole(message);
            }}
            className="card"
          >
            Read Contract
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              const message = writeContract();
              uiConsole(message);
            }}
            className="card"
          >
            Write Contract
          </button>
        </div>
        <div>
          <button onClick={getPrivateKey} className="card">
            Get Private Key
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              logout();
            }}
            className="card"
          >
            Log Out
          </button>
        </div>
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  useEffect(() => {
    setUnloggedInView(
      <div>
        <h2>Web3Auth hook status: {status}</h2>
        <h2>Web3Auth status: {web3Auth?.status}</h2>
        <button onClick={connect} className="card">
          Login
        </button>
      </div>
    );
  }, [connect, status, web3Auth]);

  useEffect(() => {
    if (isMFAEnabled) {
      setMFAHeader(
        <div>
          <h2>MFA is enabled</h2>
        </div>
      );
    }
  }, [isMFAEnabled]);

  return (
    <>
      {/* <div className="container">
        <div className="container" style={{ textAlign: "center" }}>
        {isConnected && MFAHeader}
      </div>

        <div className="grid">
          {isConnected ? loggedInView : unloggedInView}
        </div>
      </div> */}
      <div className="p-6 mx-auto text-center">

      <button onClick={() => { window.location.href = '/stream'; }} className="bg-[#6542A3] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
        Start Streaming
      </button>
      </div>
      <MainContent />
    </>
  );
}

export default App;