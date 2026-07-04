/**
 * Generates the site's favicon / PWA icon PNGs (and a simple multi-size .ico)
 * from scratch using only Node's built-in zlib — no image libraries needed.
 * Draws a rounded navy square with a gold "W" monogram matching the brand.
 *
 * Run with: npm run icons
 */
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const NAVY = [30, 58, 138, 255]; // #1E3A8A (brand blue)
const GOLD = [34, 197, 94, 255]; // #22C55E (brand green)

function crc32(buf) {
  let c;
  const table = crc32.table || (crc32.table = (() => {
    const t = [];
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c;
    }
    return t;
  })());
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function roundedRectMask(x, y, size, radius) {
  const cx = size / 2, cy = size / 2;
  const dx = Math.abs(x - cx) - (cx - radius);
  const dy = Math.abs(y - cy) - (cy - radius);
  if (dx <= 0 || dy <= 0) return true;
  return dx * dx + dy * dy <= radius * radius;
}

function drawDot(pixels, size, px, py, radius, color) {
  const r2 = radius * radius;
  const minX = Math.max(0, Math.floor(px - radius));
  const maxX = Math.min(size - 1, Math.ceil(px + radius));
  const minY = Math.max(0, Math.floor(py - radius));
  const maxY = Math.min(size - 1, Math.ceil(py + radius));
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const ddx = x + 0.5 - px, ddy = y + 0.5 - py;
      if (ddx * ddx + ddy * ddy <= r2) {
        const idx = (y * size + x) * 4;
        pixels[idx] = color[0];
        pixels[idx + 1] = color[1];
        pixels[idx + 2] = color[2];
        pixels[idx + 3] = color[3];
      }
    }
  }
}

function drawThickPolyline(pixels, size, points, strokeWidth, color) {
  const steps = 64;
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t;
      drawDot(pixels, size, x, y, strokeWidth / 2, color);
    }
  }
}

function generateIconBuffer(size) {
  const pixels = Buffer.alloc(size * size * 4);
  const radius = size * 0.22;

  // Background
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      if (roundedRectMask(x, y, size, radius)) {
        pixels[idx] = NAVY[0];
        pixels[idx + 1] = NAVY[1];
        pixels[idx + 2] = NAVY[2];
        pixels[idx + 3] = 255;
      } else {
        pixels[idx + 3] = 0; // transparent outside the rounded square
      }
    }
  }

  // Gold "W" monogram
  const m = size * 0.24; // horizontal margin
  const top = size * 0.28;
  const bottom = size * 0.74;
  const mid = size * 0.54;
  const points = [
    [m, top],
    [size * 0.36, bottom],
    [size * 0.5, mid],
    [size * 0.64, bottom],
    [size - m, top]
  ];
  drawThickPolyline(pixels, size, points, Math.max(2, size * 0.085), GOLD);

  return pixels;
}

function encodePNG(size) {
  const pixels = generateIconBuffer(size);
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0; // filter type: none
    pixels.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0);
  ihdrData.writeUInt32BE(size, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    signature,
    chunk("IHDR", ihdrData),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

function buildIco(sizes) {
  const images = sizes.map(encodePNG);
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * images.length;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const dirEntries = [];
  images.forEach((img, i) => {
    const size = sizes[i];
    const entry = Buffer.alloc(dirEntrySize);
    entry[0] = size >= 256 ? 0 : size;
    entry[1] = size >= 256 ? 0 : size;
    entry[2] = 0;
    entry[3] = 0;
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32BE ? null : null;
    entry.writeUInt32LE(img.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += img.length;
    dirEntries.push(entry);
  });

  return Buffer.concat([header, ...dirEntries, ...images]);
}

const outDir = path.join(__dirname, "..", "favicon");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const sizes = {
  "favicon-16x16.png": 16,
  "favicon-32x32.png": 32,
  "android-chrome-192x192.png": 192,
  "android-chrome-512x512.png": 512,
  "apple-touch-icon.png": 180,
  "mstile-150x150.png": 150
};

for (const [name, size] of Object.entries(sizes)) {
  fs.writeFileSync(path.join(outDir, name), encodePNG(size));
  console.log(`Generated favicon/${name} (${size}x${size})`);
}

fs.writeFileSync(path.join(outDir, "favicon.ico"), buildIco([16, 32]));
console.log("Generated favicon/favicon.ico");
