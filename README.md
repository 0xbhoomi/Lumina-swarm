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
    %% ==================== PROBLEM ====================
    subgraph Problem[" THE PROBLEM"]
        A[Fast-Moving Crypto Markets\n24/7 News + Price Action]
        B[Human Limitations\nCan't monitor everything at once]
        C[Single AI Agents Fail\n• No persistent memory\n• Unreliable execution\n• No coordination\n• High failure rate]
        A --> B
        B --> C
    end

    %% ==================== LUMINASWARM SOLUTION ====================
    subgraph LuminaSwarm[" LUMINASWARM - Multi-Agent Trading Swarm"]
        direction TB
        
        User[ User Query\ne.g. "hey swarm, what about ETH?"]

        OpenClaw[ OpenClaw Framework\nAgent Orchestration]

        Listener[ LISTENER AGENT\n• Monitors social sentiment\n• Farcaster, X, etc.\n• Output: Sentiment Score]
        
        Analyst[ ANALYST AGENT\n• Technical analysis\n• Chart patterns\n• Uniswap V3 liquidity\n• Output: Technical Score]
        
        Executor[ EXECUTOR AGENT\n• Reaches consensus\n• Risk assessment\n• Final trade decision\n• Output: Trade Parameters]
        
        User --> OpenClaw
        OpenClaw <--> Listener
        OpenClaw <--> Analyst
        OpenClaw <--> Executor
    end

    %% ==================== P2P COMMUNICATION ====================
    Listener -- " P2P Negotiation\nvia Gensyn AXL" --- Analyst
    Analyst -- " P2P Negotiation\nvia Gensyn AXL" --- Executor
    Executor -- " P2P Negotiation\nvia Gensyn AXL" --- Listener

    %% ==================== INFRASTRUCTURE ====================
    subgraph Infrastructure[" Decentralized Infrastructure"]
        direction TB
        OG[0G Storage + Compute\n• Persistent Memory (KV + Log)\n• Sealed Inference]
        Keeper[KeeperHub MCP\n• Safe Execution\n• Gas Optimization\n• MEV Protection]
        Uni[Uniswap V3\n• Base Sepolia\n• Real quotes & swaps]
        iNFT[ERC-7857 iNFT Brain\n• Ownership & Monetization]
    end

    OpenClaw --> OG
    Listener --> OG
    Analyst --> OG
    Executor --> OG

    Executor --> Keeper
    Keeper --> Uni
    OpenClaw --> iNFT

    %% ==================== OUTPUT ====================
    subgraph Output[" OUTPUT & REAL VALUE"]
        Trade[ Autonomous Safe Trade\nExecuted on Uniswap V3]
        Learn[ Persistent Learning\nSwarm gets smarter]
        Own[ Tradable iNFT Brain]
    end

    Uni --> Trade
    OG --> Learn
    iNFT --> Own

    %% ==================== STYLING ====================
    classDef problem fill:#FFEDD5,stroke:#FF9F1C,stroke-width:3px
    classDef solution fill:#FFF8EE,stroke:#FF9F1C,stroke-width:4px
    classDef agent fill:#FCD34D,stroke:#FF9F1C,stroke-width:3px
    classDef infra fill:#FFEDD5,stroke:#FF9F1C,stroke-width:2px
    classDef output fill:#A7E8A7,stroke:#FF9F1C,stroke-width:3px

    class Problem problem
    class LuminaSwarm solution
    class Listener,Analyst,Executor agent
    class Infrastructure infra
    class Output output


