import React, { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import CONTRACT_ABI from '../../../data/abi.json'

interface ContainerPlayerProps {
  address: `0x${string}` | undefined
}

const ContainerPlayer: React.FC<ContainerPlayerProps> = ({ address }) => {
  const farmerId = 1 // replace with actual farmerId

  const { data, isError, isLoading } = useContractRead({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getFarmer',
    args: [farmerId],
  })

  const [farmerData, setFarmerData] = useState([])

  useEffect(() => {
    if (data) {
      console.log(`data in Player`, data)
      // @ts-ignore
      setFarmerData(data)
    }

  }, [])

  return (
    <div style={{ padding: "0.5rem", textAlign: "center" }}>
        <p>AVATAR</p>
        <p>{address && address.substring(0, 6)}...{address &&address.slice(-4)}</p>
    </div>
  )
}

export default ContainerPlayer