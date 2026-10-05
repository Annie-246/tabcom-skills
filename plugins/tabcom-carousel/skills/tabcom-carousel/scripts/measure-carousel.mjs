// Đo nhịp dọc từng slide trước khi render. Yêu cầu: freeBottom của mọi slide trong khoảng 0..60 px.
// Usage: node measure-carousel.mjs "<thư-mục-bài>"
// Exit code 1 khi có slide tràn, ảnh hỏng hoặc tiêu đề sai cấu trúc.
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { launch } from './_browser.mjs';

const dir = process.argv[2];
if (!dir) { console.error('Usage: node measure-carousel.mjs "<thư-mục-bài>"'); process.exit(1); }
const html = path.resolve(dir, 'carousel.html');
if (!fs.existsSync(html)) { console.error(`Không thấy ${html}`); process.exit(1); }

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 } });
await page.goto(pathToFileURL(html).href);
await page.evaluate(async () => document.fonts.ready);
await page.waitForTimeout(300);

const slides = await page.evaluate(() => [...document.querySelectorAll('.slide')].map((sl, i) => {
  const c = sl.querySelector('.content');
  const cb = c.getBoundingClientRect();
  let maxBottom = cb.top;
  c.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.height > 0 && r.width > 0) maxBottom = Math.max(maxBottom, r.bottom);
  });
  const title = sl.querySelector('.title');
  const spans = title ? title.querySelectorAll('span').length : 0;
  // Một span cao hơn 1,5 dòng nghĩa là dòng tiêu đề quá dài, bị gãy làm hai ngoài ý muốn.
  const wrapped = title ? [...title.querySelectorAll('span')].filter(sp => {
    const cs = getComputedStyle(sp);
    const one = parseFloat(cs.lineHeight) + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    return sp.getBoundingClientRect().height > one * 1.5;
  }).map(sp => sp.textContent.trim()) : [];
  const imgs = [...sl.querySelectorAll('img')].map(im => {
    const r = im.getBoundingClientRect();
    return {
      src: im.getAttribute('src'),
      shown: Math.round(r.width),
      natural: im.naturalWidth,
      scale: im.naturalWidth ? +(r.width / im.naturalWidth).toFixed(3) : 0,
      broken: !im.complete || im.naturalWidth === 0,
    };
  });
  const visual = !!sl.querySelector('img, .tbl, .cmp, .cards, .card, .box, .fml, .tools, .phone, svg, table');
  return {
    i: i + 1,
    freeBottom: Math.round(cb.bottom - maxBottom),
    hasTitle: !!title,
    titleSpans: spans,
    wrapped,
    visual,
    imgs,
  };
}));
await browser.close();

let bad = false;
console.log(`Đo ${slides.length} slide trong ${path.resolve(dir)}\n`);
console.log('Slide  freeBottom  Kết luận');
for (const s of slides) {
  let verdict = 'OK';
  // Frame điện thoại 602 px cao hơn chỗ trống khoảng 1 px do làm tròn; overflow:hidden cắt phần đó, mắt không thấy.
  if (s.freeBottom < -2) { verdict = `TRÀN ${-s.freeBottom} px`; bad = true; }
  else if (s.freeBottom < 0) verdict = 'OK (sát đáy, dưới 2 px)';
  else if (s.freeBottom > 60) verdict = `DƯ ${s.freeBottom - 60} px, lấp bằng padding ảnh hoặc cỡ chữ`;
  console.log(`${String(s.i).padStart(5)}  ${String(s.freeBottom).padStart(10)}  ${verdict}`);
  if (!s.hasTitle) { console.log('       LỖI: thiếu .title'); bad = true; }
  else if (s.titleSpans === 0) { console.log('       LỖI: .title phải có mỗi dòng một <span>, không thì gradient ăn mất dấu'); bad = true; }
  else if (s.titleSpans > 2) { console.log(`       LỖI: tiêu đề ${s.titleSpans} dòng, tối đa 2`); bad = true; }
  for (const t of s.wrapped) { console.log(`       LỖI: dòng tiêu đề quá dài, tự gãy làm hai: "${t}". Ngắt lại chỗ khác.`); bad = true; }
  if (!s.visual) console.log('       CẢNH BÁO: slide không có khối trực quan (ảnh, bảng, thẻ, frame)');
  for (const im of s.imgs) {
    if (im.broken) { console.log(`       LỖI: ảnh không tải được: ${im.src}`); bad = true; }
    else console.log(`       ảnh ${im.src}: gốc ${im.natural}px, hiện ${im.shown}px, tỷ lệ ${im.scale}. Chữ gốc N px sẽ hiện N x ${im.scale} px, phải >= 17`);
  }
}
console.log('\nĐích: freeBottom mọi slide trong 0..60. Tràn thì thu ảnh, giảm gap, giảm cỡ chữ (tối thiểu 23 px); không cắt chữ của người dùng.');
process.exit(bad ? 1 : 0);
