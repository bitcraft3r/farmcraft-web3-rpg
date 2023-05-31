import React from 'react'
import { useContractWrite } from 'wagmi'
import CONTRACT_ABI from '../../../data/abi.json'

interface ButtonBuyProps {
  farmerTokenId: number
}

const ButtonBuy: React.FC<ButtonBuyProps> = ({ farmerTokenId }) => {
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
    <button onClick={buyHandler} disabled={isLoading}>Buy Seeds</button>
  )
}

export default ButtonBuy