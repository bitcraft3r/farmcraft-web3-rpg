import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { MapPin } from 'lucide-react'

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
      // console.log(`dataFarmer in GameDashboard`, dataFarmer)
      // @ts-ignore
      setFarmerData(dataFarmer)
    }

  }, [])


  return (
    <div>
      {isLoadingTokenId || isLoadingFarmer
        ? <div>Loading...</div>
        :
        <>
          {/* Player Attributes & Resources */}
          <div className="md:absolute md:top-[15%] md:left-[5%] bg-slate-500 bg-opacity-50 rounded-xl border-8 border-slate-800">
            <ContainerPlayer address={address} imgIpfsHash={farmerData[8]} experience={Number(farmerData[1])} status={Number(farmerData[7])} seeds={Number(farmerData[3])} gold={Number(farmerData[4])} crops={Number(farmerData[5])} name={farmerData[9]} wins={Number(farmerData[10])} />
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