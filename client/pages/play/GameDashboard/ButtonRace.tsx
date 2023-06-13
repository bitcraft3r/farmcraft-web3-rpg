import React, { useEffect } from 'react'
import { useContractRead, useContractWrite } from 'wagmi'

import playerStore from "../../../store/contractStore";
import CONTRACT_ABI from '../../../data/abi.json'
import { Button } from '../../../components/ui/button'

interface ButtonRaceProps {
  farmerTokenId: number
}

const ButtonRace: React.FC<ButtonRaceProps> = ({ farmerTokenId }) => {
  const store = playerStore()
  const farmerId = farmerTokenId
  const wager = 1

  const { data: dataCurrentRace, isError: isErrorCurrentRace, isLoading: isLoadingCurrentRace, refetch } = useContractRead({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'currentRace',
  })

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

  useEffect(() => {
    console.log(`dataCurrentRace`, dataCurrentRace)

    if (isSuccessRaceEnter) {
      console.log(`isSuccessRaceEnter`, isSuccessRaceEnter)
      console.log(`dataRaceEnter:`, dataRaceEnter?.hash)

      // Update store
      store.setStatus(3)
      store.increaseGold(-1)

      // Refetch race data after 5s
      console.log(`Refetching in 5s...`)
      setTimeout(() => {
        refetch()
        console.log(`Done refetching!`)
      }, 5000);
    }

    if (isSuccessRaceLeave) {
      console.log(`isSuccessRaceLeave`, isSuccessRaceLeave)
      console.log(`dataRaceLeave:`, dataRaceLeave?.hash)

      // Update store
      store.setStatus(0)
      store.increaseGold(1)

      // Refetch race data after 5s
      console.log(`Refetching in 5s...`)
      setTimeout(() => {
        refetch()
        console.log(`Done refetching!`)
      }, 5000);
    }

    if (isSuccessRaceChallenge) {
      console.log(`isSuccessRaceChallenge`, isSuccessRaceChallenge)
      console.log(`dataRaceChallenge:`, dataRaceChallenge?.hash)

      // REFRESH PAGE ON SUCCESSFUL CHALLENGE AFTER 5 SECONDS
      if (dataRaceChallenge) {
        console.log(`Refreshing in 5s...`)
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    }

  }, [dataCurrentRace, dataRaceEnter, isSuccessRaceEnter, dataRaceLeave, isSuccessRaceLeave, dataRaceChallenge, isSuccessRaceChallenge])

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
      <Button
        variant="secondary"
        onClick={enterRace}
        disabled={
          isLoadingRaceEnter ||
          store.status !== 0 ||
          // @ts-ignore
          store.gold < 1 ||
          // @ts-ignore
          (dataCurrentRace?.[2] === true ?? undefined)
        }
      >
        Enter Race
      </Button>
      <Button variant="secondary" onClick={leaveRace} disabled={isLoadingRaceLeave || store.status !== 3}>Leave Race</Button>
      <Button
        variant="secondary"
        onClick={challengeRace}
        disabled={
          isLoadingRaceChallenge ||
          store.status !== 0 ||
          // @ts-ignore
          (dataCurrentRace?.[2] === false ?? undefined)
        }
      >
        Challenge Race
      </Button>
    </>
  )
}

export default ButtonRace