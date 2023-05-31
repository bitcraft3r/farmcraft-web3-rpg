import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'

import CONTRACT_ABI from '../../data/abi.json'
import ButtonFarm from './GameDashboard/ButtonFarm'
import ButtonQuest from './GameDashboard/ButtonQuest'
import ButtonSell from './GameDashboard/ButtonSell'
import ButtonBuy from './GameDashboard/ButtonBuy'
import ContainerPlayer from './GameDashboard/ContainerPlayer'
import ContainerStats from './GameDashboard/ContainerStats'
import ContainerResources from './GameDashboard/ContainerResources'

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
          <div>
            {/* Minimap */}
            <Image src="/images/minimap.webp" alt="FarmCraft Game Minimap" width={1200} height={800} layout="responsive" style={{ position: "absolute", zIndex: -1 }} />

            {/* Actions */}
            <div style={{ position: "absolute", top: "60%", left: "40%", transform: "translate(-60%, -40%)" }}>
              <ButtonFarm farmerTokenId={Number(farmerTokenId)} activeCrops={farmerData[2]} />
            </div>
            <div style={{ position: "absolute", top: "55%", left: "80%", transform: "translate(-55%, -80%)" }}>
              <ButtonQuest farmerTokenId={Number(farmerTokenId)} />
            </div>
            <div style={{ position: "absolute", top: "75%", left: "50%", transform: "translate(-75%, -50%)" }}>
              <ButtonSell farmerTokenId={Number(farmerTokenId)} />
            </div>
            <div style={{ position: "absolute", top: "80%", left: "45%", transform: "translate(-80%, -45%)" }}>
              <ButtonBuy farmerTokenId={Number(farmerTokenId)} />
            </div>

          </div>

          {/* Player */}
          <div style={{ width: "200px", height: "100%", border: "1px solid gray" }}>
            <ContainerPlayer address={address} imgIpfsHash={farmerData[8]} />
          </div>

          {/* Attributes */}
          <div style={{ width: "200px", height: "100%", border: "1px solid gray" }}>
            <ContainerStats experience={Number(farmerData[1])} status={farmerData[7]} />
          </div>

          {/* Resources */}
          <div style={{ position: "absolute", right: "10%", top: "15%", width: "150px", height: "150px", border: "1px solid gray" }}>
            <ContainerResources seeds={Number(farmerData[3])} gold={Number(farmerData[4])} crops={Number(farmerData[5])} />
          </div>
        </>
      }

    </div>
  )
}

export default GameDashboard