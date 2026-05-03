# Lumina Swarm - Full Stack Startup Script

echo "--- CLEANING UP EXISTING SERVICES ---"
Get-Process | Where-Object { $_.ProcessName -eq "python" -or $_.ProcessName -eq "node" } | Stop-Process -Force -ErrorAction SilentlyContinue

echo "--- STARTING LUMINA SWARM INFRASTRUCTURE ---"

# 1. Start Mock AXL Node
echo "[1/4] Starting Mock AXL Node (Port 9002)..."
$axl = Start-Process .venv/Scripts/python.exe -ArgumentList "backend/services/mocks/mock_axl_node.py" -PassThru -NoNewWindow

# 2. Start Mock KeeperHub
echo "[2/4] Starting Mock KeeperHub MCP (Port 3001)..."
$keeper = Start-Process .venv/Scripts/python.exe -ArgumentList "backend/services/mocks/mock_keeper_hub.py" -PassThru -NoNewWindow

# 3. Start Backend & Agents
echo "[3/4] Starting Backend API & Swarm Agents (Port 8000)..."
$backend = Start-Process .venv/Scripts/python.exe -ArgumentList "-m backend.main" -PassThru -NoNewWindow

# 4. Start Frontend
echo "[4/4] Starting React Frontend (Port 5173)..."
Set-Location frontend
# Using cmd /c to ensure npm runs correctly on Windows
$frontend = Start-Process cmd -ArgumentList "/c npm run dev" -PassThru -NoNewWindow
Set-Location ..

echo "------------------------------------------------"
echo " ALL SYSTEMS ONLINE "
echo " - Frontend: http://localhost:5173"
echo " - Backend:  http://localhost:8000"
echo " - AXL Mesh: http://localhost:9002"
echo " - KeeperHub: http://localhost:3001"
echo "------------------------------------------------"
echo "Monitoring logs below (Press Ctrl+C to exit)..."

try {
    while ($true) { Start-Sleep -Seconds 1 }
} finally {
    echo "`nStopping services..."
    Stop-Process -Id $axl.Id -ErrorAction SilentlyContinue
    Stop-Process -Id $keeper.Id -ErrorAction SilentlyContinue
    Stop-Process -Id $backend.Id -ErrorAction SilentlyContinue
    Stop-Process -Id $frontend.Id -ErrorAction SilentlyContinue
    echo "Cleanup complete."
}
