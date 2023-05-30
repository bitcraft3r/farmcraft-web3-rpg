import React from 'react'
import { useContractRead, useContractWrite } from 'wagmi'
import CONTRACT_ABI from '../../../data/abi.json'

// 1. GET connected wallet's address
// 2. GET tokenId of the wallet's farmer nft
// 3. call startForagingQuest(farmerId) to start foraging quest
// 4. call endForagingQuest(farmerId) to end foraging quest

interface ButtonQuestProps {
  address: `0x${string}` | undefined
}

const ButtonQuest: React.FC<ButtonQuestProps> = ({ address }) => {

  // const { data: dataRead, isError, isLoading: isLoadingRead } = useContractRead({
  //   address: address,
  //   abi: CONTRACT_ABI,
  //   functionName: 'getFarmerTokenIdByAddress', // TODO: Add new getter fn in .sol contract: getFamerTokenIdByAddress()
  // })

  const farmerId = 1 // replace with actual farmerId

  // 
  const { data: dataQuestStart, isLoading: isLoadingQuestStart, isSuccess: isSuccessQuestStart, write: writeQuestStart } = useContractWrite({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'startForagingQuest',
    args: [farmerId],
  })

  const { data: dataQuestEnd, isLoading: isLoadingQuestEnd, isSuccess: isSuccessQuestEnd, write: writeQuestEnd } = useContractWrite({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'endForagingQuest',
    args: [farmerId],
  })

  const startForagingQuest = () => {
    // @ts-ignore
    writeQuestStart('startForagingQuest')
  }

  const endForagingQuest = () => {
    // @ts-ignore
    writeQuestEnd('endForagingQuest')
  }

  return (
    <>
      <button onClick={startForagingQuest}>Forage</button>
      <button onClick={endForagingQuest}>End Quest</button>
    </>
  )
}

export default ButtonQuest