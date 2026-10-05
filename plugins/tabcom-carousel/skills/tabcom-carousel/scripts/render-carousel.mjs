// Render carousel.html thành slide-1.png ... slide-N.png (1080x1080) trong cùng thư mục.
// Usage: node render-carousel.mjs "<thư-mục-bài>"
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { launch } from './_browser.mjs';

const dir = process.argv[2];
if (!dir) { console.error('Usage: node render-carousel.mjs "<thư-mục-bài>"'); process.exit(1); }
const html = path.resolve(dir, 'carousel.html');
if (!fs.existsSync(html)) { console.error(`Không thấy ${html}`); process.exit(1); }
const url = pathToFileURL(html).href;

const browser = await launch();
const probe = await browser.newPage();
await probe.goto(url);
const count = await probe.evaluate(() => document.querySelectorAll('.slide').length);
await probe.close();

for (let i = 0; i < count; i++) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
  await page.goto(url);
  await page.evaluate(idx => {
    const one = document.querySelectorAll('.slide')[idx].cloneNode(true);
    document.body.replaceChildren(one);
    document.body.style.margin = '0';
  }, i);
  await page.evaluate(async () => document.fonts.ready);
  await page.waitForTimeout(300); // đợi Chrome vẽ xong ảnh nền và ảnh crop
  await page.screenshot({ path: path.join(path.resolve(dir), `slide-${i + 1}.png`) });
  await page.close();
}
await browser.close();
console.log(`Đã render ${count} slide vào ${path.resolve(dir)}`);
