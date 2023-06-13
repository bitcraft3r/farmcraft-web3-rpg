import React, { useEffect, useState } from 'react'
import { useContractWrite } from 'wagmi'

import playerStore from "../../../store/contractStore";
import CONTRACT_ABI from '../../../data/abi.json'
import { Button } from '../../../components/ui/button'

interface ButtonQuestProps {
  farmerTokenId: number
}

const ButtonQuest: React.FC<ButtonQuestProps> = ({ farmerTokenId }) => {
  const store = playerStore();
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

  const [countdown, setCountdown] = useState(0); // State to hold the countdown value


  useEffect(() => {

    if (isSuccessQuestStart) {
      console.log(`isSuccessQuestStart`, isSuccessQuestStart)
      console.log(`dataQuestStart:`, dataQuestStart?.hash)

      // Set store values for `status` and `questEndTime`.
      store.setStatus(2)
      const currentTime = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
      const endTime = currentTime + 60; // Add 1 minute (60 seconds)
      store.setQuestEndTime(endTime)

      // Start the countdown.
      setCountdown(endTime - currentTime);
    }

    if (isSuccessQuestEnd) {
      console.log(`isSuccessQuestEnd`, isSuccessQuestEnd)
      console.log(`dataQuestEnd:`, dataQuestEnd?.hash)

      // Increase store values for rewards.
      store.increaseSeed(1)
      store.increaseExperience(1)

      // Reset relevant store values.
      store.setStatus(0)
      store.setQuestEndTime(0)

      // Reset the countdown.
      setCountdown(0);
    }

  }, [isSuccessQuestStart, dataQuestStart, isSuccessQuestEnd, dataQuestEnd])

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
      <Button variant="secondary" onClick={startForagingQuest} disabled={isLoadingQuestStart || (store.status ? true : false)}>Start Quest</Button>
      <Button
        variant="secondary"
        onClick={endForagingQuest}
        disabled={
          isLoadingQuestEnd ||
          (store.questEndTime === 0) ||
          // @ts-ignore
          store.questEndTime > Math.floor(Date.now() / 1000) // not using `countdown` because it is 0 when modal is closed/opened
        }
      >
        {/* @ts-ignore */}
        End Quest {store.questEndTime > Math.floor(Date.now() / 1000) && `(Wait ${store.questEndTime - Math.floor(Date.now() / 1000)}s)`}
        <Timer countdown={countdown} setCountdown={setCountdown} />
      </Button>
      {/* Render the Timer component outside the modal */}
    </>
  )
}


interface TimerProps {
  countdown: number;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
}

const Timer: React.FC<TimerProps> = ({ countdown, setCountdown }) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      // Start the countdown timer
      timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      // Cleanup the timer on component unmount or when the countdown becomes 0
      clearInterval(timer);
    };
  }, [countdown, setCountdown]);

  return null; // Render nothing, as this component is just for handling the timer logic
};

export default ButtonQuest