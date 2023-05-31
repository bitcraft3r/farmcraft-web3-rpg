import React from 'react'
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
}

const ButtonFarm: React.FC<ButtonFarmProps> = ({ farmerTokenId }) => {
  const farmerId = farmerTokenId
  const cropTypeId = 0 // replace with actual cropId

  const { data: dataFarmStart, isLoading: isLoadingFarmStart, isSuccess: isSuccessFarmStart, write: writeFarmStart } = useContractWrite({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'plantCrop',
    args: [farmerId, cropTypeId],
  })

  // TODO: GET cropId of the planted crop from dataFarmStart / or from DataFarmer[2] which is an array of cropIds which are active.
  const cropId = 0 // replace with actual cropId

  const { data: dataFarmEnd, isLoading: isLoadingFarmEnd, isSuccess: isSuccessFarmEnd, write: writeFarmEnd } = useContractWrite({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'harvestCrop',
    args: [farmerId, cropId],
  })

  const startFarming = () => {
    // @ts-ignore
    writeFarmStart('plantCrop')
    console.log(`dataStartFarm`, dataFarmStart)
  }

  const endFarming = () => {
    // @ts-ignore
    writeFarmEnd('harvestCrop')
    console.log(`dataStartFarm`, dataFarmEnd)
  }

  return (
    <>
      <button onClick={startFarming} disabled={isLoadingFarmStart}>Plant Seeds</button>
      <button onClick={endFarming} disabled={true}>Harvest Crops</button>
      {/* <button onClick={endFarming} disabled={isLoadingFarmEnd}>Harvest Crops</button> */}
    </>
  )
}

export default ButtonFarm