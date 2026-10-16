/**
 * Comprueba el contraste de los tokens de color (A-3, RNF-03).
 * Uso: node scripts/check-contrast.mjs
 *
 * No necesita dependencias: lee src/app/tokens.css y aplica la fórmula de WCAG 2.2.
 * Falla con código 1 si algún par no llega al mínimo, para poder meterlo en CI.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(here, '..', 'src', 'app', 'tokens.css'), 'utf8');

/** Lee las variables --nombre: #hex; de tokens.css */
const tokens = {};
for (const match of css.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
  tokens[match[1]] = match[2];
}

function toRgb(hex) {
  let h = hex.slice(1);
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function luminance(hex) {
  const [r, g, b] = toRgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/**
 * Cada par es [descripción, token de primer plano, token de fondo, mínimo].
 * 4.5 para texto (WCAG AA), 3 para bordes e iconos.
 */
const WHITE = '#ffffff';
const pairs = [
  ['Texto principal sobre el fondo', tokens['ink'], tokens['bg'], 4.5],
  ['Texto secundario sobre el fondo', tokens['ink-soft'], tokens['bg'], 4.5],
  ['Texto principal sobre tarjeta blanca', tokens['ink'], tokens['surface'], 4.5],
  ['Texto secundario sobre tarjeta blanca', tokens['ink-soft'], tokens['surface'], 4.5],
  ['Texto blanco sobre la tarjeta azul', WHITE, tokens['navy'], 4.5],
  ['Botón principal: texto blanco sobre naranja', WHITE, tokens['primary'], 4.5],
  ['Botón principal al pasar por encima', WHITE, tokens['primary-dark'], 4.5],
  ['Botón secundario: texto azul sobre blanco', tokens['navy'], tokens['surface'], 4.5],
  ['Borde del botón secundario', tokens['navy-soft'], tokens['surface'], 3],
  ['Insignia «Hecha hoy»', tokens['success-ink'], tokens['success-bg'], 4.5],
  ['Insignia «Pendiente»', tokens['warn-ink'], tokens['warn-bg'], 4.5],
  ['Aviso de salud', tokens['ink-soft'], tokens['notice-bg'], 4.5],
  ['Barra inferior: sección activa', tokens['primary-dark'], tokens['surface'], 4.5],
  ['Barra inferior: sección inactiva', tokens['ink-soft'], tokens['surface'], 4.5],
  ['Línea de separación', tokens['line'], tokens['surface'], 1.2],
];

let failed = 0;
console.log('Contraste de los tokens (WCAG 2.2 AA · A-3, RNF-03)\n');

for (const [label, fg, bg, min] of pairs) {
  if (fg === undefined || bg === undefined) {
    console.log(`?  ${label}: falta algún token`);
    failed += 1;
    continue;
  }
  const value = ratio(fg, bg);
  const ok = value >= min;
  if (!ok) failed += 1;
  console.log(
    `${ok ? 'OK ' : 'MAL'} ${label.padEnd(44)} ${fg} / ${bg}  ${value.toFixed(2)}:1 (mínimo ${min}:1)`,
  );
}

console.log('');
if (failed > 0) {
  console.error(`${failed} par(es) no cumplen el mínimo.`);
  process.exit(1);
}
console.log('Todos los pares cumplen el mínimo.');
