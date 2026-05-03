# LuminaSwarm: Autonomous Agent Economy

LuminaSwarm is a decentralized multi-agent system designed for automated market analysis and trade execution. It leverages P2P communication, persistent decentralized memory, and safe intent execution.

## Project Structure

```text
LuminaSwarm/
├── backend/                # Python Fast API & Agents
│   ├── main.py             # Entry point
│   ├── orchestrator.py     # Swarm lifecycle manager
│   ├── agents/             # Autonomous Agents (Listener, Analyst, Executor)
│   ├── services/           # External API integrations (CoinGecko, KeeperHub)
│   ├── core/               # Infrastructure (AXL Bus, 0G Memory)
│   └── utils/              # Shared utilities
├── frontend/               # React (Vite) User Interface
├── contracts/              # Solidity Smart Contracts
└── docs/                   # Documentation
```

## Getting Started


### Backend
1. Install dependencies: `pip install -r backend/requirements.txt`
2. Run the swarm: `python -m backend.main`

### Frontend
1. Navigate to frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`

## Core Technologies
- **Gensyn AXL**: Peer-to-peer agent communication.
- **0G Storage**: Persistent decentralized memory.
- **KeeperHub MCP**: Standardized safe execution layer.
- **CoinGecko**: Real-time market intelligence.

```mermaid
flowchart TD
    %% ==================== PROBLEM ====================
    subgraph Problem["THE PROBLEM"]
        A["Fast-Moving Crypto Markets<br/>24/7 News + Price Action"]
        B["Human Limitations<br/>Can't monitor everything simultaneously"]
        C["Single AI Agent Failures<br/>- No persistent memory<br/>- Unreliable execution<br/>- No coordination<br/>- High failure rate"]
        A --> B
        B --> C
    end

    %% ==================== LUMINASWARM SOLUTION ====================
    subgraph LuminaSwarm["LUMINASWARM SOLUTION<br/>Multi-Agent AI Trading Swarm"]
        User["User Query<br/>Hey Swarm, what about ETH?"]

        OpenClaw["OpenClaw Framework<br/>Agent Orchestration Layer"]

        Listener["LISTENER AGENT<br/>- Real-time sentiment monitoring<br/>- Farcaster, X, graphs<br/>- Output: Sentiment Score"]

        Analyst["ANALYST AGENT<br/>- Technical analysis<br/>- Uniswap V3 liquidity check<br/>- Output: Technical Score"]

        Executor["EXECUTOR AGENT<br/>- Risk assessment<br/>- Consensus building<br/>- Final decision"]

        User --> OpenClaw
        OpenClaw <--> Listener
        OpenClaw <--> Analyst
        OpenClaw <--> Executor
    end

    %% ==================== AGENT COMMUNICATION ====================
    Listener --- Analyst
    Analyst --- Executor
    Executor --- Listener

    %% ==================== INFRASTRUCTURE ====================
    subgraph Infrastructure["DECENTRALIZED INFRASTRUCTURE"]
        OG["0G Storage + Compute<br/>- Persistent Memory<br/>- Learning"]
        Keeper["KeeperHub MCP<br/>- Safe Execution<br/>- Gas Optimization<br/>- Retry Logic"]
        Uni["Uniswap V3<br/>- Base Sepolia Testnet"]
        iNFT["ERC-7857 iNFT Brain<br/>- Tradable Intelligence"]
    end

    OpenClaw --> OG
    Listener --> OG
    Analyst --> OG
    Executor --> OG

    Executor --> Keeper
    Keeper --> Uni

    OpenClaw --> iNFT

    %% ==================== OUTPUT ====================
    subgraph Output["OUTPUT & VALUE CREATED"]
        Trade["Autonomous Safe Trade<br/>Executed on Uniswap"]
        Learn["Persistent Learning<br/>Swarm improves over time"]
        Own["Tradable iNFT Brain<br/>Own and share intelligence"]
    end

    Uni --> Trade
    OG --> Learn
    iNFT --> Own

    %% ==================== BLACK THEME STYLING ====================
    classDef problem fill:#000000,stroke:#ffffff,stroke-width:2px,color:#ffffff
    classDef solution fill:#000000,stroke:#ffffff,stroke-width:3px,color:#ffffff
    classDef agent fill:#000000,stroke:#ffffff,stroke-width:2px,color:#ffffff
    classDef infra fill:#000000,stroke:#ffffff,stroke-width:2px,color:#ffffff
    classDef output fill:#000000,stroke:#ffffff,stroke-width:2px,color:#ffffff

    class A,B,C problem
    class User,OpenClaw solution
    class Listener,Analyst,Executor agent
    class OG,Keeper,Uni,iNFT infra
    class Trade,Learn,Own output
```
