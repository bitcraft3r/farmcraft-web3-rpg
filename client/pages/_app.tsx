import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  Chain,
  arbitrum, mainnet, optimism, polygon,
  arbitrumGoerli, scrollTestnet, goerli,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const mantleTestnet: Chain = {
  id: 5_001,
  name: 'Mantle Testnet',
  network: 'mantleTestnet',
  // @ts-ignore
  iconUrl: 'https://prod-assets.cerberus.supraoracles.com/images/icons/mantle-logo.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'BitDAO',
    symbol: 'BIT',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.mantle.xyz/'],
    },
    public: {
      http: ['https://rpc.testnet.mantle.xyz/'],
    },
  },
  blockExplorers: {
    default: { name: 'MantleRingwood', url: 'https://explorer.testnet.mantle.xyz' },
  },
  testnet: true,
}

const scrollAlpha: Chain = {
  ...scrollTestnet,
  // @ts-ignore
  iconUrl: 'https://scroll.io/logo.png',
  iconBackground: '#fff',
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    // mainnet,
    // polygon,
    // optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [arbitrumGoerli, scrollAlpha, mantleTestnet] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
