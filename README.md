#  LuminaSwarm

**AI Research & Trading Swarm**  
**ETHGlobal Open Agents Hackathon 2026**  

A decentralized multi-agent system that turns social sentiment + technical analysis into safe, autonomous Uniswap trades using the full power of 0G, Gensyn AXL, KeeperHub, and Uniswap V3.

---

##  Project Overview

**LuminaSwarm** is a **self-coordinating swarm of AI agents** that works 24/7 as your personal professional trading desk.

### How it Works
1. **Listener Agent** → Monitors social sentiment (Farcaster, Twitter/X, etc.)
2. **Analyst Agent** → Reads technical indicators and Uniswap V3 liquidity
3. **Executor Agent** → Reaches consensus and triggers safe trades

All agents communicate **privately peer-to-peer** using Gensyn AXL, store persistent memory on 0G Storage, and execute reliably through KeeperHub.

---

##  Prize Track Submissions

- **0G Best Autonomous Agents, Swarms & iNFT** → Persistent memory + iNFT Brain
- **Gensyn Best Application of AXL** → Real P2P agent-to-agent communication
- **Uniswap Best API Integration** → Real Uniswap V3 quotes & swaps
- **KeeperHub Best Use** → Safe execution, gas optimization & MEV protection

---

##  Key Features

- **Real Multi-Agent Collaboration** via Gensyn AXL (no central broker)
- **Persistent Memory** using 0G Storage (KV + Log) — swarm gets smarter every day
- **Sealed AI Inference** on 0G Compute
- **Reliable Execution** powered by KeeperHub MCP (retry logic, gas optimization, MEV protection)
- **Onchain Trading** on Uniswap V3 (Base Sepolia)
- **iNFT Brain** — Mint the entire swarm intelligence as ERC-7857 iNFT
- **Beautiful Neo-Brutalist UI** with warm playful design
- **Multi-chain ready** (focused on Base Sepolia for hackathon)

---

##  Tech Stack

| Component          | Technology                          |
|--------------------|-------------------------------------|
| Agent Framework    | OpenClaw                            |
| P2P Communication  | Gensyn AXL                          |
| Storage & Compute  | 0G Storage + 0G Compute             |
| Execution Layer    | KeeperHub MCP                       |
| Trading            | Uniswap V3                          |
| Ownership          | ERC-7857 iNFT                       |
| Frontend           | Next.js / Antigravity + Neo-Brutalism |
| Network            | Base Sepolia (Testnet)              

```mermaid
flowchart TD
    subgraph Problem["THE PROBLEM"]
        A[Fast-Moving Crypto Markets]
        B[Human Limitations]
        C[Single AI Agents Fail]
        A --> B
        B --> C
    end

    subgraph LuminaSwarm["LUMINASWARM SOLUTION"]
        User[User Query]
        OpenClaw[OpenClaw Framework]

        Listener[LISTENER AGENT]
        Analyst[ANALYST AGENT]
        Executor[EXECUTOR AGENT]

        User --> OpenClaw
        OpenClaw <--> Listener
        OpenClaw <--> Analyst
        OpenClaw <--> Executor
    end

    Listener -- "P2P via Gensyn AXL" --- Analyst
    Analyst -- "P2P via Gensyn AXL" --- Executor
    Executor -- "P2P via Gensyn AXL" --- Listener

    subgraph Infrastructure["DECENTRALIZED INFRASTRUCTURE"]
        OG[0G Storage + Compute]
        Keeper[KeeperHub MCP]
        Uni[Uniswap V3]
        iNFT[ERC-7857 iNFT Brain]
    end

    OpenClaw --> OG
    Executor --> Keeper
    Keeper --> Uni
    OpenClaw --> iNFT

    subgraph Output["OUTPUT"]
        Trade[Autonomous Safe Trade]
        Learn[Persistent Learning]
        Own[Tradable iNFT Brain]
    end

    Uni --> Trade
    OG --> Learn
    iNFT --> Own
