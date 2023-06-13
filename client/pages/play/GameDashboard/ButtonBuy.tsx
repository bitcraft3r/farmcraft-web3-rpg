import React from 'react'
import { useContractWrite } from 'wagmi'

import playerStore from "../../../store/contractStore";
import CONTRACT_ABI from '../../../data/abi.json'
import { Button } from '../../../components/ui/button'

interface ButtonBuyProps {
  farmerTokenId: number
}

const ButtonBuy: React.FC<ButtonBuyProps> = ({ farmerTokenId }) => {
  const store = playerStore()
  const farmerId = farmerTokenId

  const { data, isLoading, isSuccess, write } = useContractWrite({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'buySeeds',
    args: [farmerId, 1],
  })

  const buyHandler = () => {
    // @ts-ignore
    write('buySeeds')
  }

  return (
    <Button
      variant="secondary"
      onClick={buyHandler}
      // @ts-ignore
      disabled={isLoading || store.seed < 3}
    >
      Buy 3 Seeds with 1 GOLD
    </Button>
  )
}

export default ButtonBuy