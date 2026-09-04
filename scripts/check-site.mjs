import fs from "node:fs";
import path from "node:path";

const root = path.resolve("public");
const html = [];
function walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) walk(file);
    else if (file.endsWith(".html")) html.push(file);
  }
}
walk(root);
const missing = [];
for (const file of html) {
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1].split(/[?#]/)[0];
    if (!url || url.startsWith("#") || /^[a-z]+:/i.test(url)) continue;
    const target = url.startsWith("/")
      ? path.join(root, url)
      : path.resolve(path.dirname(file), url);
    const exists = fs.existsSync(target) || fs.existsSync(path.join(target, "index.html"));
    if (!exists) missing.push(`${path.relative(root, file)} -> ${url}`);
  }
}
if (missing.length) { console.error(missing.join("\n")); process.exit(1); }
console.log(`Checked ${html.length} HTML files: all local links resolve.`);
