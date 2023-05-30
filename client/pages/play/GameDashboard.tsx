import Image from 'next/image'
import React from 'react'

const GameDashboard = () => {
  return (
    <div>
      <div>
        {/* Minimap */}
        <Image src="/images/minimap.webp" alt="FarmCraft Game Minimap" width={1200} height={800} layout="responsive" style={{ position: "absolute", zIndex: -1 }} />

        {/* Actions */}
        <button style={{ position: "absolute", top: "60%", left: "40%", transform: "translate(-60%, -40%)" }}>Plant Seeds / Harvest Crops</button>
        <button style={{ position: "absolute", top: "55%", left: "80%", transform: "translate(-55%, -80%)" }}>Forage / End Quest</button>
        <button style={{ position: "absolute", top: "75%", left: "50%", transform: "translate(-75%, -50%)" }}>Sell Crops</button>
        <button style={{ position: "absolute", top: "80%", left: "45%", transform: "translate(-80%, -45%)" }}>Buy Seeds</button>

      </div>
      
      {/* Player */}
      <div style={{ width: "200px", height: "100%", border: "1px solid gray", padding: "0.5rem", textAlign: "center" }}>
        <p>AVATAR</p>
        <p>Name / 0x123...456</p>
      </div>

      {/* Attributes */}
      <div style={{ width: "200px", height: "100%", border: "1px solid gray", padding: "0.5rem", textAlign: "center" }}>
        <p>Level: 1</p>
        <p>Experience: 0</p>
        <p>Status: Ready / Questing</p>
      </div>

      {/* Resources */}
      <div style={{ position: "absolute", right: "10%", top: "15%", width: "150px", height: "150px", border: "1px solid gray", padding: "1rem", textAlign: "center" }}>
        <p>GOLD: 0</p>
        <p>SEED: 0</p>
        <p>CROP: 0</p>
      </div>

    </div>
  )
}

export default GameDashboard