// Prancha de silhueta. Uso: node brand/avatar/scripts-silhueta.mjs <saida.png> <id1> <id2> ...
// Cada coluna: imagem em cor (320x427), busto 48 px e corpo 48/24 px em cinza, ampliados 4x sem suavização, e os tamanhos reais.
import sharp from "sharp";
const [out, ...ids] = process.argv.slice(2);
const dir = "brand/avatar/styleboard-d";
const cellW = 320, cellH = 427, gap = 16, label = 28, bg = "#0B1530";
const tiles = [];
const up = (buf, w, h, k) => sharp(buf).resize(w * k, h * k, { kernel: "nearest" }).png().toBuffer();
for (const [i, id] of ids.entries()) {
  const src = `${dir}/${id}.png`;
  const meta = await sharp(src).metadata();
  const big = await sharp(src).resize(cellW, cellH, { fit: "contain", background: bg }).png().toBuffer();
  // busto: terço superior central da imagem
  const bust = await sharp(src).extract({ left: Math.round(meta.width * 0.25), top: 0, width: Math.round(meta.width * 0.5), height: Math.round(meta.height * 0.3) }).resize(48, 48, { fit: "cover" }).grayscale().png().toBuffer();
  const body48 = await sharp(src).resize(48, 64, { fit: "contain", background: bg }).grayscale().png().toBuffer();
  const body24 = await sharp(src).resize(24, 32, { fit: "contain", background: bg }).grayscale().png().toBuffer();
  const x = gap + i * (cellW + gap);
  let y = gap + label;
  tiles.push({ input: Buffer.from(`<svg width="${cellW}" height="${label}"><text x="0" y="20" font-family="monospace" font-size="18" fill="#6CC0FF">${id.toUpperCase()}</text></svg>`), left: x, top: gap });
  tiles.push({ input: big, left: x, top: y }); y += cellH + gap;
  tiles.push({ input: await up(bust, 48, 48, 4), left: x, top: y });
  tiles.push({ input: await up(body48, 48, 64, 4), left: x + 192 + gap, top: y });
  tiles.push({ input: await up(body24, 24, 32, 4), left: x + 192 + gap + 192 + gap - 96, top: y + 128 }); y += 256 + gap;
  tiles.push({ input: bust, left: x, top: y });
  tiles.push({ input: body48, left: x + 48 + gap, top: y });
  tiles.push({ input: body24, left: x + 48 + gap + 48 + gap, top: y });
}
const W = gap + ids.length * (cellW + gap), H = gap + label + cellH + gap + 256 + gap + 64 + gap;
await sharp({ create: { width: W, height: H, channels: 3, background: "#070A12" } }).composite(tiles).png().toFile(out);
console.log("ok", out, W, H);
