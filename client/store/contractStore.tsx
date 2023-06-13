import { create } from 'zustand'
import { persist } from "zustand/middleware"

// https://docs.pmnd.rs/zustand/getting-started/introduction

// interface PlayerStructOutput {
//     owner: string
//     experience: number
//     activeCrops: number[]
//     seed: number
//     gold: number
//     crop: number
//     questEndTime: number
//     status: number
//     ipfsHash: string
//     name: string
//     wins: number
//     selectedPlayer: number
//     setOwner: (owner: string) => void
//     setExperience: (experience: number) => void
//     setActiveCrops: (activeCrops: number[]) => void
//     setSeed: (seed: number) => void
//     setGold: (gold: number) => void
//     setCrop: (crop: number) => void
//     setQuestEndTime: (questEndTime: number) => void
//     setStatus: (status: number) => void
//     setIpfsHash: (ipfsHash: string) => void
//     setName: (name: string) => void
//     setWins: (wins: number) => void
//     setSelectedPlayer: (selectedPlayer: number) => void
// }

interface PlayerState {
    players: any[]
    // player: PlayerStructOutput | undefined
    owner: string
    experience: number | BigInt | undefined
    activeCrops: number[] | undefined
    seed: number | BigInt | undefined
    gold: number | BigInt | undefined
    crop: number | BigInt | undefined
    questEndTime: number | BigInt | undefined
    status: number | BigInt
    imageIpfsHash: string
    name: string
    wins: number | BigInt
    selectedPlayer: number
    setPlayers: (players: any[]) => void
    // setPlayer: (player: PlayerStructOutput | undefined) => void
    setOwner: (owner: string) => void
    setExperience: (experience: number | BigInt | undefined) => void
    setActiveCrops: (activeCrops: number[] | undefined) => void
    setSeed: (seed: number | BigInt | undefined) => void
    setGold: (gold: number | BigInt | undefined) => void
    setCrop: (crop: number | BigInt | undefined) => void
    setQuestEndTime: (questEndTime: number | BigInt | undefined) => void
    setStatus: (status: number | BigInt) => void
    setImageIpfsHash: (imageIpfsHash: string) => void
    setName: (name: string) => void
    setWins: (wins: number | BigInt) => void
    setSelectedPlayer: (selectedPlayer: number) => void
}

// TODO: Get type definitions for contract. `Typechain` doesn't work with Viem. Try: https://abitype.dev/guide/walkthrough.html.
interface ContractState {
    contract: any;
    setContract: (contract: any) => void;
};

const playerStore = persist<PlayerState>(
    (set, get) => ({
        players: [],
        // player: undefined,
        owner: "",
        experience: 0,
        activeCrops: [],
        seed: 0,
        gold: 0,
        crop: 0,
        questEndTime: 0,
        status: 0,
        imageIpfsHash: "",
        name: "",
        wins: 0,
        selectedPlayer: 0,
        setPlayers: (players) => set(() => ({ players: players })),
        // setPlayer: (player) => set(() => ({ player: player })),
        setOwner: (owner) => set(() => ({ owner: owner })),
        setExperience: (experience) => set(() => ({ experience: experience })),
        setActiveCrops: (activeCrops) => set(() => ({ activeCrops: activeCrops })),
        setSeed: (seed) => set(() => ({ seed: seed })),
        setGold: (gold) => set(() => ({ gold: gold })),
        setCrop: (crop) => set(() => ({ crop: crop })),
        setQuestEndTime: (questEndTime) => set(() => ({ questEndTime: questEndTime })),
        setStatus: (status) => set(() => ({ status: status })),
        setImageIpfsHash: (imageIpfsHash) => set(() => ({ imageIpfsHash: imageIpfsHash })),
        setName: (name) => set(() => ({ name: name })),
        setWins: (wins) => set(() => ({ wins: wins })),
        setSelectedPlayer: (selectedPlayer) => set(() => ({ selectedPlayer: selectedPlayer })),
    }),
    {
        name: "Crafter",
    }
);

export const contractStore = create<ContractState>((set) => ({
    contract: null,
    setContract: async (contract) =>
        set(() => ({ contract })),
}));

export default create(playerStore);
