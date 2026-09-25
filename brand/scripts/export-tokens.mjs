#!/usr/bin/env node
/**
 * export-tokens.mjs
 *
 * Lê o bloco :root de app/globals.css (única fonte de verdade das cores do
 * site GaspLab) e gera brand/tokens/gasplab-tokens.json no formato
 * W3C Design Tokens Community Group (grupos $value/$type).
 *
 * Uso:  node brand/scripts/export-tokens.mjs
 *
 * O script resolve referências var(--outra-variavel) recursivamente até
 * chegar num valor literal (hex, rem, etc.). Não inventa cores: se uma
 * variável não existir em :root, o script falha alto (throw) em vez de
 * gerar um token errado.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const CSS_PATH = path.join(REPO_ROOT, "app", "globals.css");
const OUT_PATH = path.join(REPO_ROOT, "brand", "tokens", "gasplab-tokens.json");

function readCss() {
  return readFileSync(CSS_PATH, "utf8");
}

/** Extrai o conteúdo do primeiro bloco :root { ... } do arquivo. */
function extractRootBlock(css) {
  const match = css.match(/:root\s*\{([^}]*)\}/);
  if (!match) {
    throw new Error(`Não encontrei um bloco :root em ${CSS_PATH}`);
  }
  return match[1];
}

