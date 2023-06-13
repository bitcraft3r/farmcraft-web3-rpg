// @ts-nocheck

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'

import playerStore, { contractStore } from "../../store/contractStore";
import CONTRACT_ABI from '../../data/abi.json'
import ButtonFarm from './GameDashboard/ButtonFarm'
import ButtonQuest from './GameDashboard/ButtonQuest'
import ButtonSell from './GameDashboard/ButtonSell'
import ButtonBuy from './GameDashboard/ButtonBuy'
import ContainerPlayer from './GameDashboard/ContainerPlayer'
import GameDialog from './GameDashboard/GameDialog'
import ButtonRace from './GameDashboard/ButtonRace'



interface GameDashboardProps {
  address: `0x${string}` | undefined
}

const GameDashboard: React.FC<GameDashboardProps> = ({ address }) => {
  const store = playerStore();

  const { data: dataTokenId, isError: isErrorTokenId, isLoading: isLoadingTokenId } = useContractRead({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getFarmerTokenIdByAddress',
    args: [address],
  })

  const { data: dataFarmer, isError: isErrorFarmer, isLoading: isLoadingFarmer } = useContractRead({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getFarmer',
    args: [dataTokenId],
  })

  const [farmerTokenId, setFarmerTokenId] = useState(null)
  const [farmerData, setFarmerData] = useState([])

  useEffect(() => {
    if (dataTokenId) {
      // console.log(`dataTokenId in GameDashboard`, dataTokenId)
      // @ts-ignore
      setFarmerTokenId(dataTokenId)
    }

    if (dataFarmer) {
      console.log(`dataFarmer in GameDashboard`, dataFarmer)

      // @ts-ignore
      setFarmerData(dataFarmer)

      // store.setPlayer(dataFarmer); // ERROR - Type definition in contractStore is incorrect, maybe need BigInt instead of number.

      // console.log(`dataFarmer[0] in GameDashboard`, dataFarmer[0])
      // console.log(`dataFarmer[1] in GameDashboard`, Number(dataFarmer[1]))
      // console.log(`dataFarmer[2] in GameDashboard`, dataFarmer[2])
      // console.log(`dataFarmer[3] in GameDashboard`, Number(dataFarmer[3]))
      // console.log(`dataFarmer[4] in GameDashboard`, Number(dataFarmer[4]))
      // console.log(`dataFarmer[5] in GameDashboard`, Number(dataFarmer[5]))
      // console.log(`dataFarmer[6] in GameDashboard`, Number(dataFarmer[6]))
      // console.log(`dataFarmer[7] in GameDashboard`, Number(dataFarmer[7]))
      // console.log(`dataFarmer[8] in GameDashboard`, dataFarmer[8])
      // console.log(`dataFarmer[9] in GameDashboard`, dataFarmer[9])
      // console.log(`dataFarmer[10] in GameDashboard`, Number(dataFarmer[10]))

      // PREPARE FARMER DATA FOR ZUSTAND STORE
      let thisOwner = dataFarmer[0];
      let thisExperience = Number(dataFarmer[1]);
      let thisActiveCrops = dataFarmer[2]; // cannot directly serialize a BigInt value in Zustand
      let thisSeed = Number(dataFarmer[3]);
      let thisGold = Number(dataFarmer[4]);
      let thisCrop = Number(dataFarmer[5]);
      let thisQuestEndTime = Number(dataFarmer[6]);
      let thisStatus = Number(dataFarmer[7]);
      let thisImageIpfsHash = dataFarmer[8];
      let thisName = dataFarmer[9];
      let thisRacesWon = Number(dataFarmer[10]);

      // Convert BigInt values in array into numbers before storing the array in store, to avoid `TypeError: Do not know how to serialize a BigInt`
      const activeCropsAsNumbers = thisActiveCrops.map((bigIntValue) => Number(bigIntValue))

      // ADD FARMER DATA TO ZUSTAND STORE
      store.setOwner(thisOwner);
      store.setExperience(thisExperience);
      store.setActiveCrops(activeCropsAsNumbers); // cannot directly serialize a BigInt value in Zustand
      store.setSeed(thisSeed);
      store.setGold(thisGold);
      store.setCrop(thisCrop);
      store.setQuestEndTime(thisQuestEndTime);
      store.setStatus(thisStatus);
      store.setImageIpfsHash(thisImageIpfsHash);
      store.setName(thisName);
      store.setWins(thisRacesWon);

    }

  }, [dataFarmer])


  return (
    <div>
      {isLoadingTokenId || isLoadingFarmer
        ? <div>Loading...</div>
        :
        <>
          {/* Player Attributes & Resources */}
          <div className="md:absolute md:top-[15%] md:left-[5%] bg-slate-500 bg-opacity-50 rounded-xl border-8 border-slate-800">
            <ContainerPlayer />
          </div>

          {/* Game Screen */}
          <div className="relative mb-auto min-h-fit flex flex-col sm:flex-row items-center justify-center mx-auto">
            {/* Minimap */}
            <Image src="/images/minimap.webp" alt="FarmCraft Game Minimap" width={2400} height={1600} className="rounded-xl z-[-1]" />

            {/* Actions */}
            {/* 1. Farming */}
            <div className="absolute sm:left-[25%] sm:top-[35%] left-[15%] top-[30%]">
              <GameDialog name="Farm" title="Farming" description="Cultivate crops, reap rewards, and become the ultimate master of the harvest.">
                <ButtonFarm farmerTokenId={Number(farmerTokenId)} activeCrops={farmerData[2]} />
              </GameDialog>
            </div>
            {/* 2. Questing */}
            <div className="absolute sm:left-[50%] sm:top-[15%] right-[20%] top-[10%]">
              <GameDialog name="Forage" title="Foraging" description="Venture into the wild and gather valuable seeds to enhance your farming empire.">
                <ButtonQuest farmerTokenId={Number(farmerTokenId)} />
              </GameDialog>
            </div>
            {/* 3. Marketplace */}
            <div className="absolute sm:left-[40%] sm:bottom-[40%] left-[25%] bottom-[20%]">
              <GameDialog name="Market" title="Farmer's Market" description="Engage in a bustling marketplace, where you can unlock incredible opportunities.">
                <ButtonSell farmerTokenId={Number(farmerTokenId)} />
                <ButtonBuy farmerTokenId={Number(farmerTokenId)} />
              </GameDialog>
            </div>
            {/* 4. Tractor Race */}
            <div className="absolute sm:right-[20%] sm:top-[30%] right-[5%] top-[37%]">
              <GameDialog name="Race" title="Tractor Race" description="Rev your engines! Compete for gold against skilled farmers in an exhilarating tractor race.">
                <ButtonRace farmerTokenId={Number(farmerTokenId)} />
              </GameDialog>
            </div>


          </div>



        </>
      }

    </div>
  )
}

export default GameDashboard