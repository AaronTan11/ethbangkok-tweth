import { FhenixClient } from "fhenixjs";
import { JsonRpcProvider, Contract, BrowserProvider } from "ethers";

const DEAL_ROOM_ADDRESS = "0x3B414368Ba0b5E3244aCfBd2005B686be168e08B";
const DEAL_ROOM_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_participant",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					},
					{
						"internalType": "int32",
						"name": "securityZone",
						"type": "int32"
					}
				],
				"internalType": "struct inEuint32",
				"name": "encryptedDealValue",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					},
					{
						"internalType": "int32",
						"name": "securityZone",
						"type": "int32"
					}
				],
				"internalType": "struct inEuint32",
				"name": "encryptedMinPrice",
				"type": "tuple"
			}
		],
		"name": "createRoom",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roomId",
				"type": "uint256"
			}
		],
		"name": "DealValueUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roomId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "participant",
				"type": "address"
			}
		],
		"name": "RoomCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roomId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum DealRoom.RoomStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"name": "RoomStatusUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_roomId",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					},
					{
						"internalType": "int32",
						"name": "securityZone",
						"type": "int32"
					}
				],
				"internalType": "struct inEuint32",
				"name": "newEncryptedValue",
				"type": "tuple"
			}
		],
		"name": "updateDealValue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_roomId",
				"type": "uint256"
			},
			{
				"internalType": "enum DealRoom.RoomStatus",
				"name": "_status",
				"type": "uint8"
			}
		],
		"name": "updateRoomStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_roomId",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					},
					{
						"internalType": "int32",
						"name": "securityZone",
						"type": "int32"
					}
				],
				"internalType": "struct inEuint32",
				"name": "encryptedOffer",
				"type": "tuple"
			}
		],
		"name": "compareOffer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_roomId",
				"type": "uint256"
			}
		],
		"name": "getRoomDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "createdAt",
				"type": "uint256"
			},
			{
				"internalType": "enum DealRoom.RoomStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "roomCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "rooms",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
			{
				"internalType": "euint32",
				"name": "dealValue",
				"type": "uint256"
			},
			{
				"internalType": "euint32",
				"name": "minimumAcceptablePrice",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "createdAt",
				"type": "uint256"
			},
			{
				"internalType": "enum DealRoom.RoomStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


export class DealRoomService {
  constructor(provider) {
    // Keep the injected provider for signing transactions
    this.web3Provider = new BrowserProvider(provider);
    // Use RPC provider for read operations
    this.rpcProvider = new JsonRpcProvider("https://api.nitrogen.fhenix.zone");
    this.fhenix = null;
    this.initialized = false;
    this.contract = new Contract(DEAL_ROOM_ADDRESS, DEAL_ROOM_ABI, this.rpcProvider);
  }

  async initialize() {
    if (this.initialized) return;
    try {
      this.fhenix = new FhenixClient({ 
        provider: this.rpcProvider
      });
      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize Fhenix client:", error);
      throw error;
    }
  }

  async createRoom(name, participantAddress, dealValue, minPrice) {
    await this.initialize();
    try {
      const signer = await this.web3Provider.getSigner();
      const contractWithSigner = this.contract.connect(signer);

      // Convert to numbers before encryption
      const dealValueNumber = Number(dealValue);
      const minPriceNumber = Number(minPrice);

      // Encrypt values using FhenixJS
      const encryptedDealValue = await this.fhenix.encrypt_uint32(dealValueNumber);
      const encryptedMinPrice = await this.fhenix.encrypt_uint32(minPriceNumber);

      const tx = await contractWithSigner.createRoom(
        name, 
        participantAddress, 
        encryptedDealValue, 
        encryptedMinPrice
      );
      
      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      console.error("Error creating room:", error);
      throw error;
    }
  }

  // Read operations can use the RPC provider (no changes needed)
  async compareOffer(roomId, offerAmount) {
    await this.initialize();
    try {
      const offerNumber = Number(offerAmount);
      const encryptedOffer = await this.fhenix.encrypt_uint32(offerNumber);

      const result = await this.contract.compareOffer(roomId, encryptedOffer);
      return result;
    } catch (error) {
      console.error("Error comparing offer:", error);
      throw error;
    }
  }

  async updateRoomStatus(roomId, status) {
    await this.initialize();
    try {
      const signer = await this.web3Provider.getSigner();
      const contractWithSigner = this.contract.connect(signer);

      const tx = await contractWithSigner.updateRoomStatus(roomId, status);
      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      console.error("Error updating room status:", error);
      throw error;
    }
  }

  // Read operations can use the RPC provider (no changes needed)
  async getRoomDetails(roomId) {
    await this.initialize();
    try {
      const result = await this.contract.getRoomDetails(roomId);
      return {
        name: result[0],
        creator: result[1],
        participant: result[2],
        isActive: result[3],
        createdAt: result[4],
        status: result[5]
      };
    } catch (error) {
      console.error("Error getting room details:", error);
      throw error;
    }
  }

  async getAllRooms() {
    await this.initialize();
    try {
      // First get the total room count
      const count = await this.contract.roomCount();
      const rooms = [];

      // Fetch details for each room
      for (let i = 0; i < count; i++) {
        const result = await this.contract.getRoomDetails(i);
        rooms.push({
          id: i,
          name: result[0],
          creator: result[1],
          participant: result[2],
          isActive: result[3],
          createdAt: new Date(Number(result[4]) * 1000).toISOString(),
          status: this.getStatusString(result[5]),
          features: {
            video: true,
            chat: true,
            documents: true
          }
        });
      }

      return rooms;
    } catch (error) {
      console.error("Error getting all rooms:", error);
      throw error;
    }
  }

  getStatusString(status) {
    const statusMap = {
      0: "pending",
      1: "active",
      2: "completed",
      3: "cancelled"
    };
    return statusMap[status] || "unknown";
  }
}