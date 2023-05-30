# FarmCraft Web3 RPG

FarmCraft is a blockchain-based game where players can become virtual farmers and experience the joys and challenges of managing a farm. The game is built on the Ethereum blockchain using the Solidity programming language. Players can own and customize their farmer avatar, plant and harvest crops, complete quests, and earn rewards.

# Features

## Farmer NFTs

- Each player can mint a unique Farmer NFT (non-fungible token) that represents their virtual farmer character.
- The Farmer NFT contains information such as experience, level, seeds, gold, crops earned, and other attributes.

## Crop Management
- Players can buy seeds using gold, the in-game currency. Each seed has a cost in gold and can be used to plant crops.
- Crops have different maturity times and yields. Once a crop matures, it can be harvested, and the player earns crops based on the yield.
- Players can plant multiple crops and manage them over time.

## Quests and Rewards
- Players can undertake foraging quests, which require a specific duration to complete.
- Completing quests rewards players with seeds and experience points.
- Experience points contribute to leveling up the farmer character.

## Buying and Selling
- Players can sell crops for gold. The amount of gold earned is determined by the number of crops sold.
- Gold can be used to buy more seeds or for other in-game purposes.

## Customization
- Farmers can be customized with an image that is represented by an IPFS hash. This allows players to personalize their farmer characters.

# Smart Contract Details

The smart contract is written in Solidity and utilizes the ERC721 standard for the Farmer NFTs. It includes the following key functions:

- Minting a new farmer NFT.
- Buying seeds using gold.
- Starting and completing foraging quests.
- Planting and harvesting crops.
- Selling crops for gold.
- Adding new crop types with different attributes.

The smart contract also includes mappings to store information about farmers, crops, crop types, and the ownership of farmer NFTs.

# License

The smart contract code is licensed under the MIT license.
 