# Monta o ambiente completo da GaspLab numa maquina nova.
# Guia: CONTINUIDADE.md (na raiz do gasplab-site).
#
# Antes de rodar: instale Git, Node 20+ e GitHub CLI; rode "gh auth login" e deixe o git
# com acesso de escrita as contas gasparellodev e icecompany-19.
#
# Uso (dentro da pasta GaspLab ja clonada):
#   powershell -ExecutionPolicy Bypass -File scripts\montar-ambiente.ps1
#
# O script so clona o que ainda nao existe. Pode rodar de novo sem risco.

$ErrorActionPreference = 'Continue'
$Raiz = Split-Path -Parent $PSScriptRoot          # ...\projects\GaspLab
$Projetos = Split-Path -Parent $Raiz              # ...\projects
$Falhas = @()

function Clonar($url, $destino, $branch) {
  if (Test-Path (Join-Path $destino '.git')) { Write-Host "ok (ja existe)  $destino"; return }
  Write-Host "clonando        $destino"
  if ($branch) { & git clone --branch $branch $url $destino } else { & git clone $url $destino }
  if ($LASTEXITCODE -ne 0) { $script:Falhas += $url }
}

# Repositorios da icecompany-19 (de onde a Vercel publica) tem copia no gasparellodev.
# Clona do original; sem acesso a ele, clona da copia. Com os dois, liga a copia como
# remoto "gasparello" (para atualizar a copia: git push gasparello --all).
function ClonarIC($nome, $destino, $branch) {
  if (Test-Path (Join-Path $destino '.git')) { Write-Host "ok (ja existe)  $destino"; return }
  Write-Host "clonando        $destino"
  $a = @(); if ($branch) { $a = @('--branch', $branch) }
  & git clone @a "$IC/$nome.git" $destino
  if ($LASTEXITCODE -eq 0) { & git -C $destino remote add gasparello "$GD/$nome.git"; return }
  Write-Host "sem acesso ao original; usando a copia do gasparellodev"
  & git clone @a "$GD/$nome.git" $destino
  if ($LASTEXITCODE -ne 0) { $script:Falhas += $nome }
}

$GD = 'https://gasparellodev@github.com/gasparellodev'
$IC = 'https://icecompany-19@github.com/icecompany-19'

# 1. Dentro da pasta GaspLab (ignorados pelo git do site)
ClonarIC 'gasplab-hub'      (Join-Path $Raiz 'hub')                  'feat/conteudo-organico'
ClonarIC 'gasplab-previews' (Join-Path $Raiz 'previews')             $null
Clonar "$GD/loja-geral.git"       (Join-Path $Raiz 'projects\loja-geral')  'docs/bootstrap'

# 2. Frentes do hub em pastas irmas (git worktree), como na maquina original
$hub = Join-Path $Raiz 'hub'
if (Test-Path (Join-Path $hub '.git')) {
  $frentes = @{ 'hub-gaspar' = 'feat/crm-raio-x'; 'hub-emergencia' = 'fix/abordagem-sem-google'; 'hub-mares' = 'feat/mares-roteiros-v2' }
  foreach ($nome in $frentes.Keys) {
    $pasta = Join-Path $Raiz $nome
    if (Test-Path $pasta) { Write-Host "ok (ja existe)  $pasta"; continue }
    & git -C $hub worktree add $pasta $frentes[$nome]
    if ($LASTEXITCODE -ne 0) { $Falhas += "worktree $nome" }
  }
}

# 3. Base privada (clientes, Main Thread, leads, memorias do Claude)
& powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'privado.ps1') restaurar
if ($LASTEXITCODE -ne 0) { $Falhas += 'gasplab-privado' }

# 4. Projetos de clientes em pastas irmas da GaspLab
Clonar "$GD/burger-bulls.git"          (Join-Path $Projetos 'burger-bulls')        $null
Clonar "$GD/patrick-trading.git"       (Join-Path $Projetos 'patrick-trading')     $null
Clonar "$GD/zoom-lupas-video.git"      (Join-Path $Projetos 'zoom-lupas-video')    $null
Clonar "$GD/ice-crew-base.git"         (Join-Path $Projetos 'ice-crew-base')       $null
Clonar "$GD/tonab-lounge.git"          (Join-Path $Projetos 'tonab-lounge')        'feat/landing-aaaa'
Clonar "$GD/divino-capelli.git"        (Join-Path $Projetos 'divino-capelli')      $null
Clonar "$GD/istambul-halal.git"        (Join-Path $Projetos 'istambul-halal')      $null
Clonar "$GD/restaurante-genesis.git"   (Join-Path $Projetos 'restaurante-genesis') $null
Clonar "$GD/previews-restaurantes.git" (Join-Path $Projetos 'previews')            $null
ClonarIC 'mineiro-lanches'       (Join-Path $Projetos 'mineiro-lanches')     'claude/modest-galileo-t43m7f'
ClonarIC 'zoovita'               (Join-Path $Projetos 'zoovita')             $null
ClonarIC 'sr-parme'              (Join-Path $Projetos 'sr-parme')            $null

Write-Host ''
if ($Falhas.Count) {
  Write-Host 'Nao consegui baixar (confira o acesso da conta a estes repositorios):'
  $Falhas | ForEach-Object { Write-Host "  - $_" }
} else {
  Write-Host 'Tudo clonado. Falta recriar os .env e rodar npm install: veja CONTINUIDADE.md, secoes 5 e 6.'
}
