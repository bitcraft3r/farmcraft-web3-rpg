import React, { useEffect, useState } from 'react'
import { useContractRead, useContractWrite } from 'wagmi'

import CONTRACT_ABI from '../../../data/abi.json'
import { Button } from '../../../components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip"

interface ButtonFarmProps {
  farmerTokenId: number
  activeCrops: number[]
}

const ButtonFarm: React.FC<ButtonFarmProps> = ({ farmerTokenId, activeCrops }) => {
  const farmerId = farmerTokenId
  const [cropIds, setCropIds] = useState<number[]>([]);

  useEffect(() => {
    if (activeCrops) {
      console.log(`activeCrops in ButtonFarm:`, activeCrops)
      setCropIds(activeCrops);
    }
  }, [activeCrops]);

  const { data: dataFarmStart, isLoading: isLoadingFarmStart, isSuccess: isSuccessFarmStart, write: writeFarmStart } = useContractWrite({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'plantSeeds',
    args: [farmerId, 0, 1],
  })

  const { data: dataFarmStart2, isLoading: isLoadingFarmStart2, isSuccess: isSuccessFarmStart2, write: writeFarmStart2 } = useContractWrite({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'plantSeeds',
    args: [farmerId, 1, 1],
  })

  const { data: dataFarmStart3, isLoading: isLoadingFarmStart3, isSuccess: isSuccessFarmStart3, write: writeFarmStart3 } = useContractWrite({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'plantSeeds',
    args: [farmerId, 2, 1],
  })

  const { data: dataFarmEnd, isLoading: isLoadingFarmEnd, isSuccess: isSuccessFarmEnd, write: writeFarmEnd } = useContractWrite({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'harvestCrops',
    args: [farmerId],
  })

  const plantSeeds = () => {
    // @ts-ignore
    writeFarmStart('plantSeeds')
  }

  const plantSeeds2 = () => {
    // @ts-ignore
    writeFarmStart2('plantSeeds')
  }

  const plantSeeds3 = () => {
    // @ts-ignore
    writeFarmStart3('plantSeeds')
  }

  const harvestCrops = () => {
    // @ts-ignore
    writeFarmEnd('harvestCrop')
    // Remove the harvested cropId from the array?
  }

  const plants = [
    { name: "Lettuce", tooltip: "1 Seed, 2 Yield, 2 Mins", plantFn: plantSeeds, loadingFn: isLoadingFarmStart },
    { name: "Tomato", tooltip: "3 Seed, 6 Yield, 5 Mins", plantFn: plantSeeds2, loadingFn: isLoadingFarmStart2 },
    { name: "Pumpkin", tooltip: "10 Seed, 25 Yield, 15 Mins", plantFn: plantSeeds3, loadingFn: isLoadingFarmStart3 },
  ]

  return (
    <>
      <div className="flex flex-row justify-between">
        {plants.map((plant) => (
          <TooltipProvider key={plant.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" onClick={plant.plantFn} disabled={plant.loadingFn}>Plant {plant.name}</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{plant.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <Button variant="secondary" onClick={harvestCrops} disabled={cropIds.length === 0 || isLoadingFarmEnd}>Harvest Crops</Button>
    </>
  )
}

export default ButtonFarm