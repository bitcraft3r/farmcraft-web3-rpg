# FarmCraft Web3 RPG

FarmCraft is an on-chain farming simulator and idle-clicker game, where players can become virtual farmers and experience the joys and challenges of managing a farm. Players can own and customize their farmer avatar, plant and harvest crops, complete quests, earn rewards, and participate in tractor races for gold and glory.

- Mint & Play: https://farmcraft.vercel.app/
- View NFT Collection on Zonic: https://testnet.zonic.app/collection/farmcraft
- View Contract on Blockscout: https://blockscout.scroll.io/address/0x4d71355cfB84aC927D52C2865BDFF7b1f5F23F86/
- Bridge to Scroll Alpha Testnet: https://scroll.io/portal

FarmCraft is built with Solidity and launched on the Scroll alpha testnet.

# Features

## Farmer NFTs

- Each player can create a unique Farmer NFT (non-fungible token) representing their virtual farmer character.
- Players can personalize the NFTs with their username and AI-generated avatars.
- The Farmer NFT contains metadata such as experience, seeds, gold, earned crops, and other attributes.
- Each player can only mint a single Farmer NFT.

## Customization

- Players can assign a username to their Farmer, which is represented by a string.
- Farmers can be customized with an image, represented by an IPFS hash.

## Quests and Rewards

- Players can embark on foraging quests, which take 1 minute to complete.
- Successful completion of a foraging quest rewards players with 1 seed and 1 experience point.

## Crop Management

- Players can purchase seeds using the in-game currency, gold. Each seed has a specific gold cost and can be used for planting crops.
- Seeds can also be earned through foraging quests.
- Crops have varying maturity times and yields. When a crop reaches maturity, players can harvest it and receive crops and experience based on the yield.
- There are three types of crops available in the game:
  - Lettuce: Costs 1 seed, takes 2 minutes to mature, and yields 2 crops.
  - Tomato: Costs 3 seeds, takes 5 minutes to mature, and yields 6 crops.
  - Pumpkin: Costs 10 seeds, takes 15 minutes to mature, and yields 25 crops.
- Players can cultivate multiple crops and manage them over time.

## Buying and Selling

- Players have the ability to sell 5 crops for 1 gold.
- Gold can be used to purchase additional seeds or for other in-game purposes.

## Tractor Race

- Players can engage in 1v1 challenges and place wagers for gold.
- Players with higher experience enjoy a slight advantage in the races.

# Smart Contract Details

The smart contract, written in Solidity, implements the ERC721 standard for the Farmer NFTs. It incorporates the following key functions:

- Minting a new Farmer NFT.
- Buying seeds using gold.
- Initiating and completing foraging quests.
- Planting and harvesting crops.
- Selling crops for gold.
- Racing against other farmers for gold.
- Adding new crop types with distinct attributes.
- The smart contract also includes mappings to store information about farmers, crops, crop types, and the ownership of Farmer NFTs.

# License

The smart contract code is licensed under the MIT license.
