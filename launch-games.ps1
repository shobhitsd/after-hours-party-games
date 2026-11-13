param([switch]$Stop, [switch]$NoBrowser)

$ErrorActionPreference = 'Stop'
$taskRuntime = Join-Path $PSScriptRoot '.local'
$taskPidFile = Join-Path $taskRuntime 'server.json'
$taskServerPath = Join-Path $PSScriptRoot 'server.js'
$taskLog = Join-Path $taskRuntime 'server.log'
$taskErrorLog = Join-Path $taskRuntime 'server-error.log'
$taskChild = $null

function Get-GameHealth([int]$GamePort) {
    try {
        $taskHealth = Invoke-RestMethod -Uri "http://127.0.0.1:$GamePort/api/health" -TimeoutSec 2
        if ($taskHealth.application -eq 'after-hours-party-games') { return $taskHealth }
    } catch { }
    return $null
}

try {
    if ($Stop) {
        if (-not (Test-Path -LiteralPath $taskPidFile)) {
            Write-Host 'No background game server was started by this launcher.'
            exit 0
        }
        $taskSaved = Get-Content -LiteralPath $taskPidFile -Raw | ConvertFrom-Json
        $taskProcess = Get-CimInstance Win32_Process -Filter "ProcessId = $([int]$taskSaved.pid)"
        if ($taskProcess) {
            $taskExpectedArgument = '"' + $taskServerPath + '"'
            if ($taskProcess.Name -ne 'node.exe' -or -not $taskProcess.CommandLine.Contains($taskExpectedArgument)) {
                throw 'The saved process no longer belongs to this game. It was left running.'
            }
            Stop-Process -Id $taskSaved.pid -ErrorAction Stop
        }
        Remove-Item -LiteralPath $taskPidFile -Force
        Write-Host 'After Hours has stopped. Saved room sessions have ended.'
        exit 0
    }

    Write-Host 'Opening After Hours...' -ForegroundColor Magenta
    $taskNodeCommand = Get-Command node.exe -ErrorAction SilentlyContinue
    $taskNodePath = if ($taskNodeCommand) { $taskNodeCommand.Source } else { $null }
    if (-not $taskNodePath) {
        foreach ($taskCandidate in @(
            (Join-Path $env:ProgramFiles 'nodejs\node.exe'),
            (Join-Path $env:LOCALAPPDATA 'Programs\nodejs\node.exe')
        )) {
            if (Test-Path -LiteralPath $taskCandidate) { $taskNodePath = $taskCandidate; break }
        }
    }
    if (-not $taskNodePath) { throw 'Node.js was not found. Install Node.js 20 or newer from https://nodejs.org and try again.' }
    $taskNodeVersion = & $taskNodePath --version
    if ([int]($taskNodeVersion.TrimStart('v').Split('.')[0]) -lt 20) { throw 'After Hours needs Node.js 20 or newer. Please update Node.js.' }

    $taskPort = $null
    $taskSavedPort = 3000
    if (Test-Path -LiteralPath $taskPidFile) {
        try { $taskSavedPort = [int]((Get-Content -LiteralPath $taskPidFile -Raw | ConvertFrom-Json).port) } catch { }
    }
    foreach ($taskCandidatePort in @($taskSavedPort, 3000) | Select-Object -Unique) {
        if (Get-GameHealth $taskCandidatePort) { $taskPort = $taskCandidatePort; break }
    }

    if (-not $taskPort) {
        # Choose an available port without stopping another application.
        for ($taskCandidatePort = 3000; $taskCandidatePort -le 3010; $taskCandidatePort++) {
            $taskListener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $taskCandidatePort)
            try { $taskListener.Start(); $taskPort = $taskCandidatePort; break } catch { } finally { $taskListener.Stop() }
        }
        if (-not $taskPort) { throw 'Ports 3000-3010 are busy. Close an unused local server and try again.' }
        New-Item -ItemType Directory -Path $taskRuntime -Force | Out-Null
        $env:PORT = [string]$taskPort
        $taskChild = Start-Process -FilePath $taskNodePath -ArgumentList ('"' + $taskServerPath + '"') -WorkingDirectory $PSScriptRoot -WindowStyle Hidden -RedirectStandardOutput $taskLog -RedirectStandardError $taskErrorLog -PassThru
        $taskReady = $false
        for ($taskAttempt = 0; $taskAttempt -lt 30; $taskAttempt++) {
            if ($taskChild.HasExited) { throw ('The game server exited. ' + (Get-Content -LiteralPath $taskErrorLog -Raw)) }
            if (Get-GameHealth $taskPort) { $taskReady = $true; break }
            Start-Sleep -Milliseconds 300
        }
        if (-not $taskReady) { throw "The server did not become ready. See $taskErrorLog" }
        @{ pid = $taskChild.Id; port = $taskPort } | ConvertTo-Json | Set-Content -LiteralPath $taskPidFile -Encoding UTF8
    }

    $taskUrl = "http://localhost:$taskPort"
    Write-Host "Ready: $taskUrl" -ForegroundColor Green
    Write-Host 'The game runs in the background. Use STOP GAMES.cmd when you are finished.'
    if (-not $NoBrowser) {
        try { Start-Process $taskUrl } catch { Write-Host "Open this address in your browser: $taskUrl" -ForegroundColor Yellow }
    }
} catch {
    if ($taskChild -and -not $taskChild.HasExited) { Stop-Process -Id $taskChild.Id -ErrorAction SilentlyContinue }
    Write-Host ''
    Write-Host ('Could not open After Hours: ' + $_.Exception.Message) -ForegroundColor Red
    if (Test-Path -LiteralPath $taskErrorLog) { Write-Host "Details: $taskErrorLog" }
    exit 1
}
