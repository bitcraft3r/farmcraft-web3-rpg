import React, { useState, useEffect } from 'react'
import { useContractRead } from 'wagmi'
import CONTRACT_ABI from '../../../data/abi.json'

interface ContainerResourcesProps {
  address: `0x${string}` | undefined
}

const ContainerResources: React.FC<ContainerResourcesProps> = ({ address }) => {
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
      console.log(`data in Resources`, data)
      // @ts-ignore
      setFarmerData(data)
    }

  }, [])
  

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
        <p>GOLD: {Number(farmerData[5])}</p>
        <p>SEED: {Number(farmerData[4])}</p>
        <p>CROP: {Number(farmerData[6])}</p>
    </div>
  )
}

export default ContainerResources