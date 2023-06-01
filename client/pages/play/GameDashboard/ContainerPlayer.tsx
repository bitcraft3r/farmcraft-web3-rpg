import Image from 'next/image'
import React from 'react'

interface ContainerPlayerProps {
  address: `0x${string}` | undefined
  imgIpfsHash: string
  experience: number
  status: boolean
  seeds: number
  gold: number
  crops: number
}

const ContainerPlayer: React.FC<ContainerPlayerProps> = ({ address, imgIpfsHash, experience, status, seeds, gold, crops }) => {

  return (
    <div className="md:px-6 md:py-2 px-2 py-1 text-center flex md:flex-col flex-row md:justify-center justify-around items-center gap-2 md:text-xl sm:text-lg text-md">
      <div className="flex flex-col items-center">
        <Image src={`https://gateway.pinata.cloud/ipfs/${imgIpfsHash}`} alt="FarmCraft farmer avatar" width="100" height="100" className="rounded-full p-2" />
        <p className="md:text-lg sm:text-md text-sm">{address && address.substring(0, 6)}...{address && address.slice(-4)}</p>
      </div>
      <div>
        <p>XP: {experience}</p>
        <p className={`${status ? "text-red-500" : "text-emerald-500"} font-bold`}>{status ? "Questing" : "Ready"}</p>
      </div>
      <div>
        <p>Gold: {gold}</p>
        <p>Seed: {seeds}</p>
        <p>Crop: {crops}</p>
      </div>
    </div>
  )
}

export default ContainerPlayer