/** Extrai o comentário imediatamente antes de :root (contém os contrastes WCAG). */
function extractRootComment(css) {
  const match = css.match(/\/\*([\s\S]*?)\*\/\s*:root\s*\{/);
  return match ? match[1].trim() : "";
}

/** Parseia declarações `--nome: valor;` em um Map<string, string>. */
function parseDeclarations(block) {
  const map = new Map();
  const re = /--([\w-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(block))) {
    map.set(m[1], m[2].trim());
  }
  return map;
}

/** Resolve var(--x) recursivamente até um valor literal. */
function resolve(varName, map, seen = new Set()) {
  if (!map.has(varName)) {
    throw new Error(`Token --${varName} referenciado mas não definido em :root`);
  }
  if (seen.has(varName)) {
    throw new Error(`Referência circular detectada em --${varName}`);
  }
  seen.add(varName);
  const raw = map.get(varName);
  const varRefMatch = raw.match(/^var\(--([\w-]+)\)$/);
  if (varRefMatch) {
    return resolve(varRefMatch[1], map, seen);
  }
  return raw;
}

function hexToken(name, map, description) {
  const value = resolve(name, map);
  const token = { $value: value, $type: "color" };
  if (description) token.$description = description;
  return token;
}

function buildColorGroup(entries, map) {
  const group = {};
  for (const [tokenName, cssVar, description] of entries) {
    group[tokenName] = hexToken(cssVar, map, description);
  }
  return group;
}

function remToPx(remStr) {
  const n = parseFloat(remStr);
  return Number.isFinite(n) ? n * 16 : null;
}

function main() {
  const css = readCss();
  const rootBlock = extractRootBlock(css);
  const comment = extractRootComment(css);
  const map = parseDeclarations(rootBlock);

  const colorSurface = buildColorGroup(
    [
      ["background", "background", "Fundo base do site (mais escuro)."],
      ["sunken", "sunken", "Fundo afundado (headers/sidebars)."],
      ["deep", "deep", "Fundo profundo, seções de contraste."],
      ["card", "card", "Fundo de cards e painéis."],
      ["raised", "raised", "Fundo elevado (hover/destacado)."],
    ],
    map
  );

  const colorBlue = buildColorGroup(
    [
      ["primary", "primary", "Gasp Blue — linhas, ícones, bordas, destaques."],
      ["action", "action", "Fundo de botão primário (texto branco)."],
      ["action-hover", "action-hover", "Hover do botão primário."],
      ["action-foreground", "action-foreground", "Cor de texto sobre --action."],
      ["signal", "signal", "Signal Azure — Flowline, estados ativos, eyebrow."],
      ["glow", "glow", "Cor base de glows/gradientes radiais."],
    ],
    map
  );

  const colorText = buildColorGroup(
    [
      ["foreground", "foreground", "Texto principal sobre fundo escuro."],
      ["soft", "soft", "Texto secundário, levemente suavizado."],
      ["muted-foreground", "muted-foreground", "Texto mudo (parágrafos, legendas). Contraste 8.69:1 sobre --card."],
      ["subtle", "subtle", "Texto sutil (rótulos, metadados). Contraste 5.72:1 sobre --background."],
    ],
    map
  );

  const colorPaper = buildColorGroup(
    [
      ["paper", "paper", "Fundo da seção clara (Ice)."],
      ["paper-muted", "paper-muted", "Texto mudo sobre --paper. Contraste 7.14:1."],
      ["paper-accent", "paper-accent", "Azul de destaque sobre --paper."],
    ],
    map
  );

  const colorState = buildColorGroup(
    [
      ["danger", "danger", "Estado de erro/perigo."],
      ["warning", "warning", "Estado de atenção."],
    ],
    map
  );

  const radiusBase = resolve("radius", map); // ex.: "0.625rem"
  const radiusBasePx = remToPx(radiusBase);
  const radius = {
    sm: { $value: radiusBasePx ? `${radiusBasePx - 4}px` : null, $type: "dimension", $description: "calc(var(--radius) - 4px)" },
    md: { $value: radiusBasePx ? `${radiusBasePx - 2}px` : null, $type: "dimension", $description: "calc(var(--radius) - 2px)" },
    lg: { $value: `${radiusBasePx}px`, $type: "dimension", $description: "var(--radius) — valor base" },
    xl: { $value: radiusBasePx ? `${radiusBasePx + 4}px` : null, $type: "dimension", $description: "calc(var(--radius) + 4px)" },
    base: { $value: radiusBase, $type: "dimension", $description: "--radius em rem, como definido em :root" },
  };

  const typography = {
    fontFamily: {
      sans: {
        $value: "Space Grotesk",
        $type: "fontFamily",
        $description: "var(--font-space) — texto geral, títulos (.display/.title), corpo.",
        $extensions: { fallback: "Arial, sans-serif" },
      },
      mono: {
        $value: "IBM Plex Mono",
        $type: "fontFamily",
        $description: "var(--font-plex) — rótulos técnicos (.eyebrow), dados.",
        $extensions: { fallback: "ui-monospace, monospace" },
      },
    },
    fontWeight: {
      regular: { $value: 400, $type: "fontWeight" },
      medium: { $value: 500, $type: "fontWeight", $description: "Usado em .btn-secondary." },
      semibold: { $value: 600, $type: "fontWeight", $description: "Usado em .display, .title, .btn-primary." },
    },
    letterSpacing: {
      display: { $value: "-0.065em", $type: "dimension", $description: ".display" },
      title: { $value: "-0.045em", $type: "dimension", $description: ".title" },
      wordmark: { $value: "-0.04em", $type: "dimension", $description: "Wordmark do logo (tracking-[-.04em])." },
      eyebrow: { $value: "0.14em", $type: "dimension", $description: ".eyebrow (uppercase)." },
    },
  };

  const tokens = {
    $schema: "https://design-tokens.github.io/community-group/format/",
    $description:
      "Design tokens GaspLab — gerados automaticamente a partir de :root em app/globals.css. Não editar à mão; rode brand/scripts/export-tokens.mjs.",
    $extensions: {
      "com.gasplab.generatedAt": new Date().toISOString(),
      "com.gasplab.source": "app/globals.css :root",
      "com.gasplab.contrastNotes": comment || null,
    },
    color: {
      surface: colorSurface,
      blue: colorBlue,
      text: colorText,
      paper: colorPaper,
      state: colorState,
    },
    typography,
    radius,
  };

  mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(tokens, null, 2) + "\n", "utf8");
  console.log(`OK: ${path.relative(REPO_ROOT, OUT_PATH)} gerado a partir de ${path.relative(REPO_ROOT, CSS_PATH)}`);
}

main();
