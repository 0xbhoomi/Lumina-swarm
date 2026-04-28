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


## 🔗 Sponsor Integrations & Usage

### Powered By

| Project       | Logo | Official Link | How LuminaSwarm Uses It |
|---------------|------|---------------|-------------------------|
| **0G**        | ![0G](https://0g.ai/favicon.ico) | [0g.ai](https://0g.ai/) | • Persistent swarm memory using 0G Storage (KV + Log)<br>• Sealed AI inference via 0G Compute<br>• Long-term learning so the swarm gets smarter every trade |
| **Gensyn AXL** | ![Gensyn](https://www.gensyn.ai/favicon.ico) | [gensyn.ai](https://www.gensyn.ai/) <br>[AXL Docs](https://docs.gensyn.ai/tech/agent-exchange-layer) | • True peer-to-peer communication between Listener, Analyst & Executor agents<br>• No central server — fully decentralized agent negotiation |
| **Uniswap V3** | ![Uniswap](https://uniswap.org/favicon.ico) | [developers.uniswap.org](https://developers.uniswap.org/) | • Real-time price quotes and liquidity data<br>• Safe token swaps on Base Sepolia<br>• Core trading execution layer |
| **KeeperHub** | ![KeeperHub](https://keeperhub.com/favicon.ico) | [keeperhub.com](https://keeperhub.com/) <br>[App](https://app.keeperhub.com/) | • Reliable on-chain execution (retry logic, gas optimization)<br>• MEV protection and slippage control<br>• MCP integration for safe autonomous trades |

---

### How These Technologies Work Together in LuminaSwarm

- **User** asks a question → **OpenClaw** routes it to the three agents.
- Agents **negotiate privately** using **Gensyn AXL**.
- They store and retrieve long-term knowledge from **0G Storage + Compute**.


```mermaid
flowchart TD
    %% ==================== PROBLEM ====================
    subgraph Problem[" THE PROBLEM"]
        A[Fast-Moving Crypto Markets\n24/7 News + Price Action]
        B[Human Limitations\nCan't monitor everything simultaneously]
        C[Single AI Agent Failures\n• No persistent memory\n• Unreliable execution\n• No coordination\n• High failure rate]
        A --> B
        B --> C
    end

    %% ==================== LUMINASWARM SOLUTION ====================
    subgraph LuminaSwarm[" LUMINASWARM SOLUTION\nMulti-Agent AI Trading Swarm"]
        User[ User Query\n"Hey Swarm, what about ETH?"]

        OpenClaw[ OpenClaw Framework\nAgent Orchestration Layer]

        Listener[ LISTENER AGENT\n• Real-time social sentiment monitoring\n• Farcaster, X, decentralized graphs\n• Output: Sentiment Score 0.0-1.0]

        Analyst[ ANALYST AGENT\n• Technical analysis & chart patterns\n• Uniswap V3 liquidity depth check\n• Output: Technical Score + Opportunity]

        Executor[ EXECUTOR AGENT\n• Risk assessment\n• Consensus building\n• Final trade decision\n• Output: Trade Parameters]

        User --> OpenClaw
        OpenClaw <--> Listener
        OpenClaw <--> Analyst
        OpenClaw <--> Executor
    end

    %% ==================== AGENT COMMUNICATION ====================
    Listener -- " Peer-to-Peer Negotiation\nvia Gensyn AXL" --- Analyst
    Analyst -- " Peer-to-Peer Negotiation\nvia Gensyn AXL" --- Executor
    Executor -- " Peer-to-Peer Negotiation\nvia Gensyn AXL" --- Listener

    %% ==================== INFRASTRUCTURE ====================
    subgraph Infrastructure[" DECENTRALIZED INFRASTRUCTURE"]
        OG[0G Storage + Compute\n• Persistent Memory (KV + Log)\n• Sealed Inference\n• Self-evolving learning]
        Keeper[KeeperHub MCP\n• Safe Execution\n• Gas Optimization\n• Retry Logic\n• MEV Protection 99.9%]
        Uni[Uniswap V3\n• Base Sepolia Testnet\n• Real quotes & swaps]
        iNFT[ERC-7857 iNFT Brain\n• Ownership of swarm intelligence\n• Tradable & monetizable]
    end

    OpenClaw --> OG
    Listener --> OG
    Analyst --> OG
    Executor --> OG

    Executor --> Keeper
    Keeper --> Uni

    OpenClaw --> iNFT

    %% ==================== OUTPUT ====================
    subgraph Output[" OUTPUT & VALUE CREATED"]
        Trade[ Autonomous Safe Trade\nExecuted on Uniswap V3]
        Learn[ Persistent Learning\nSwarm becomes smarter with every trade]
        Own[ Tradable iNFT Brain\nOwn, sell or share the entire swarm]
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





