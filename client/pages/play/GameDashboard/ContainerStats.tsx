import React, { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import CONTRACT_ABI from '../../../data/abi.json'

interface ContainerStatsProps {
  address: `0x${string}` | undefined
}

const ContainerStats: React.FC<ContainerStatsProps> = ({ address }) => {
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
      console.log(`data in Stats`, data)
      // @ts-ignore
      setFarmerData(data)
    }

  }, [])

  return (
    <div style={{ padding: "0.5rem", textAlign: "center" }}>
        <p>Level: {Number(farmerData[2])}</p>
        <p>Experience: {Number(farmerData[1])}</p>
        <p>Status: {farmerData[8] ? "Questing" : "Ready"}</p>
    </div>
  )
}

export default ContainerStats