import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/">
            <div style={{ fontWeight: "bold", fontSize: "2rem" }}>FarmCraft</div>
        </Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "1.5rem" }}>
            <Link href="/mint">Mint</Link>
            <Link href="/play" style={{ paddingLeft: "2rem" }}>Play</Link>
        </div>
        <ConnectButton />
    </nav>
  )
}

export default Navbar
