#!/usr/bin/env node
// Rasterizes selected lucide-static icons into template PNGs for expo-router's
// NativeTabs, which requires a real bitmap (src prop) rather than an SVG component.
import { createRequire } from "node:module";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const lucideIconsDir = join(dirname(require.resolve("lucide-static/package.json")), "icons");

const OUT_DIR = fileURLToPath(new URL("../assets/icons/", import.meta.url));
const BASE_SIZE = 24;
const DENSITIES = [
  { suffix: "", scale: 1 },
  { suffix: "@2x", scale: 2 },
  { suffix: "@3x", scale: 3 },
];

const ICONS = [
  { lucideName: "list-music", outName: "tab-lineup" },
  { lucideName: "map", outName: "tab-map" },
  { lucideName: "house", outName: "tab-home" },
  { lucideName: "ellipsis", outName: "tab-more" },
];

mkdirSync(OUT_DIR, { recursive: true });

for (const { lucideName, outName } of ICONS) {
  const svgSource = readFileSync(join(lucideIconsDir, `${lucideName}.svg`), "utf8");
  const svg = svgSource.replace(/currentColor/g, "#000000");

  for (const { suffix, scale } of DENSITIES) {
    const outPath = join(OUT_DIR, `${outName}${suffix}.png`);
    await sharp(Buffer.from(svg))
      .resize(BASE_SIZE * scale, BASE_SIZE * scale)
      .png()
      .toFile(outPath);
  }
}

console.log(`Generated ${ICONS.length * DENSITIES.length} tab icons in assets/icons/`);
