import Image from 'next/image'
import React from 'react'

interface ContainerPlayerProps {
  address: `0x${string}` | undefined
  imgIpfsHash: string
  experience: number
  status: number
  seeds: number
  gold: number
  crops: number
  name: string
  wins: number
}

const ContainerPlayer: React.FC<ContainerPlayerProps> = ({ address, imgIpfsHash, experience, status, seeds, gold, crops, name, wins }) => {

  console.log(status)

  return (
    <div className="md:px-6 md:py-2 px-2 py-1 text-center flex md:flex-col flex-row md:justify-center justify-around items-center gap-2 md:text-xl sm:text-lg text-md">
      <div className="flex flex-col items-center">
        <Image src={`https://gateway.pinata.cloud/ipfs/${imgIpfsHash}`} alt="FarmCraft farmer avatar" width="100" height="100" className="rounded-full p-2" />
        <p className="lg:text-2xl md:text-xl text-lg font-bold">
          {name && name.length <= 8
            ? name
            : name?.substring(0, 8) + "..."
          }
        </p>
      </div>
      <div>
        <p>XP: {experience}</p>
        <p>Wins: {wins}</p>
        <p className={`${status ? "text-red-500" : "text-emerald-500"} font-bold`}>
          {
            status === 1
            ? "Farming"
              : status === 2
              ? "Foraging"
                : status === 3
                ? "Racing"
                  : "Ready"
          }
        </p>
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