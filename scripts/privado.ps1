# Base privada da GaspLab (gasparellodev/gasplab-privado).
#
# O repositorio do site e publico. Material de cliente, pesquisa da Main Thread, leads,
# saidas e as memorias do Claude ficam num segundo repositorio, privado, que usa ESTA MESMA
# pasta como area de trabalho (o git dele fica em .privado.git, ignorado pelo git do site).
# Assim os arquivos continuam nos caminhos de sempre e nada privado vai para o repo publico.
#
# Uso (na raiz da pasta GaspLab):
#   powershell -ExecutionPolicy Bypass -File scripts\privado.ps1 restaurar   # maquina nova: baixa tudo
#   powershell -ExecutionPolicy Bypass -File scripts\privado.ps1 status      # o que mudou
#   powershell -ExecutionPolicy Bypass -File scripts\privado.ps1 salvar "mensagem"   # commit + push
#   powershell -ExecutionPolicy Bypass -File scripts\privado.ps1 atualizar   # puxa o que veio de outra maquina

param(
  [Parameter(Position = 0)][ValidateSet('restaurar', 'status', 'salvar', 'atualizar')][string]$Acao = 'status',
  [Parameter(Position = 1)][string]$Mensagem = 'chore: sincroniza a base privada'
)

$ErrorActionPreference = 'Stop'
$Raiz = Split-Path -Parent $PSScriptRoot
$GitDir = Join-Path $Raiz '.privado.git'
$Remoto = 'https://gasparellodev@github.com/gasparellodev/gasplab-privado.git'

# Caminhos que pertencem a base privada. Ao criar uma pasta privada nova, inclua aqui
# e no .gitignore do site.
$Caminhos = @(
  'clientes',
  'knowledge/50-aquisicao',
  'knowledge/60-gasp-global',
  'knowledge/65-main-thread',
  'output',
  'outputs/Guia_Gabriel_Hub',
  'outputs/prospeccao-sp',
  'outputs/teste-barbearia',
  '.claude/agent-memory',
  '_maquina'
)

function G { & git --git-dir="$GitDir" --work-tree="$Raiz" @args; if ($LASTEXITCODE -ne 0) { throw "git falhou: $args" } }

# Pasta onde o Claude Code guarda as memorias deste projeto nesta maquina.
function Pasta-Memoria {
  $slug = ($Raiz -replace '[^a-zA-Z0-9]', '-')
  Join-Path $env:USERPROFILE ".claude\projects\$slug\memory"
}

function Configurar {
  G config core.bare false
  G config core.worktree $Raiz
  G config status.showUntrackedFiles no
  G config core.autocrlf false
}

Set-Location $Raiz

switch ($Acao) {
  'restaurar' {
    if (-not (Test-Path $GitDir)) {
      & git clone --bare $Remoto $GitDir
      if ($LASTEXITCODE -ne 0) { throw 'clone falhou: confira o acesso ao repositorio privado' }
    }
    Configurar
    G checkout -f main
    $mem = Pasta-Memoria
    $copia = Join-Path $Raiz '_maquina\claude-memory'
    if ((Test-Path $copia) -and -not (Test-Path $mem)) {
      New-Item -ItemType Directory -Force $mem | Out-Null
      Copy-Item (Join-Path $copia '*') $mem -Recurse -Force
      Write-Host "Memorias do Claude restauradas em $mem"
    } elseif (Test-Path $mem) {
      Write-Host "Ja existem memorias em $mem; nao sobrescrevi. Compare com _maquina\claude-memory se precisar."
    }
    Write-Host 'Base privada restaurada.'
  }
  'status' {
    Configurar
    G status --short --untracked-files=all -- @Caminhos
  }
  'salvar' {
    Configurar
    $mem = Pasta-Memoria
    if (Test-Path $mem) {
      $copia = Join-Path $Raiz '_maquina\claude-memory'
      New-Item -ItemType Directory -Force $copia | Out-Null
      & robocopy $mem $copia /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
    }
    $existentes = $Caminhos | Where-Object { Test-Path (Join-Path $Raiz $_) }
    G add -f -A -- @existentes ':(exclude,glob)**/node_modules/**' ':(exclude,glob)**/.env*'
    & git --git-dir="$GitDir" --work-tree="$Raiz" diff --cached --quiet
    if ($LASTEXITCODE -eq 0) { Write-Host 'Nada novo para salvar.' }
    else { G commit -q -m $Mensagem; Write-Host 'Commit feito.' }
    G push -u origin main
  }
  'atualizar' {
    Configurar
    G pull --ff-only origin main
  }
}
