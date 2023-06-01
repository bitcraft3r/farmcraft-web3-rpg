import Head from "next/head"
import { useAccount, useContractRead } from 'wagmi'
import CONTRACT_ABI from '../../data/abi.json'
import { useEffect, useState } from "react"
import GameDashboard from "./GameDashboard"

const Play = () => {
  const [hasFarmer, setHasFarmer] = useState(false)
  const { address, isConnecting, isDisconnected } = useAccount()

  // TODO: fix console log "InvalidAddressError: Address "null" is invalid." when no wallet is connected. 
  // I could provide a fallback string e.g.
  // args: [address || '0x0000000000000000000000000000000000000000'],
  // But if no wallet is connected, there will be another error caused by reading the non-existent contract on the default chain.
  const { data, isError, isLoading } = useContractRead({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'balanceOf',
    args: [address],
  })

  useEffect(() => {
    if (address) {
      // @ts-ignore
      if (typeof data !== 'undefined' && BigInt(data) > BigInt('0')) {
        setHasFarmer(true)
      } else {
        setHasFarmer(false)
      }
    } else setHasFarmer(false)
  }, [address])

  return (
    <div>
      <Head>
        <title>FarmCraft - Play</title>
        <meta
          content="Blockchain farming simulator RPG"
          name="description"
        />
      </Head>

      <main>
        <div>
          {!hasFarmer
            ? <div className="flex justify-center items-center h-[75vh] text-xl text-center">Connect Wallet & Mint a Famer to get started!</div>
            : <GameDashboard address={address} />
          }
        </div>
      </main>
    </div>
  )
}

export default Play
