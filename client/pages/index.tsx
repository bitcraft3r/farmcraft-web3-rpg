import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const gridContent = [
  {
    slug: "/mint",
    external: false,
    title: "Mint a Farmer NFT",
    description: "Create and own unique AI-generated Farmer NFTs. Unleash your creativity!"
  },
  {
    slug: "/play",
    external: false,
    title: "Adventures Await",
    description: "Master the art of farming, and race to glory in the Tractor Grand Prix!"
  },
  {
    slug: `https://testnet.zonic.app/collection/scroll_alpha_testnet/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
    external: true,
    title: "Collect NFTs",
    description: "Collect and customize unique farmer NFTs with distinct attributes and features."
  },
  {
    slug: "https://discord.gg/DGQCrEjWsP",
    external: true,
    title: "Join the Community",
    description: "Connect, trade, and share with fellow farmers in a vibrant community."
  },
]

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>FarmCraft - Farming simulator RPG</title>
        <meta
          content="Farming simulator RPG on the blockchain. Live on Scroll alpha testnet."
          name="description"
        />
        <meta property="og:title" content="FarmCraft - Farming simulator RPG" />
        <meta property="og:description" content="Farming simulator RPG on the blockchain. Live on Scroll alpha testnet." />
        <meta property="og:image" content="https://farmcraft.vercel.app/images/banner.webp" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="/play">FarmCraft</Link>!
        </h1>

        <code className={`${styles.code} ${styles.description}`}>
          Embark on a Thriving Farming Adventure
        </code>

        <div className={styles.grid}>
          {gridContent.map((content, index) => (
            <Link
              className={styles.card}
              href={content.slug}
              key={index}
              rel={content.external ? "noopener noreferrer" : undefined}
              target={content.external ? "_blank" : undefined}
            >
              <div className="text-xl font-bold text-[#c8a365] mb-1">{content.title} &rarr;</div>
              <p>{content.description}</p>
            </Link>
          ))}
        </div>
      </main>


    </div>
  );
};

export default Home;
