// @ts-nocheck

import Image from 'next/image'
import React from 'react'

import playerStore from "../../../store/contractStore";

const ContainerPlayer = () => {
  const store = playerStore();

  // USE FARMER DATA FROM ZUSTAND STORE
  // console.log(`store.owner`, store.owner)
  // console.log(`store.experience`, store.experience)
  // console.log(`store.activeCrops`, store.activeCrops)
  // console.log(`store.seed`, store.seed)
  // console.log(`store.gold`, store.gold)
  // console.log(`store.crop`, store.crop)
  // console.log(`store.questEndTime`, store.questEndTime)
  // console.log(`store.status`, store.status)
  // console.log(`store.imageIpfsHash`, store.imageIpfsHash)
  // console.log(`store.name`, store.name)
  // console.log(`store.wins`, store.wins)

  return (
    <div className="md:px-6 md:py-2 px-2 py-1 text-center flex md:flex-col flex-row md:justify-center justify-around items-center gap-2 md:text-xl sm:text-lg text-md">
      <div className="flex flex-col items-center">
        <Image src={`https://gateway.pinata.cloud/ipfs/${store.imageIpfsHash}`} alt="FarmCraft Avatar" width="100" height="100" className="rounded-full p-2" />
        <p className="lg:text-2xl md:text-xl text-lg font-bold">
          {store.name && store.name.length <= 10
            ? store.name
            : store.name?.substring(0, 10) + "..."
          }
        </p>
      </div>
      <div>
        <p>XP: {store.experience}</p>
        <p>Wins: {store.wins}</p>
        <p className={`${store.status ? "text-red-500" : "text-emerald-500"} font-bold`}>
          {
            store.status === 1
              ? "Farming"
              : store.status === 2
                ? "Foraging"
                : store.status === 3
                  ? "Racing"
                  : "Ready"
          }
        </p>
      </div>
      <div>
        <p>Gold: {store.gold}</p>
        <p>Seed: {store.seed}</p>
        <p>Crop: {store.crop}</p>
      </div>
    </div>
  )
}

export default ContainerPlayer