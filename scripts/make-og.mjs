/**
 * Generates public/og.png — the 1200x630 card that LinkedIn, X, Slack and
 * iMessage render when your site is shared.
 *
 * Run with:  node scripts/make-og.mjs
 * Re-run whenever your name, tagline, or photo changes. The output is
 * committed, so CI never needs fonts installed.
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import { load } from 'js-yaml';

const site = load(await fs.readFile('content/site.yaml', 'utf8'));

const W = 1200, H = 630;
const PHOTO = 300;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Wrap the tagline so long roles don't run off the canvas.
const words = site.tagline.split(' ');
const lines = [];
let cur = '';
for (const w of words) {
  if ((cur + ' ' + w).trim().length > 30) { lines.push(cur.trim()); cur = w; }
  else cur += ' ' + w;
}
if (cur.trim()) lines.push(cur.trim());

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <rect x="0" y="0" width="${W}" height="10" fill="#a8432a"/>
  <text x="90" y="270" font-family="Georgia, serif" font-size="82" font-weight="500"
        fill="#211f1b" letter-spacing="-2">${esc(site.name)}</text>
  ${lines.map((l, i) =>
    `<text x="94" y="${330 + i * 46}" font-family="Georgia, serif" font-size="34"
           fill="#6b6457">${esc(l)}</text>`).join('\n  ')}
  <text x="94" y="${360 + lines.length * 46}" font-family="monospace" font-size="24"
        fill="#a8432a" letter-spacing="2">${esc(site.url.replace(/^https?:\/\//, '').toUpperCase())}</text>
</svg>`;

const mask = Buffer.from(
  `<svg width="${PHOTO}" height="${PHOTO}"><circle cx="${PHOTO / 2}" cy="${PHOTO / 2}" r="${PHOTO / 2}" fill="#fff"/></svg>`
);

const photo = await sharp(`public${site.photo}`)
  .resize(PHOTO, PHOTO, { fit: 'cover', position: 'top' })
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: photo, left: W - PHOTO - 90, top: (H - PHOTO) / 2 + 5 }])
  .png()
  .toFile('public/og.png');

console.log(`✓ public/og.png  (${W}x${H})`);
