import { createWalletClient, createPublicClient, custom, formatEther, parseEther } from "viem";
import { mainnet, polygonAmoy, sepolia } from "viem/chains";

export default class EthereumRpc {
  provider;

  contractABI = [
    {
      inputs: [{ internalType: "string", name: "initMessage", type: "string" }],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "message",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "newMessage", type: "string" }],
      name: "update",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  deployedContractAddress = null;

  contractByteCode =
    "0x60806040523480156200001157600080fd5b5060405162000bee38038062000bee8339818101604052810190620000379190620001e3565b80600090816200004891906200047f565b505062000566565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620000b9826200006e565b810181811067ffffffffffffffff82111715620000db57620000da6200007f565b5b80604052505050565b6000620000f062000050565b9050620000fe8282620000ae565b919050565b600067ffffffffffffffff8211156200012157620001206200007f565b5b6200012c826200006e565b9050602081019050919050565b60005b83811015620001595780820151818401526020810190506200013c565b60008484015250505050565b60006200017c620001768462000103565b620000e4565b9050828152602081018484840111156200019b576200019a62000069565b5b620001a884828562000139565b509392505050565b600082601f830112620001c857620001c762000064565b5b8151620001da84826020860162000165565b91505092915050565b600060208284031215620001fc57620001fb6200005a565b5b600082015167ffffffffffffffff8111156200021d576200021c6200005f565b5b6200022b84828501620001b0565b91505092915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200028757607f821691505b6020821081036200029d576200029c6200023f565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620003077fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620002c8565b620003138683620002c8565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620003606200035a62000354846200032b565b62000335565b6200032b565b9050919050565b6000819050919050565b6200037c836200033f565b620003946200038b8262000367565b848454620002d5565b825550505050565b600090565b620003ab6200039c565b620003b881848462000371565b505050565b5b81811015620003e057620003d4600082620003a1565b600181019050620003be565b5050565b601f8211156200042f57620003f981620002a3565b6200040484620002b8565b8101602085101562000414578190505b6200042c6200042385620002b8565b830182620003bd565b50505b505050565b600082821c905092915050565b6000620004546000198460080262000434565b1980831691505092915050565b60006200046f838362000441565b9150826002028217905092915050565b6200048a8262000234565b67ffffffffffffffff811115620004a657620004a56200007f565b5b620004b282546200026e565b620004bf828285620003e4565b600060209050601f831160018114620004f75760008415620004e2578287015190505b620004ee858262000461565b8655506200055e565b601f1984166200050786620002a3565b60005b8281101562000531578489015182556001820191506020850194506020810190506200050a565b868310156200055157848901516200054d601f89168262000441565b8355505b6001600288020188555050505b505050505050565b61067880620005766000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80633d7403a31461003b578063e21f37ce14610057575b600080fd5b61005560048036038101906100509190610270565b610075565b005b61005f610088565b60405161006c9190610338565b60405180910390f35b80600090816100849190610570565b5050565b6000805461009590610389565b80601f01602080910402602001604051908101604052809291908181526020018280546100c190610389565b801561010e5780601f106100e35761010080835404028352916020019161010e565b820191906000526020600020905b8154815290600101906020018083116100f157829003601f168201915b505050505081565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61017d82610134565b810181811067ffffffffffffffff8211171561019c5761019b610145565b5b80604052505050565b60006101af610116565b90506101bb8282610174565b919050565b600067ffffffffffffffff8211156101db576101da610145565b5b6101e482610134565b9050602081019050919050565b82818337600083830152505050565b600061021361020e846101c0565b6101a5565b90508281526020810184848401111561022f5761022e61012f565b5b61023a8482856101f1565b509392505050565b600082601f8301126102575761025661012a565b5b8135610267848260208601610200565b91505092915050565b60006020828403121561028657610285610120565b5b600082013567ffffffffffffffff8111156102a4576102a3610125565b5b6102b084828501610242565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156102f35780820151818401526020810190506102d8565b60008484015250505050565b600061030a826102b9565b61031481856102c4565b93506103248185602086016102d5565b61032d81610134565b840191505092915050565b6000602082019050818103600083015261035281846102ff565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806103a157607f821691505b6020821081036103b4576103b361035a565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261041c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826103df565b61042686836103df565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600061046d6104686104638461043e565b610448565b61043e565b9050919050565b6000819050919050565b61048783610452565b61049b61049382610474565b8484546103ec565b825550505050565b600090565b6104b06104a3565b6104bb81848461047e565b505050565b5b818110156104df576104d46000826104a8565b6001810190506104c1565b5050565b601f821115610524576104f5816103ba565b6104fe846103cf565b8101602085101561050d578190505b610521610519856103cf565b8301826104c0565b50505b505050565b600082821c905092915050565b600061054760001984600802610529565b1980831691505092915050565b60006105608383610536565b9150826002028217905092915050565b610579826102b9565b67ffffffffffffffff81111561059257610591610145565b5b61059c8254610389565b6105a78282856104e3565b600060209050601f8311600181146105da57600084156105c8578287015190505b6105d28582610554565b86555061063a565b601f1984166105e8866103ba565b60005b82811015610610578489015182556001820191506020850194506020810190506105eb565b8683101561062d5784890151610629601f891682610536565b8355505b6001600288020188555050505b50505050505056fea2646970667358221220eecabaeaef849ff90aa73071525a5fa1972cd301476f7718a27010569d13051264736f6c63430008120033";

  constructor(provider) {
    this.provider = provider;
  }

  getViewChain() {
    switch (this.provider.chainId) {
      case "1":
        return mainnet;
      case "0x13882":
        return polygonAmoy;
      case "0xaa36a7":
        return sepolia;
      default:
        return mainnet;
    }
  }

