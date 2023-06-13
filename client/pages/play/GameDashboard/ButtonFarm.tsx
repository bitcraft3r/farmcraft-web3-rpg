import React, { useEffect, useState } from 'react'
import { useContractRead, useContractWrite } from 'wagmi'

import playerStore from "../../../store/contractStore";
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
  const store = playerStore()
  const farmerId = farmerTokenId

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

  // TODO: After successful planting seed,
  // a) new activeCrop should be added to array.
  // b) timer should start running to show when it is harvestable; timer should be updated every second.
  // c) harvestCrops button should be enabled.
  useEffect(() => {
    if (isSuccessFarmStart) {
      console.log(`isSuccessFarmStart`, isSuccessFarmStart)
      console.log(`dataFarmStart:`, dataFarmStart?.hash)

      // Update the store values
      store.setStatus(1)
      store.increaseSeed(-1)

      // REFRESH PAGE ON SUCCESSFUL PLANT AFTER 5 SECONDS
      if (dataFarmStart) {
        console.log(`Refreshing in 5s...`)
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    }

    if (isSuccessFarmStart2) {
      console.log(`isSuccessFarmStart2`, isSuccessFarmStart2)
      console.log(`dataFarmStart2:`, dataFarmStart2?.hash)

      // Update the store values
      store.setStatus(1)
      store.increaseSeed(-3)

      // REFRESH PAGE ON SUCCESSFUL PLANT AFTER 5 SECONDS
      if (dataFarmStart2) {
        console.log(`Refreshing in 5s...`)
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    }

    if (isSuccessFarmStart3) {
      console.log(`isSuccessFarmStart3`, isSuccessFarmStart3)
      console.log(`dataFarmStart3:`, dataFarmStart3?.hash)

      // Update the store values
      store.setStatus(1)
      store.increaseSeed(-10)

      // REFRESH PAGE ON SUCCESSFUL PLANT AFTER 5 SECONDS
      if (dataFarmStart3) {
        console.log(`Refreshing in 5s...`)
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    }

    if (isSuccessFarmEnd) {
      console.log(`isSuccessFarmEnd`, isSuccessFarmEnd)
      console.log(`dataFarmEnd:`, dataFarmEnd?.hash)

      // Update the store values
      // store.setStatus(0) // TODO: If there are still unharvested crops, status should remain as 1.
      // TODO: Use actual yield values depending on what is harvested successfully i.e. 2 for lettuce, 6 for tomato, 25 for pumpkin.
      // store.increaseExperience(2) // equal to yield
      // store.increaseCrop(2) // equal to yield
      // TODO: remove harvested crops from `store.activeCrops` array
      if (dataFarmEnd) {
        // REFRESH PAGE ON SUCCESSFUL HARVEST AFTER 5 SECONDS
        console.log(`Refreshing in 5s...`)
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }

    }

  }, [isSuccessFarmStart, dataFarmStart, isSuccessFarmStart2, dataFarmStart2, isSuccessFarmStart3, dataFarmStart3, isSuccessFarmEnd, dataFarmEnd])


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
    { name: "Lettuce", cost: 1, tooltip: "1 Seed, 2 Yield, 2 Mins", plantFn: plantSeeds, loadingFn: isLoadingFarmStart },
    { name: "Tomato", cost: 3, tooltip: "3 Seed, 6 Yield, 5 Mins", plantFn: plantSeeds2, loadingFn: isLoadingFarmStart2 },
    { name: "Pumpkin", cost: 10, tooltip: "10 Seed, 25 Yield, 15 Mins", plantFn: plantSeeds3, loadingFn: isLoadingFarmStart3 },
  ]

  return (
    <>
      <div className="flex flex-row justify-between">
        {plants.map((plant) => (
          <TooltipProvider key={plant.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  onClick={plant.plantFn}
                  // @ts-ignore
                  disabled={plant.loadingFn || store.seed < plant.cost}
                >
                  Plant {plant.name}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{plant.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <Button variant="secondary" onClick={harvestCrops} disabled={store.activeCrops?.length === 0 || isLoadingFarmEnd}>Harvest Crops</Button>
    </>
  )
}

export default ButtonFarm