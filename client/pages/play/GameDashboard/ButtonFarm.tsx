import React, { useEffect, useState } from 'react'
import { useContractRead, useContractWrite } from 'wagmi'
import CONTRACT_ABI from '../../../data/abi.json'

// 1. GET connected wallet's address
// 2. GET tokenId of the wallet's farmer nft
// 3. GET the cropTypeId that player wants to plant - TODO
// 3. call startFarming(farmerId, cropTypeId) to start foraging quest
// 4. GET cropId of the planted crop - TODO
// 4. call endFarming(farmerId, cropId) to end foraging quest

interface ButtonFarmProps {
  farmerTokenId: number
  activeCrops: number[]
}

const ButtonFarm: React.FC<ButtonFarmProps> = ({ farmerTokenId, activeCrops }) => {
  const farmerId = farmerTokenId
  const cropTypeId = 0 // replace with actual cropId
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
    functionName: 'plantCrop',
    args: [farmerId, cropTypeId],
  })

  const { data: dataFarmEnd, isLoading: isLoadingFarmEnd, isSuccess: isSuccessFarmEnd, write: writeFarmEnd } = useContractWrite({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'harvestCrop',
    args: [farmerId, Number(cropIds[0])],
  })

  const startFarming = () => {
    // @ts-ignore
    writeFarmStart('plantCrop')
  }

  const endFarming = () => {
    const cropId = Number(activeCrops[0]); // Get the first cropId from the array
    console.log(`harvesting cropId: ${cropId}`)
    // @ts-ignore
    writeFarmEnd('harvestCrop', cropId) // how to pass argument of cropId into the writeFarmEnd function?
    setCropIds((prevCropIds) => prevCropIds.slice(1)); // Remove the harvested cropId from the array
  }

  return (
    <>
      <button onClick={startFarming} disabled={isLoadingFarmStart}>Plant Seeds</button>
      <button onClick={endFarming} disabled={cropIds.length === 0 || isLoadingFarmEnd}>Harvest Crops</button>
    </>
  )
}

export default ButtonFarm