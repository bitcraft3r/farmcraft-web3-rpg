import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
// import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
// import { ScrollAlphaTestnet } from "@thirdweb-dev/chains";

import NavBar from "../components/Navbar";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "arbitrum-goerli";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <ChakraProvider>
        <NavBar />
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
