import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const Navbar = () => {
  return (
    <nav className="py-4 flex justify-between items-center">
      <Link href="/">
        <div className="font-bold lg:text-4xl md:text-3xl sm:text-2xl text-xl">FarmCraft</div>
      </Link>
      <div className="lg:text-3xl md:text-2xl sm:text-xl text-md flex justify-between items-center">
        <Link href="/mint">Mint</Link>
        <Link href="/play" className="md:ml-[2rem] sm:ml-2 ml-1">Play</Link>
      </div>
      <ConnectButton
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }} />
    </nav>
  )
}

export default Navbar
