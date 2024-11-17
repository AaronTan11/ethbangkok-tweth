// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhenixprotocol/contracts/FHE.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DealRoom is Ownable {
    struct Room {
        string name;
        address creator;
        address participant;
        euint32 dealValue;
        euint32 minimumAcceptablePrice;
        bool isActive;
        uint256 createdAt;
        RoomStatus status;
    }

    enum RoomStatus {
        Pending,
        Active,
        Completed,
        Cancelled
    }

    mapping(uint256 => Room) public rooms;
    uint256 public roomCount;

    event RoomCreated(uint256 indexed roomId, string name, address creator, address participant);
    event DealValueUpdated(uint256 indexed roomId);
    event RoomStatusUpdated(uint256 indexed roomId, RoomStatus status);

    constructor() Ownable(msg.sender) {}

    function createRoom(
        string memory _name,
        address _participant,
        inEuint32 memory encryptedDealValue,
        inEuint32 memory encryptedMinPrice
    ) external returns (uint256) {
        require(_participant != address(0), "Invalid participant address");
        
        uint256 roomId = roomCount + 1;
        
        rooms[roomId] = Room({
            name: _name,
            creator: msg.sender,
            participant: _participant,
            dealValue: FHE.asEuint32(encryptedDealValue),
            minimumAcceptablePrice: FHE.asEuint32(encryptedMinPrice),
            isActive: true,
            createdAt: block.timestamp,
            status: RoomStatus.Pending
        });

        roomCount++;

        emit RoomCreated(roomId, _name, msg.sender, _participant);
        return roomId;
    }

    function updateDealValue(uint256 _roomId, inEuint32 memory newEncryptedValue) external {
        Room storage room = rooms[_roomId];
        require(msg.sender == room.creator || msg.sender == room.participant, "Unauthorized");
        require(room.isActive, "Room not active");

        room.dealValue = FHE.asEuint32(newEncryptedValue);
        emit DealValueUpdated(_roomId);
    }

    function compareOffer(uint256 _roomId, inEuint32 memory encryptedOffer) public view returns (bool) {
        Room storage room = rooms[_roomId];
        euint32 offer = FHE.asEuint32(encryptedOffer);
        
        // Get encrypted comparison result and decrypt it
        ebool comparison = FHE.gte(offer, room.minimumAcceptablePrice);
        return FHE.decrypt(comparison);
    }

    function updateRoomStatus(uint256 _roomId, RoomStatus _status) external {
        Room storage room = rooms[_roomId];
        require(msg.sender == room.creator, "Only creator can update status");
        require(room.isActive, "Room not active");

        room.status = _status;
        if (_status == RoomStatus.Completed || _status == RoomStatus.Cancelled) {
            room.isActive = false;
        }

        emit RoomStatusUpdated(_roomId, _status);
    }

    function getRoomDetails(uint256 _roomId) external view returns (
        string memory name,
        address creator,
        address participant,
        bool isActive,
        uint256 createdAt,
        RoomStatus status
    ) {
        Room storage room = rooms[_roomId];
        return (
            room.name,
            room.creator,
            room.participant,
            room.isActive,
            room.createdAt,
            room.status
        );
    }
}