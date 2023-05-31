import React from 'react'

interface ContainerStatsProps {
  experience: number
  status: boolean
}

const ContainerStats: React.FC<ContainerStatsProps> = ({ experience, status }) => {
  return (
    <div style={{ padding: "0.5rem", textAlign: "center" }}>
        <p>Experience: {experience}</p>
        <p>Status: {status ? "Questing" : "Ready"}</p>
    </div>
  )
}

export default ContainerStats