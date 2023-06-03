import Head from "next/head"

import FormMint from "./FormMint"

const Mint = () => {

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
                <FormMint />

            </main>
        </div>
    )
}

export default Mint
