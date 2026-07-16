import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, parse, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "../public");
const images = readdirSync(publicDir).filter(
  (f) => /\.(png|jpg|jpeg)$/i.test(f) && !f.startsWith("logo")
);

for (const file of images) {
  const inputPath = join(publicDir, file);
  const { name } = parse(file);
  const outputPath = join(publicDir, `${name}.webp`);

  const before = statSync(inputPath).size;
  await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
  const after = statSync(outputPath).size;

  console.log(
    `${file}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (${((1 - after / before) * 100).toFixed(0)}% saved)`
  );
}

console.log("Done!");
