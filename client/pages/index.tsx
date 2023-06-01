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
          Welcome to <Link href="/play">FarmCraft</Link>!
        </h1>

        <p className={styles.description}>
          <code className={styles.code}>Become a Digital Farmer and Grow Your Virtual Crops</code>
        </p>

        <div className={styles.grid}>
          <Link className={styles.card} href="/mint">
            <h2>Mint a Farmer NFT &rarr;</h2>
            <p>Create and own a unique AI-generated Farmer NFT.</p>
          </Link>

          <Link className={styles.card} href="/play">
            <h2>Start Playing &rarr;</h2>
            <p>Cultivate, harvest, explore, and trade for a thriving farm.</p>
          </Link>

          <Link
            className={styles.card}
            href={`https://testnet.zonic.app/collection/scroll_alpha_testnet/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`}
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


    </div>
  );
};

export default Home;
