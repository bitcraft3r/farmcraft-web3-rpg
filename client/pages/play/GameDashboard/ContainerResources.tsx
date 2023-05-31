import React from 'react'

interface ContainerResourcesProps {
  seeds: number
  gold: number
  crops: number
}

const ContainerResources: React.FC<ContainerResourcesProps> = ({ seeds, gold, crops }) => {
  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
        <p>GOLD: {gold}</p>
        <p>SEED: {seeds}</p>
        <p>CROP: {crops}</p>
    </div>
  )
}

export default ContainerResources