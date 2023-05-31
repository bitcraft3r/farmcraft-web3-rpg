// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

// TODO: Add new fn harvestAllReadyCrops().
// TODO: Add other getter functions & events where necessary to help keep track of state of the farmer
// TODO: Add multiplayer mini-game

contract FarmCraft is ERC721, Ownable {
    using EnumerableSet for EnumerableSet.UintSet;
    using Counters for Counters.Counter;

    uint256 public nextTokenId;
    uint256 public totalCrops;
    uint256 public totalFarmers;
    uint256 public totalSeeds;
    uint256 public totalCropsSold;
    uint256 public totalGoldEarned;

    uint256 public constant QUEST_DURATION = 1 minutes;
    uint256 public constant SEEDS_FOR_GOLD = 5; // Number of seeds to purchase with 1 GOLD
    uint256 public constant CROPS_FOR_GOLD = 10; // Number of crops to sell for 1 GOLD

    struct Crop {
        uint256 maturityTime;
        uint256 yield;
        uint256 plantedAt;
        bool harvested;
    }

    struct Farmer {
        address owner;
        uint256 experience;
        uint256[] crops;
        uint256 seeds;
        uint256 gold;
        uint256 cropsEarned;
        uint256 questEndTime;
        bool questActive;
        string imageIpfsHash;
    }

    struct CropType {
        uint256 maturityTime;
        uint256 yield;
        uint256 seedCost;
    }

    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => Crop) private crops;
    mapping(uint256 => Farmer) private farmers;
    mapping(uint256 => CropType) private cropTypes;
    mapping(uint256 => EnumerableSet.UintSet) private farmerCrops;
    mapping(address => bool) private addressMinted;
    mapping(address => uint256) private farmerTokenIds;

    Counters.Counter private cropTypeCounter;

    constructor() ERC721("FarmCraft", "FARMER") {
        nextTokenId = 1;
    }

    // Getter functions for the mappings

    /**
     * @dev Get information about a specific crop.
     * @param cropId The ID of the crop to retrieve.
     * @return The Crop struct representing the crop information.
     */
    function getCrop(uint256 cropId) external view returns (Crop memory) {
        return crops[cropId];
    }

    /**
     * @dev Get information about a specific farmer.
     * @param farmerId The ID of the farmer to retrieve.
     * @return The Farmer struct representing the farmer information.
     */
    function getFarmer(uint256 farmerId) external view returns (Farmer memory) {
        Farmer memory farmer = farmers[farmerId];
        EnumerableSet.UintSet storage farmerCropIds = farmerCrops[farmerId];
        uint256[] memory farmerCropsArr = new uint256[](farmerCropIds.length());
        for (uint256 i = 0; i < farmerCropIds.length(); i++) {
            farmerCropsArr[i] = farmerCropIds.at(i);
        }
        farmer.crops = farmerCropsArr;
        return farmer;
    }

    /**
     * @dev Get information about a specific crop type.
     * @param cropTypeId The ID of the crop type to retrieve.
     * @return The CropType struct representing the crop type information.
     */
    function getCropType(uint256 cropTypeId) external view returns (CropType memory) {
        return cropTypes[cropTypeId];
    }



    /**
     * @dev Get the token ID of the farmer by address.
     * @param farmerAddress The address of the farmer.
     * @return The token ID of the farmer.
     */
    function getFarmerTokenIdByAddress(address farmerAddress) external view returns (uint256) {
        return farmerTokenIds[farmerAddress];
    }
    
    function _initiateMetadata(uint256 farmerId) private {
        Farmer storage farmer = farmers[farmerId];
        _setTokenURI(farmerId, _constructTokenURI(farmerId, farmer));
    }

    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = tokenURI;
    }

    function _constructTokenURI(uint256 tokenId, Farmer memory farmer) private pure returns (string memory) {
        // string memory baseURI = _baseURI();
        string memory name = string(abi.encodePacked("Farmer #", uintToStr(tokenId)));
        string memory description = "FarmCraft Farmer NFTs by Omniv3rse.com.";
        string memory image = string(abi.encodePacked("https://gateway.pinata.cloud/ipfs/", farmer.imageIpfsHash));

        string memory attributes = string(
            abi.encodePacked(
                '[{"trait_type":"Experience","value":',
                uintToStr(farmer.experience),
                '},{"trait_type":"Seeds","value":',
                uintToStr(farmer.seeds),
                '},{"trait_type":"Gold","value":',
                uintToStr(farmer.gold),
                '},{"trait_type":"Crops","value":',
                uintToStr(farmer.cropsEarned),
                '}]'
            )
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name":"',
                        name,
                        '","description":"',
                        description,
                        '","image":"',
                        image,
                        '","attributes":',
                        attributes,
                        '}'
                    )
                )
            )
        );

        // return string(abi.encodePacked(baseURI, json));
        return string(abi.encodePacked('data:application/json;base64,', json));
    }

    /**
     * @dev Mint a new farmer NFT.
     * @param imageIpfsHash The IPFS hash of the farmer's image.
     */
    function mintFarmer(string memory imageIpfsHash) external {
        require(!addressMinted[msg.sender], "Only one farmer per address");

        _safeMint(msg.sender, nextTokenId);
        uint256 farmerId = nextTokenId;
        farmers[nextTokenId] = Farmer(
            msg.sender,
            0,
            new uint256[](0),
            0,
            0,
            0,
            0,
            false,
            imageIpfsHash
        );
        _initiateMetadata(nextTokenId);
        farmerTokenIds[msg.sender] = farmerId;
        nextTokenId++;
        totalFarmers++;
        addressMinted[msg.sender] = true;
    }

    /**
     * @dev Buy seeds using GOLD.
     * @param farmerId The ID of the farmer buying the seeds.
     * @param amount The amount of GOLD used to buy seeds.
     */
    function buySeeds(uint256 farmerId, uint256 amount) external {
        require(ownerOf(farmerId) == msg.sender, "Only farmer owner can buy seeds");

        Farmer storage farmer = farmers[farmerId];
        uint256 seedsToBuy = amount * SEEDS_FOR_GOLD; // Buy 5 seeds per 1 GOLD

        require(farmer.gold >= amount, "Insufficient GOLD");

        farmer.gold -= amount;
        farmer.seeds += seedsToBuy;
        totalSeeds += seedsToBuy;
        _initiateMetadata(farmerId);
    }

    /**
     * @dev Start a foraging quest.
     * @param farmerId The ID of the farmer starting the quest.
     */
    function startForagingQuest(uint256 farmerId) external {
        require(ownerOf(farmerId) == msg.sender, "Only farmer owner can start the quest");
        require(!farmers[farmerId].questActive, "Quest is already active");

        farmers[farmerId].questActive = true;
        farmers[farmerId].questEndTime = block.timestamp + QUEST_DURATION;
        _initiateMetadata(farmerId);
    }

    /**
     * @dev Complete a foraging quest.
     * @param farmerId The ID of the farmer completing the quest.
     */
    function endForagingQuest(uint256 farmerId) external {
        require(ownerOf(farmerId) == msg.sender, "Only farmer owner can end the quest");
        require(farmers[farmerId].questActive, "Quest is not active");
        require(block.timestamp >= farmers[farmerId].questEndTime, "Quest is not yet completed");

        farmers[farmerId].seeds += 1; // Reward 1 SEED for completing the quest
        farmers[farmerId].questActive = false;
        farmers[farmerId].questEndTime = 0;
        totalSeeds++;
        farmers[farmerId].experience += 1; // Increase experience for completing a quest
        _initiateMetadata(farmerId);
    }

    /**
     * @dev Plant a new crop.
     * @param farmerId The ID of the farmer planting the crop.
     * @param cropTypeId The ID of the crop type to plant.
     */
    function plantCrop(uint256 farmerId, uint256 cropTypeId) external {
        require(ownerOf(farmerId) == msg.sender, "Only farmer owner can plant crops");
        require(cropTypeId < cropTypeCounter.current(), "Invalid crop type ID");

        Farmer storage farmer = farmers[farmerId];
        CropType storage cropType = cropTypes[cropTypeId];
        require(farmer.seeds >= cropType.seedCost, "Insufficient SEEDs");

        uint256 cropId = totalCrops;
        crops[cropId] = Crop(cropType.maturityTime, cropType.yield, block.timestamp, false);
        farmerCrops[farmerId].add(cropId);
        farmer.seeds -= cropType.seedCost;
        totalCrops++;
        farmer.experience += 1; // Increase experience for planting a crop
        _initiateMetadata(farmerId);
    }

    /**
     * @dev Harvest a crop.
     * @param farmerId The ID of the farmer harvesting the crop.
     * @param cropId The ID of the crop to harvest.
     */
    function harvestCrop(uint256 farmerId, uint256 cropId) external {
        require(ownerOf(farmerId) == msg.sender, "Only farmer owner can harvest crops");
        require(cropId < totalCrops, "Invalid crop ID");
        require(!crops[cropId].harvested, "Crop has already been harvested");

        Farmer storage farmer = farmers[farmerId];
        Crop storage crop = crops[cropId];

        require(block.timestamp >= crop.plantedAt + crop.maturityTime, "Crop is not yet mature");

        crop.harvested = true;
        farmer.cropsEarned += crop.yield;
        totalCropsSold += crop.yield;
        farmer.experience += crop.yield; // Increase experience for harvesting a crop
        farmerCrops[farmerId].remove(cropId); // Remove the harvested crop ID from the farmer's crops array
        _initiateMetadata(farmerId);
    }

    /**
     * @dev Sell crops for GOLD.
     * @param farmerId The ID of the farmer selling crops.
     * @param amount The amount of crops to sell.
     */
    function sellCrops(uint256 farmerId, uint256 amount) external {
        require(ownerOf(farmerId) == msg.sender, "Only farmer owner can sell crops");
        require(farmers[farmerId].cropsEarned >= amount, "Insufficient crops to sell");

        Farmer storage farmer = farmers[farmerId];
        uint256 goldToEarn = amount / CROPS_FOR_GOLD; // Sell 10 cropsEarned for 1 GOLD

        farmer.cropsEarned -= amount;
        farmer.gold += goldToEarn;
        totalCropsSold += amount;
        totalGoldEarned += goldToEarn;
        farmer.experience += goldToEarn; // Increase experience for selling crops
        _initiateMetadata(farmerId);
    }

    /**
     * @dev Create a new crop type.
     * @param maturityTime The time it takes for the crop to mature.
     * @param yield The amount of crops yielded when harvesting.
     * @param seedCost The cost in seeds to plant this crop type.
     */
    function addCropType(uint256 maturityTime, uint256 yield, uint256 seedCost) external onlyOwner {
        CropType storage newCropType = cropTypes[cropTypeCounter.current()];
        newCropType.maturityTime = maturityTime;
        newCropType.yield = yield;
        newCropType.seedCost = seedCost;
        cropTypeCounter.increment();
    }

    function uintToStr(uint256 value) private pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory baseURI = _baseURI();
        if (bytes(baseURI).length == 0) {
            return "";
        }
        return _constructTokenURI(tokenId, farmers[tokenId]);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/";
    }
}
