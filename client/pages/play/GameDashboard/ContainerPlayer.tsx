import Image from 'next/image'
import React from 'react'

interface ContainerPlayerProps {
  address: `0x${string}` | undefined
  imgIpfsHash: string
  experience: number
  status: boolean
}

const ContainerPlayer: React.FC<ContainerPlayerProps> = ({ address, imgIpfsHash, experience, status }) => {

  return (
    <div style={{ padding: "0.5rem", textAlign: "center" }}>
      <Image src={`https://gateway.pinata.cloud/ipfs/${imgIpfsHash}`} alt="FarmCraft farmer avatar" width="128" height="128" />
      <p>{address && address.substring(0, 6)}...{address && address.slice(-4)}</p>
      <p>Experience: {experience}</p>
      <p>Status: {status ? "Questing" : "Ready"}</p>
    </div>
  )
}

export default ContainerPlayer