import Link from 'next/link'
import React from 'react'
import { Twitter, Github, Globe } from 'lucide-react'

import styles from '../styles/Home.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div>
                Made with ❤️ by Omniv3rse.com
            </div>
            <div className="flex flex-row">
                <Link href="https://twitter.com/omniv3rse_" rel="noopener noreferrer" target="_blank">
                    <Twitter size={24} />
                </Link>
                <Link href="https://github.com/sov3333/farmcraft-web3-rpg" rel="noopener noreferrer" target="_blank">
                    <Github size={24} className="ml-4" />
                </Link>
                <Link href="https://omniv3rse.com" rel="noopener noreferrer" target="_blank">
                    <Globe size={24} className="ml-4" />
                </Link>
            </div>
        </footer>
    )
}

export default Footer