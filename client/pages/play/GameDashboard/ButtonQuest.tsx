import React from 'react'
import { useContractWrite } from 'wagmi'
import CONTRACT_ABI from '../../../data/abi.json'
import { Button } from '../../../components/ui/button'

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
      <Button variant="secondary" onClick={startForagingQuest} disabled={isLoadingQuestStart}>Start Quest</Button>
      <Button variant="secondary" onClick={endForagingQuest} disabled={isLoadingQuestEnd}>End Quest</Button>
    </>
  )
}

export default ButtonQuest