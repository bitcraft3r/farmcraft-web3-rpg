import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>FarmCraft - Farming simulator RPG</title>
        <meta
          content="Farming simulator RPG on the blockchain."
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="">FarmCraft</a>!
        </h1>

        <p className={styles.description}>
          <code className={styles.code}>Become a Digital Farmer and Grow Your Virtual Crops</code>
        </p>

        <div className={styles.grid}>
          <Link className={styles.card} href="/play">
            <h2>Plant Crops &rarr;</h2>
            <p>Cultivate a variety of crops with different maturity times and yields.</p>
          </Link>

          <Link className={styles.card} href="/play">
            <h2>Harvest Rewards &rarr;</h2>
            <p>Reap the rewards of your hard work by harvesting your crops.</p>
          </Link>

          <Link
            className={styles.card}
            href="/play"
          >
            <h2>Forage Quests &rarr;</h2>
            <p>Explore the wilderness and earn rewards.</p>
          </Link>

          <Link className={styles.card} href="/play">
            <h2>Trade Crops for GOLD &rarr;</h2>
            <p>Sell your crops to earn GOLD and expand your farm.</p>
          </Link>

          <Link
            className={styles.card}
            href="https://testnet.zonic.app/collection/scroll_alpha_testnet/0x248572ed92B54de2526fc357F420a2ab4E7D2DaB"
            rel="noopener noreferrer"
            target="_blank"
          >
            <h2>Collect NFTs &rarr;</h2>
            <p>Each farmer is a unique NFT with customizable images and attributes.</p>
          </Link>

          <Link
            className={styles.card}
            href="https://discord.gg/DGQCrEjWsP"
            rel="noopener noreferrer"
            target="_blank"
          >
            <h2>Join a Thriving Community &rarr;</h2>
            <p>
              Connect with fellow farmers, trade resources, and share farming strategies.
            </p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <Link href="https://twitter.com/omniv3rse_" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by Omniv3rse.com
        </Link>
      </footer>
    </div>
  );
};

export default Home;
