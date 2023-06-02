import React, { useEffect, useState } from 'react'
import { useContractRead, useContractWrite } from 'wagmi'
import CONTRACT_ABI from '../../../data/abi.json'
import { Button } from '../../../components/ui/button'

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

  return (
    <>
      <div className="flex flex-row justify-between">
        <Button variant="secondary" onClick={plantSeeds} disabled={isLoadingFarmStart}>Seed:1 Yield:2 (2m)</Button>
        <Button variant="secondary" onClick={plantSeeds2} disabled={isLoadingFarmStart}>Seed:3 Yield:6 (5m)</Button>
        <Button variant="secondary" onClick={plantSeeds3} disabled={isLoadingFarmStart}>Seed:10 Yield:25 (15m)</Button>
      </div>
      <Button variant="secondary" onClick={harvestCrops} disabled={cropIds.length === 0 || isLoadingFarmEnd}>Harvest Crops</Button>
    </>
  )
}

export default ButtonFarm