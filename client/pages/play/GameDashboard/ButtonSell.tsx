import React from 'react'
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

  const sellHandler = () => {
    // @ts-ignore
    write('sellCrops')
  }

  return (
    <Button
      variant="secondary"
      onClick={sellHandler}
      // @ts-ignore
      disabled={isLoading || store.crop < 5}
    >
      Sell 5 Crops for 1 GOLD
    </Button>
  )
}

export default ButtonSell