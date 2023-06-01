// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

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
        string name;
        uint256 racesWon;
    }

    struct CropType {
        uint256 maturityTime;
        uint256 yield;
        uint256 seedCost;
    }

    struct TractorRace {
        uint256 farmerId; // The ID of the farmer participating in the race
        uint256 wager; // The amount of GOLD wagered in the race
        bool active; // Flag indicating if the race is active
    }

    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => Crop) private crops;
    mapping(uint256 => Farmer) private farmers;
    mapping(uint256 => CropType) private cropTypes;
    mapping(uint256 => EnumerableSet.UintSet) private farmerCrops;
    mapping(address => bool) private addressMinted;
    mapping(address => uint256) private farmerTokenIds;

    Counters.Counter private cropTypeCounter;
    TractorRace public currentRace;

    constructor() ERC721("FarmCraft", "FARMER") {
        nextTokenId = 1;
    }

    modifier noActiveRace() {
        require(!currentRace.active, "There is already an active race");
        _;
    }

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
                '[{"trait_type":"Name","value":',
                farmer.name,
                '},{"trait_type":"Experience","value":',
                uintToStr(farmer.experience),
                '},{"trait_type":"Seeds","value":',
                uintToStr(farmer.seeds),
                '},{"trait_type":"Gold","value":',
                uintToStr(farmer.gold),
                '},{"trait_type":"Crops","value":',
                uintToStr(farmer.cropsEarned),
                '},{"trait_type":"Wins","value":',
                uintToStr(farmer.racesWon),
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
    function mintFarmer(string memory imageIpfsHash, string memory playerName) external {
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
            imageIpfsHash,
            playerName,
            0
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
     * @param amountGold The amount of GOLD used to buy seeds.
     */
    function buySeeds(uint256 farmerId, uint256 amountGold) external {
        require(ownerOf(farmerId) == msg.sender, "Only farmer owner can buy seeds");
        require(!farmers[farmerId].questActive, "Currently on a quest");
        require(currentRace.farmerId != farmerId, "Currently waiting to race");
        require(farmers[farmerId].crops.length == 0, "Currently have unharvested crops");

        Farmer storage farmer = farmers[farmerId];
        require(farmer.gold >= amountGold, "Insufficient GOLD");

        uint256 seedsToBuy = amountGold * 3; // Buy 3 seeds per 1 GOLD

        farmer.gold -= amountGold;
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
        require(farmers[farmerId].crops.length == 0, "Currently have unharvested crops");
        require(currentRace.farmerId != farmerId, "Currently waiting to race");

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
        require(!farmers[farmerId].questActive, "Currently on a quest");
        require(currentRace.farmerId != farmerId, "Currently waiting to race");

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
        require(!farmers[farmerId].questActive, "Currently on a quest");
        require(currentRace.farmerId != farmerId, "Currently waiting to race");
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
     * @param amountCrops The amount of crops to sell.
     */
    function sellCrops(uint256 farmerId, uint256 amountCrops) external {
        require(ownerOf(farmerId) == msg.sender, "Only farmer owner can sell crops");
        require(farmers[farmerId].cropsEarned >= amountCrops, "Insufficient crops to sell");
        require(!farmers[farmerId].questActive, "Currently on a quest");
        require(currentRace.farmerId != farmerId, "Currently waiting to race");
        require(farmers[farmerId].crops.length == 0, "Currently have unharvested crops");

        Farmer storage farmer = farmers[farmerId];
        uint256 goldToEarn = amountCrops / 5; // Sell 5 cropsEarned for 1 GOLD

        farmer.cropsEarned -= amountCrops;
        farmer.gold += goldToEarn;
        totalCropsSold += amountCrops;
        totalGoldEarned += goldToEarn;
        farmer.experience += goldToEarn; // Increase experience for selling crops
        _initiateMetadata(farmerId);
    }

    /**
     * @dev Enter a farmer into a tractor race by placing a wager.
     * @param farmerId The ID of the farmer entering the race.
     * @param wager The amount of gold wagered on the race.
     */
    function enterRace(uint256 farmerId, uint256 wager) external noActiveRace {
        require(!farmers[farmerId].questActive, "Currently on a quest");
        require(farmers[farmerId].crops.length == 0, "Currently have unharvested crops");
        require(ownerOf(farmerId) == msg.sender, "Only farmer owner can enter the Arena");
        require(wager > 0, "Wager must be greater than zero");
        require(farmers[farmerId].gold >= wager, "Insufficient gold"); // Check that player has enough gold
        farmers[farmerId].gold -= wager; // Deduct the gold equal to the wager amount

        currentRace = TractorRace(farmerId, wager, true);
    }

    /**
     * @dev Leave the current tractor race and return the wagered gold to the farmer.
     */
    function leaveRace() external {
        require(currentRace.active, "There is no active race");
        require(ownerOf(currentRace.farmerId) == msg.sender, "Only farmer owner can leave the Race");

        Farmer storage farmer = farmers[currentRace.farmerId];
        farmer.gold += currentRace.wager; // Return the wagered gold to the farmer

        currentRace = TractorRace(0, 0, false); // Deactivate the current race
    }

    /**
     * @dev Challenge another player in the current tractor race.
     * @param challengerId The ID of the farmer challenging the player.
     */
    function challengePlayer(uint256 challengerId) external {
        require(!farmers[challengerId].questActive, "Currently on a quest");
        require(farmers[challengerId].crops.length == 0, "Currently have unharvested crops");
        require(ownerOf(challengerId) == msg.sender, "Only farmer owner can challenge the player");

        TractorRace memory race = currentRace;
        require(race.active, "There is no active race");

        require(farmers[challengerId].gold >= race.wager, "Insufficient gold"); // Check that player has enough gold
        farmers[challengerId].gold -= race.wager; // Deduct the gold equal to the wager amount

        uint256 raceWinner;
        uint256 experienceDiff = farmers[race.farmerId].experience - farmers[challengerId].experience;
        uint256 randomLuck = experienceDiff % 4; // Generate a random number between 0 and 3

        if (randomLuck > 0) {
            // 75% of the time, the higher experienced farmer wins
            if (experienceDiff >= 0) {
                raceWinner = race.farmerId;
            } else {
                raceWinner = challengerId;
            }
        } else {
            // 25% of the time, the lower experienced farmer wins
            if (experienceDiff > 0) {
                raceWinner = challengerId;
            } else {
                raceWinner = race.farmerId;
            }
        }

        uint256 totalWager = race.wager * 2;
        farmers[raceWinner].gold += totalWager;
        farmers[raceWinner].racesWon += 1;
        totalGoldEarned += totalWager;

        currentRace = TractorRace(0, 0, false);

        _initiateMetadata(race.farmerId);
        _initiateMetadata(challengerId);
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
