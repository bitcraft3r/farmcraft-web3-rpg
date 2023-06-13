import React, { useEffect } from 'react'
import { useContractWrite } from 'wagmi'

import playerStore from "../../../store/contractStore";
import CONTRACT_ABI from '../../../data/abi.json'
import { Button } from '../../../components/ui/button'

interface ButtonSellProps {
  farmerTokenId: number
}

const ButtonSell: React.FC<ButtonSellProps> = ({ farmerTokenId }) => {
  const store = playerStore()
  const farmerId = farmerTokenId

  const { data, isLoading, isSuccess, write } = useContractWrite({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'sellCrops',
    args: [farmerId, 5],
  })

  useEffect(() => {
    if (isSuccess) {
      console.log(`isSuccess`, isSuccess)
      console.log(`data`, data?.hash)

      // Update store quantities
      store.increaseGold(1)
      store.increaseCrop(-5)
    }
  }, [isSuccess, data])

  const sellHandler = () => {
    // @ts-ignore
    write('sellCrops')
  }

  return (
    <Button
      variant="secondary"
      onClick={sellHandler}
      // @ts-ignore
      disabled={isLoading || store.crop < 5 || store.status !== 0}
    >
      Sell 5 Crops for 1 GOLD
    </Button>
  )
}

export default ButtonSell