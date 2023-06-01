import React from 'react'
import { Sprout, Map, CircleDollarSign } from 'lucide-react'

import { Button } from '../../../components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    // DialogFooter,
} from "../../../components/ui/dialog"

interface GameDialogProps {
    children: React.ReactNode
    title: string
    description: string
}

const GameDialog: React.FC<GameDialogProps> = ({ children, title, description }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" size="lg" className="border-4 border-slate-500 hover:border-slate-50 font-semibold md:text-lg text-md bg-slate-100">
                    {title === "Farm" && <Sprout className="mr-2 h-5 w-5" />}
                    {title === "Forage" && <Map className="mr-2 h-5 w-5" />}
                    {title === "Market" && <CircleDollarSign className="mr-2 h-5 w-5" />}
                    <p>{title}</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-4 border-slate-800">
                <DialogHeader>
                    <DialogTitle className="text-3xl">{title}</DialogTitle>
                    <DialogDescription className="text-lg">{description}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {children}
                </div>
                {/* <DialogFooter>
                    <Button type="submit" variant="ghost">Save changes</Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    )
}

export default GameDialog