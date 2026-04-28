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
- When a trade is decided, **KeeperHub** ensures it executes safely.
- The actual swap happens on **Uniswap V3**.
- Finally, the entire swarm intelligence can be minted as an **ERC-7857 iNFT** on 0G.

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

This combination gives LuminaSwarm **real utility, reliability, and decentralization** — exactly what judges are looking for.

