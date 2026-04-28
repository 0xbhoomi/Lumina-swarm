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

##  Detailed Project Architecture Flowchart

```mermaid
flowchart TD
    %% ==================== PROBLEM ====================
    subgraph Problem[" THE PROBLEM"]
        A[Fast-Moving Crypto Markets<br/>24/7 News + Price Action]
        B[Human Limitations<br/>Can't monitor everything at once]
        C[Single AI Agents Fail<br/>• No persistent memory<br/>• Unreliable execution<br/>• No real coordination<br/>• High failure rate]
        A --> B
        B --> C
    end

    %% ==================== LUMINASWARM SOLUTION ====================
    subgraph LuminaSwarm[" LUMINASWARM - Multi-Agent Trading Swarm"]
        direction TB
        
        User[ User Query<br/>e.g. "hey swarm, what about ETH?"]

        OpenClaw[ OpenClaw Framework<br/>Agent Orchestration]

        %% === AGENT DETAILS ===
        Listener[ LISTENER AGENT<br/>• Monitors social sentiment<br/>• Farcaster, X, decentralized social graphs<br/>• Outputs: Sentiment Score (0.0 - 1.0)]
        
        Analyst[ ANALYST AGENT<br/>• Technical analysis<br/>• Chart patterns & indicators<br/>• Uniswap V3 liquidity depth<br/>• Outputs: Technical Score + Opportunity Score]
        
        Executor[ EXECUTOR AGENT<br/>• Reaches consensus<br/>• Risk assessment<br/>• Final trade decision<br/>• Outputs: Trade Parameters]
        
        User --> OpenClaw
        OpenClaw <--> Listener
        OpenClaw <--> Analyst
        OpenClaw <--> Executor
    end

    %% ==================== P2P COMMUNICATION ====================
    Listener -- " Peer-to-Peer Negotiation<br/>via Gensyn AXL" --- Analyst
    Analyst -- " Peer-to-Peer Negotiation<br/>via Gensyn AXL" --- Executor
    Executor -- " Peer-to-Peer Negotiation<br/>via Gensyn AXL" --- Listener

    %% ==================== INFRASTRUCTURE LAYERS ====================
    subgraph Infrastructure["🛠️ Decentralized Infrastructure"]
        direction TB
        OG[0G Storage + Compute<br/>• Persistent Memory (KV + Log)<br/>• Sealed Inference<br/>• Self-evolving learning]
        Keeper[KeeperHub MCP<br/>• Safe Execution<br/>• Gas Optimization<br/>• Retry Logic<br/>• MEV Protection]
        Uni[Uniswap V3<br/>• Base Sepolia Testnet<br/>• Real quotes & swaps]
        iNFT[ERC-7857 iNFT Brain<br/>• Ownership of swarm intelligence<br/>• Tradable & monetizable]
    end

    OpenClaw --> OG
    Listener --> OG
    Analyst --> OG
    Executor --> OG

    Executor --> Keeper
    Keeper --> Uni

    OpenClaw --> iNFT

    %% ==================== OUTPUT ====================
    subgraph Output["OUTPUT & REAL VALUE"]
        Trade[ Autonomous Safe Trade<br/>Executed on Uniswap V3]
        Learn[ Persistent Learning<br/>Swarm gets smarter every trade]
        Own[ Tradable iNFT Brain<br/>Own, sell, or share the swarm]
    end

    Uni --> Trade
    OG --> Learn
    iNFT --> Own

    %% ==================== STYLING ====================
    classDef problem fill:#FFEDD5,stroke:#FF9F1C,stroke-width:3px,color:#3F2A1E
    classDef solution fill:#FFF8EE,stroke:#FF9F1C,stroke-width:4px,color:#3F2A1E
    classDef agent fill:#FCD34D,stroke:#FF9F1C,stroke-width:3px,color:#3F2A1E
    classDef infra fill:#FFEDD5,stroke:#FF9F1C,stroke-width:2px,color:#3F2A1E
    classDef output fill:#A7E8A7,stroke:#FF9F1C,stroke-width:3px,color:#3F2A1E

    class Problem problem
    class LuminaSwarm solution
    class Listener,Analyst,Executor agent
    class Infrastructure infra
    class Output output
