import Head from "next/head"
import { useAccount, useContractRead } from 'wagmi'
import CONTRACT_ABI from '../data/abi.json'
import { useEffect, useState, Suspense } from "react"

const Play = () => {
  const [hasFarmer, setHasFarmer] = useState(false)
  const { address, isConnecting, isDisconnected } = useAccount()

  // TODO: fix console log "InvalidAddressError: Address "null" is invalid." when no wallet is connected. 
  // I could provide a fallback string e.g.
  // args: [address || '0x0000000000000000000000000000000000000000'],
  // But if no wallet is connected, there will be another error caused by reading the non-existent contract on the default chain.
  const { data, isError, isLoading } = useContractRead({
    address: '0x136F1c8362eA05287A90F106663d5DEC0ad3365F',
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
              ? "Mint a Famer to get started!"
              : "You have a Farmer. Start playing!"
            }
            </div>
        </main>
    </div>
  )
}

export default Play
