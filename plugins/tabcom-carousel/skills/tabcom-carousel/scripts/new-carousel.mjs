// Tạo thư mục bài mới: copy font + nền vào _assets/, sinh carousel.html và sources.md từ template.
// Usage:
//   node new-carousel.mjs "<thư-mục-bài>" [--tiktokshop] [--title "Tên bài"]
//   node new-carousel.mjs "<thư-mục-bài>" --refresh-assets   # chỉ copy lại _assets cho bài đã có
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.resolve(here, '..', 'assets');
const BG = {
  blue: 'tabcom-carousel-background-blue-2026.png',
  tiktokshop: 'tabcom-carousel-background-tiktokshop-2026.png',
};

const args = process.argv.slice(2);
const dir = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--title');
if (!dir) {
  console.error('Usage: node new-carousel.mjs "<thư-mục-bài>" [--tiktokshop] [--title "Tên bài"] [--refresh-assets]');
  process.exit(1);
}
const refresh = args.includes('--refresh-assets');
const ti = args.indexOf('--title');
const title = ti >= 0 && args[ti + 1] ? args[ti + 1] : path.basename(path.resolve(dir));
const out = path.resolve(dir);
const html = path.join(out, 'carousel.html');

if (fs.existsSync(html) && !refresh) {
  console.error(`Đã có ${html}. Nếu chỉ muốn copy lại _assets thì thêm --refresh-assets.`);
  process.exit(1);
}
if (refresh && !fs.existsSync(html)) {
  console.error(`Không thấy ${html} để refresh. Bỏ --refresh-assets nếu muốn tạo bài mới.`);
  process.exit(1);
}

// Nền: bài mới chọn theo cờ; refresh thì đọc từ carousel.html đang có.
let bg = args.includes('--tiktokshop') ? BG.tiktokshop : BG.blue;
if (refresh) {
  const m = fs.readFileSync(html, 'utf8').match(/_assets\/(tabcom-carousel-background-[\w-]+\.png)/);
  if (m) bg = m[1];
}

const cp = (from, to) => {
  fs.mkdirSync(path.dirname(path.join(out, '_assets', to)), { recursive: true });
  fs.copyFileSync(path.join(ASSETS, from), path.join(out, '_assets', to));
};
cp('fonts/inter/Inter-Variable.ttf', 'fonts/inter/Inter-Variable.ttf');
cp('fonts/inter/OFL.txt', 'fonts/inter/OFL.txt');
cp('fonts/mulish/Mulish-Variable.ttf', 'fonts/mulish/Mulish-Variable.ttf');
cp('fonts/mulish/OFL.txt', 'fonts/mulish/OFL.txt');
cp(`backgrounds/${bg}`, bg);

if (!refresh) {
  const tpl = fs.readFileSync(path.join(ASSETS, 'templates', 'carousel-template.html'), 'utf8');
  fs.writeFileSync(html, tpl.replaceAll('{{TITLE}}', title).replaceAll('{{BACKGROUND}}', bg));
  fs.writeFileSync(path.join(out, 'sources.md'), [
    `# ${title} — ghi chú dựng`,
    '',
    `Nền: \`${bg}\``,
    'Nội dung: người dùng gửi ngày dd/mm/yyyy, dùng nguyên văn.',
    '',
    '## Bố cục',
    '',
    '| Slide | Kiểu khối | Khối trực quan |',
    '|---|---|---|',
    '| 1 | | |',
    '',
    '## Ảnh',
    '',
    '| Slide | Bản crop | Ảnh gốc | Vùng lấy (left, top, right, bottom) | Kích thước |',
    '|---|---|---|---|---|',
    '',
    '## Nhịp dọc đo được (freeBottom, px)',
    '',
    '| Slide | 1 | 2 | 3 | 4 | 5 |',
    '|---|---|---|---|---|---|',
    '| freeBottom | | | | | |',
    '',
    '## Chỗ đã sửa sau lần render đầu',
    '',
    '## Chỗ cần người dùng quyết',
    '',
  ].join('\n'));
}

console.log(`${refresh ? 'Đã copy lại _assets' : 'Đã tạo bài'}: ${out}`);
console.log(`Nền: ${bg}`);
if (!refresh) {
  console.log('Tiếp theo: điền nội dung vào carousel.html, đặt ảnh crop vào cùng thư mục, rồi chạy');
  console.log(`  node "${path.join(here, 'measure-carousel.mjs')}" "${out}"`);
  console.log(`  node "${path.join(here, 'render-carousel.mjs')}" "${out}"`);
}
