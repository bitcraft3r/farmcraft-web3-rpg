import Head from "next/head"
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import CONTRACT_ABI from '../data/abi.json'

const Mint = () => {
    const { config, error: prepareError, isError: isPrepareError} = usePrepareContractWrite({
        address: '0x136F1c8362eA05287A90F106663d5DEC0ad3365F',
        abi: CONTRACT_ABI,
        functionName: 'mintFarmer',
        args: ["QmQGgmAv2LybwF3N7EQPHiq3bevku3LEZvHMM1aUH7C1Zh"]
    })
    const { data, error, isError, write } = useContractWrite(config)
 
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })


  return (
    <div>
        <Head>
            <title>FarmCraft - Mint</title>
            <meta
            content="Blockchain farming simulator RPG"
            name="description"
            />
        </Head>

        <main>
            {/* @ts-ignore */}
            <button disabled={!write || isLoading} onClick={() => write()}>
                {isLoading ? 'Minting...' : 'Mint'}
            </button>
            {isSuccess && (
                <div>
                Successfully minted your NFT!
                <div>
                    <a href={`https://goerli.arbiscan.io/tx/${data?.hash}`} rel="noreferrer noopener" target="_blank">Arbiscan</a>
                </div>
                </div>
            )}
            {(isPrepareError || isError) && (
                <div>Error: {(prepareError || error)?.message}</div>
            )}
        </main>
    </div>
  )
}

export default Mint
