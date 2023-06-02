import Head from "next/head"
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { Gamepad2, UserPlus, UserPlus2 } from 'lucide-react'

import CONTRACT_ABI from '../../data/abi.json'
import { Button } from "../../components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

const Mint = () => {
    const [ipfsHash, setIpfsHash] = useState("")
    const [playerName, setPlayerName] = useState("Crafter")

    useEffect(() => {
        setIpfsHash("QmQGgmAv2LybwF3N7EQPHiq3bevku3LEZvHMM1aUH7C1Zh")
    }, [])


    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        // @ts-ignore
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mintFarmer',
        args: [ipfsHash, playerName]
    })
    const { data, error, isError, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    const handleMint = () => {
        console.log(`Minting NFT with image hash:`, ipfsHash)
        // @ts-ignore
        write();
    }

    // TODO: Redirect to `/play` page onSuccess of mint.
    // BUG: the `/play` page is not being refreshed after minting to setHasFarmer(true).

    return (
        <div>
            <Head>
                <title>FarmCraft - Mint</title>
                <meta
                    content="Blockchain farming simulator RPG"
                    name="description"
                />
            </Head>

            <main className="flex justify-center items-center h-[75vh] flex-col">
                <Button variant="secondary" size="lg" className="border-4 border-slate-500 hover:border-slate-50 font-semibold text-xl bg-slate-100" disabled={!write || isLoading || isPrepareError} onClick={handleMint}>
                    <UserPlus2 className="mr-2 h-7 w-7" />
                    {isLoading ? 'Minting...' : 'Mint Farmer'}
                </Button>
                {isSuccess && (
                    <div className="mt-4">
                        Successfully minted your NFT!
                        <div>
                            <Link href="/play" className="underline">Start playing</Link>
                        </div>
                        <div>
                            <Link href={`https://blockscout.scroll.io/tx/${data?.hash}`} rel="noreferrer noopener" target="_blank" className="underline">View on block explorer</Link>
                        </div>
                    </div>
                )}
                {/* {(isPrepareError || isError) && (
                    <div>Error: {(prepareError || error)?.message}</div>
                )} */}
            </main>
        </div>
    )
}

export default Mint
