import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import { UserPlus2 } from 'lucide-react'
import Link from "next/link"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { toast } from "../../components/ui/use-toast"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form"
import CONTRACT_ABI from '../../data/abi.json'
import ipfsHashes from '../../data/ipfsHashes'

const FormSchema = z.object({
    name: z.string().min(1, {
        message: "Username must be at least 1 character.",
    }).max(16, {
        message: "Username must not be more than 16 characters.",
    }),
    // image: z.string().length(46, {
    //     message: "IPFS hash must be 46 characters.",
    // }),
})

export default function FormMint() {
    const { data, isLoading: isLoadingWrite, isSuccess: isSuccessWrite, write } = useContractWrite({
        // @ts-ignore
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mintFarmer',
    })

    const { isLoading: isLoadingWait, isSuccess: isSuccessWait } = useWaitForTransaction({
        hash: data?.hash,
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // console.log(`Minting NFT with name & image hash:`, form.getValues().name, form.getValues().image)
        const playerName = form.getValues().name
        // const ipfsHash = form.getValues().image
        const randomIndex = Math.floor(Math.random() * ipfsHashes.length);
        const ipfsHash = ipfsHashes[randomIndex];
        console.log(`Minting NFT with name:`, form.getValues().name, `& img hash:`, ipfsHash)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
        write({
            args: [ipfsHash, playerName]
        });
    }

    const formFields = [
        { name: "name", label: "Username", placeholder: "Crafter" },
        // { name: "image", label: "Image IPFS Hash", placeholder: "QmRthR1p7cwnPJbinJprXvchdkqJr21AbjjfE6UGMR3mkt" },
    ]

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    {formFields.map(({ name, label, placeholder }) => (
                        <FormField
                            key={name}
                            control={form.control}
                            // @ts-ignore
                            name={name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={placeholder} defaultValue="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    {/* <Button variant="secondary">Submit</Button> */}
                    <Button variant="secondary" type="submit" size="lg" className="border-4 border-slate-500 hover:border-slate-50 font-semibold text-xl bg-slate-100" disabled={!write || isLoadingWrite || isLoadingWait}>
                        <UserPlus2 className="mr-2 h-7 w-7" />
                        {isLoadingWrite || isLoadingWait ? 'Minting...' : 'Mint Farmer'}
                    </Button>
                </form>
            </Form>
            {isSuccessWrite && isSuccessWait && (
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
        </>
    )
}
