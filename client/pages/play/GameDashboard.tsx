import Image from 'next/image'
import React from 'react'

import ButtonFarm from './GameDashboard/ButtonFarm'
import ButtonQuest from './GameDashboard/ButtonQuest'
import ButtonSell from './GameDashboard/ButtonSell'
import ButtonBuy from './GameDashboard/ButtonBuy'
import ContainerPlayer from './GameDashboard/ContainerPlayer'
import ContainerStats from './GameDashboard/ContainerStats'
import ContainerResources from './GameDashboard/ContainerResources'

interface GameDashboardProps {
  address: `0x${string}` | undefined
}

const GameDashboard: React.FC<GameDashboardProps> = ({ address }) => {
  return (
    <div>
      <div>
        {/* Minimap */}
        <Image src="/images/minimap.webp" alt="FarmCraft Game Minimap" width={1200} height={800} layout="responsive" style={{ position: "absolute", zIndex: -1 }} />

        {/* Actions */}
        <div style={{ position: "absolute", top: "60%", left: "40%", transform: "translate(-60%, -40%)" }}>
          <ButtonFarm address={address} />
        </div>
        <div style={{ position: "absolute", top: "55%", left: "80%", transform: "translate(-55%, -80%)" }}>
          <ButtonQuest address={address} />
        </div>
        <div style={{ position: "absolute", top: "75%", left: "50%", transform: "translate(-75%, -50%)" }}>
          <ButtonSell />
        </div>
        <div style={{ position: "absolute", top: "80%", left: "45%", transform: "translate(-80%, -45%)" }}>
          <ButtonBuy />
        </div>

      </div>
      
      {/* Player */}
      <div style={{ width: "200px", height: "100%", border: "1px solid gray" }}>
        <ContainerPlayer address={address} />
      </div>

      {/* Attributes */}
      <div style={{ width: "200px", height: "100%", border: "1px solid gray" }}>
        <ContainerStats address={address} />
      </div>

      {/* Resources */}
      <div style={{ position: "absolute", right: "10%", top: "15%", width: "150px", height: "150px", border: "1px solid gray" }}>
        <ContainerResources address={address} />
      </div>

    </div>
  )
}

export default GameDashboard