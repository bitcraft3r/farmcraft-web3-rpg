import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { toast } from "../../components/ui/use-toast"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form"

const FormSchema = z.object({
    name: z.string().min(1, {
        message: "Username must be at least 1 character.",
    }).max(16, {
        message: "Username must not be more than 16 characters.",
    }),
    image: z.string().length(46),
})

export function FormMint() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(`submitted name:`, form.getValues().name)
        console.log(`submitted image:`, form.getValues().image)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    const formFields = [
        { name: "name", label: "Name", placeholder: "Crafter" },
        { name: "image", label: "Image IPFS Hash", placeholder: "QmRthR1p7cwnPJbinJprXvchdkqJr21AbjjfE6UGMR3mkt" },
    ]

    return (
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
                <Button variant="secondary" type="submit">Submit</Button>
            </form>
        </Form>
    )
}
