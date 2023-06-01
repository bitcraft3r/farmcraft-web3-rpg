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
            <ContainerPlayer address={address} imgIpfsHash={farmerData[8]} experience={Number(farmerData[1])} status={farmerData[7]} seeds={Number(farmerData[3])} gold={Number(farmerData[4])} crops={Number(farmerData[5])} />
          </div>

          {/* Game Screen */}
          <div className="relative mb-auto min-h-fit flex flex-col sm:flex-row items-center justify-center mx-auto">
            {/* Minimap */}
            <Image src="/images/minimap.webp" alt="FarmCraft Game Minimap" width={1200} height={800} className="rounded-xl z-[-1]" />

            {/* Actions */}
            {/* 1. Farming */}
            <div className="absolute sm:left-[25%] sm:top-[35%] left-[15%] top-[15%]">
              <GameDialog title="Farm" description="Cultivate a variety of crops with different maturity times and yields.">
                <ButtonFarm farmerTokenId={Number(farmerTokenId)} activeCrops={farmerData[2]} />
              </GameDialog>
            </div>
            {/* 2. Questing */}
            <div className="absolute sm:right-[15%] sm:top-[25%] right-[5%] top-[37%]">
              <GameDialog title="Forage" description="Explore the wilderness and earn rewards.">
                <ButtonQuest farmerTokenId={Number(farmerTokenId)} />
              </GameDialog>
            </div>
            {/* 3. Marketplace */}
            <div className="absolute sm:left-[40%] sm:bottom-[40%] left-[25%] bottom-[20%]">
              <GameDialog title="Market" description="Buy seeds or Sell your crops to earn GOLD.">
                <ButtonSell farmerTokenId={Number(farmerTokenId)} />
                <ButtonBuy farmerTokenId={Number(farmerTokenId)} />
              </GameDialog>
            </div>

          </div>



        </>
      }

    </div>
  )
}

export default GameDashboard