import React from 'react'
import { useContractWrite } from 'wagmi'
import CONTRACT_ABI from '../../../data/abi.json'

interface ButtonQuestProps {
  farmerTokenId: number
}

const ButtonQuest: React.FC<ButtonQuestProps> = ({ farmerTokenId }) => {
  const farmerId = farmerTokenId

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
      <button onClick={startForagingQuest} disabled={isLoadingQuestStart}>Forage</button>
      <button onClick={endForagingQuest} disabled={isLoadingQuestEnd}>End Quest</button>
    </>
  )
}

export default ButtonQuest