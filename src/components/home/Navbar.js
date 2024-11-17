import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import RPC from "@/app/viemRPC";

const Navbar = () => {
  const { isConnected, provider, connect, logout } = useWeb3Auth();
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (isConnected && provider) {
      getAccounts();
    }
  }, [isConnected, provider]);

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    setAddress(address);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address).then(() => {
      alert("Address copied to clipboard!");
    });
  };

  return (
    <nav className="flex items-center justify-between bg-white text-black p-2">
      <div className="flex items-center">
        <Image src="/tweth.png" alt="Twitch Logo" width={100} height={32} />
        <span className="ml-4">Browse</span>
      </div>
      <div className="flex-grow mx-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-200 text-black p-2 rounded"
        />
      </div>
      <div className="flex items-center">
        {isConnected ? (
          <div className="flex items-center">
            <span className="mr-2">{address ? `${address.toString().slice(0, 6)}...${address.toString().slice(-4)}` : 'Loading...'}</span>
            <button onClick={copyAddress} className="p-2 rounded mr-2" title="Copy Address">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
            <button onClick={logout} className="p-2 rounded" title="Log Out">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        ) : (
          <button onClick={connect} className="bg-[#5F41A0] text-white px-4 py-1 rounded mr-2">Log In</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;