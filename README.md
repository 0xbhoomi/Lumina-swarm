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
| Network            | Base Sepolia (Testnet)              |

---

##  Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/luminaswarm.git
cd luminaswarm
npm install
```mermaid
flowchart TD
    Problem[" THE PROBLEM"] --> LuminaSwarm[" LUMINASWARM"]
    LuminaSwarm --> Infrastructure[" Infrastructure"]
    Infrastructure --> Output[" RESULTS"]

    subgraph Problem
        A[Fast Crypto Markets] --> B[Humans Can't Keep Up] --> C[Single Agents Fail]
    end

    subgraph LuminaSwarm
        User --> OpenClaw[OpenClaw]
        OpenClaw --> Listener[ Listener<br/>Social Sentiment]
        OpenClaw --> Analyst[ Analyst<br/>Technical + Liquidity]
        OpenClaw --> Executor[ Executor<br/>Trade Decision]
    end

    Listener ---|"Gensyn AXL P2P"| Analyst
    Analyst ---|"Gensyn AXL P2P"| Executor

    subgraph Infrastructure
        OG[0G Storage + Compute]
        Keeper[KeeperHub MCP]
        Uni[Uniswap V3]
        iNFT[iNFT Brain]
    end

    OpenClaw --> OG
    Executor --> Keeper --> Uni
    OpenClaw --> iNFT

    Uni --> Trade[Autonomous Safe Trade]
    OG --> Learning[Persistent Learning]
    iNFT --> Ownership[Tradable iNFT]
