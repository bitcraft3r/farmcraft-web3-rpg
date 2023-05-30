import React from 'react'
import { useContractWrite } from 'wagmi'
import CONTRACT_ABI from '../../../data/abi.json'

const ButtonBuy = () => {
  const farmerId = 1 // replace with actual farmerId

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