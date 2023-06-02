import React from 'react'
import { useContractWrite } from 'wagmi'
import CONTRACT_ABI from '../../../data/abi.json'
import { Button } from '../../../components/ui/button'

interface ButtonRaceProps {
  farmerTokenId: number
}

const ButtonRace: React.FC<ButtonRaceProps> = ({ farmerTokenId }) => {
  const farmerId = farmerTokenId
  const wager = 1

  const { data: dataRaceEnter, isLoading: isLoadingRaceEnter, isSuccess: isSuccessRaceEnter, write: writeRaceEnter } = useContractWrite({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'enterRace',
    args: [farmerId, wager],
  })

  const { data: dataRaceLeave, isLoading: isLoadingRaceLeave, isSuccess: isSuccessRaceLeave, write: writeRaceLeave } = useContractWrite({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'leaveRace',
  })

  const { data: dataRaceChallenge, isLoading: isLoadingRaceChallenge, isSuccess: isSuccessRaceChallenge, write: writeRaceChallenge } = useContractWrite({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'challengeRace',
    args: [farmerId],
  })

  const enterRace = () => {
    // @ts-ignore
    writeRaceEnter('enterRace')
  }

  const leaveRace = () => {
    // @ts-ignore
    writeRaceLeave('leaveRace')
  }

  const challengeRace = () => {
    // @ts-ignore
    writeRaceChallenge('challengeRace')
  }

  return (
    <>
      <Button variant="secondary" onClick={enterRace} disabled={isLoadingRaceEnter}>Enter Race</Button>
      <Button variant="secondary" onClick={leaveRace} disabled={isLoadingRaceLeave}>Leave Race</Button>
      <Button variant="secondary" onClick={challengeRace} disabled={isLoadingRaceChallenge}>Challenge Race</Button>
    </>
  )
}

export default ButtonRace