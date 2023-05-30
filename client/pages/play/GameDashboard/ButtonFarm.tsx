import React from 'react'
import { useContractRead, useContractWrite } from 'wagmi'
import CONTRACT_ABI from '../../../data/abi.json'

// 1. GET connected wallet's address
// 2. GET tokenId of the wallet's farmer nft - TODO
// 3. GET the cropTypeId that player wants to plant - TODO
// 3. call startFarming(farmerId, cropTypeId) to start foraging quest
// 4. GET cropId of the planted crop - TODO
// 4. call endFarming(farmerId, cropId) to end foraging quest

interface ButtonFarmProps {
  address: `0x${string}` | undefined
}

const ButtonFarm: React.FC<ButtonFarmProps> = ({ address }) => {

  // TODO: implement getFarmerTokenIdByAddress() read

  const farmerId = 1 // replace with actual farmerId
  const cropTypeId = 0 // replace with actual cropId

  const { data: dataFarmStart, isLoading: isLoadingFarmStart, isSuccess: isSuccessFarmStart, write: writeFarmStart } = useContractWrite({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'plantCrop',
    args: [farmerId, cropTypeId],
  })

  // TODO: GET cropId of the planted crop from dataFarmStart
  const cropId = 2 // replace with actual cropId

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
      <button onClick={startFarming}>Plant Seeds</button>
      <button onClick={endFarming}>Harvest Crops</button>
    </>
  )
}

export default ButtonFarm