  async getChainId(){
    try {
      const walletClient = createWalletClient({
        transport: custom(this.provider),
      });

      const address = await walletClient.getAddresses();
      console.log(address);

      const chainId = await walletClient.getChainId();
      return chainId.toString();
    } catch (error) {
      return error;
    }
  }

  async getAddresses(){
    try {
      const walletClient = createWalletClient({
        chain: this.getViewChain(),
        transport: custom(this.provider),
      });

      return await walletClient.getAddresses();
    } catch (error) {
      return error;
    }
  }

  async getAccounts(){
    try {
      const address = this.getAddresses();

      return address;
    } catch (error) {
      return error;
    }
  }

  async getPrivateKey(){
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });

      return privateKey;
    } catch (error) {
      return error;
    }
  }

  async getBalance(){
    try {
      const publicClient = createPublicClient({
        chain: this.getViewChain(),
        transport: custom(this.provider),
      });

      const address = await this.getAccounts();
      const balance = await publicClient.getBalance({ address: address[0] });
      return formatEther(balance);
    } catch (error) {
      return error;
    }
  }

  async sendTransaction(){
    try {
      const publicClient = createPublicClient({
        chain: this.getViewChain(),
        transport: custom(this.provider),
      });

      const walletClient = createWalletClient({
        chain: this.getViewChain(),
        transport: custom(this.provider),
      });

      // data for the transaction
      const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";
      const amount = parseEther("0.0001");
      const address = await this.getAccounts();

      // Submit transaction to the blockchain
      const hash = await walletClient.sendTransaction({
        account: address[0],
        to: destination,
        value: amount,
      });
      console.log(hash);
      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      return this.toObject(receipt);
    } catch (error) {
      return error;
    }
  }

  async signTransaction(){
    try {
      const walletClient = createWalletClient({
        chain: this.getViewChain(),
        transport: custom(this.provider),
      });

      // data for the transaction
      const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";
      const amount = parseEther("0.0001");
      const account = await walletClient.getAddresses();

      const request = await walletClient.prepareTransactionRequest({
        account: account[0],
        to: destination,
        value: amount,
      });

      // Sign the transaction
      const signature = await walletClient.signTransaction(request);
      console.log(signature);

      return this.toObject(signature);
    } catch (error) {
      return error;
    }
  }

  async signMessage() {
    try {
      const walletClient = createWalletClient({
        chain: this.getViewChain(),
        transport: custom(this.provider),
      });

      // data for signing
      const address = await this.getAccounts();
      const originalMessage = "YOUR_MESSAGE";

      // Sign the message
      const hash = await walletClient.signMessage({
        account: address[0],
        message: originalMessage,
      });

      console.log(hash);

      return hash.toString();
    } catch (error) {
      return error;
    }
  }

  async signTypedDataMessage() {
    try {
      const walletClient = createWalletClient({
        chain: this.getViewChain(),
        transport: custom(this.provider),
      });

      // data for signing
      const address = await this.getAccounts();
      const signature = await walletClient.signTypedData({
        account: address[0],
        domain: {
          name: "Ether Mail",
          version: "1",
          chainId: 11155111,
          verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
        },
        types: {
          Person: [
            { name: "name", type: "string" },
            { name: "wallet", type: "address" },
          ],
          Mail: [
            { name: "from", type: "Person" },
            { name: "to", type: "Person" },
            { name: "contents", type: "string" },
          ],
        },
        primaryType: "Mail",
        message: {
          from: {
            name: "Cow",
            wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
          },
          to: {
            name: "Bob",
            wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
          },
          contents: "Hello, Bob!",
        },
      });

      console.log(signature);

      return signature.toString();
    } catch (error) {
      return error;
    }
  }

  async deployContract() {
    const publicClient = createPublicClient({
      chain: this.getViewChain(),
      transport: custom(this.provider),
    });

    const walletClient = createWalletClient({
      chain: this.getViewChain(),
      transport: custom(this.provider),
    });

    const [account] = await walletClient.getAddresses();
    const hash = await walletClient.deployContract({
      abi: this.contractABI,
      account,
      bytecode: this.contractByteCode,
      args: ["Hello World!"],
    });
    console.log(hash);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log(receipt);
    if (!receipt.contractAddress) {
      throw new Error("Contract address not found in the receipt");
    }
    this.deployedContractAddress = receipt.contractAddress;
    return this.toObject(receipt);
  }

  async readContract() {
    try {
      const publicClient = createPublicClient({
        chain: this.getViewChain(),
        transport: custom(this.provider),
      });
      const number = await publicClient.readContract({
        address: "0x8AA6820B3F197384874fAdb355361758258cb981", // Ideally, this.deployedContractAddress,
        abi: this.contractABI,
        functionName: "message",
      });

      return this.toObject(number);
    } catch (error) {
      return error;
    }
  }

  async writeContract() {
    try {
      const publicClient = createPublicClient({
        chain: this.getViewChain(),
        transport: custom(this.provider),
      });

      const walletClient = createWalletClient({
        chain: this.getViewChain(),
        transport: custom(this.provider),
      });

      const [account] = await walletClient.getAddresses();

      // data for writing to the contract
      const randomNumber = Math.floor(Math.random() * 9000) + 1000;

      // Submit transaction to the blockchain
      const hash = await walletClient.writeContract({
        account,
        address: "0x8AA6820B3F197384874fAdb355361758258cb981", // Ideally, this.deployedContractAddress,
        abi: this.contractABI,
        functionName: "update",
        args: [randomNumber],
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      return this.toObject(receipt);
    } catch (error) {
      return error;
    }
  }

  toObject(data) {
    // can't serialize a BigInt so this hack
    return JSON.parse(
      JSON.stringify(
        data,
        (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
      )
    );
  }
}