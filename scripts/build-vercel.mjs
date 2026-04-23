import { cpSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const distDir = join(rootDir, "dist");
const pagesDir = join(rootDir, "app", "Pages");

const copyDirectoryContents = (sourceDir, destinationDir, options = {}) => {
  const { exclude = new Set() } = options;

  mkdirSync(destinationDir, { recursive: true });

  for (const entry of readdirSync(sourceDir, { withFileTypes: true })) {
    if (exclude.has(entry.name)) continue;

    const sourcePath = join(sourceDir, entry.name);
    const destinationPath = join(destinationDir, entry.name);

    cpSync(sourcePath, destinationPath, { recursive: true });
  }
};

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

copyDirectoryContents(pagesDir, distDir, {
  exclude: new Set(["railway.json"]),
});

for (const directoryName of ["css", "js", "assets"]) {
  copyDirectoryContents(
    join(rootDir, "app", directoryName),
    join(distDir, directoryName),
  );
}

console.log("Built Vercel output in dist/");
