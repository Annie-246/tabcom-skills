// Mở trình duyệt để đo và render. Dùng Chrome hoặc Edge có sẵn trên máy, không tải browser riêng.
// Muốn chỉ định file chrome.exe khác thì đặt biến môi trường TABCOM_CHROME.
import { chromium } from 'playwright-core';

export async function launch() {
  const tries = [];
  if (process.env.TABCOM_CHROME) tries.push({ executablePath: process.env.TABCOM_CHROME });
  tries.push({ channel: 'chrome' }, { channel: 'msedge' }, {});
  let lastErr;
  for (const opt of tries) {
    try { return await chromium.launch({ headless: true, ...opt }); }
    catch (e) { lastErr = e; }
  }
  throw new Error(
    'Không mở được trình duyệt. Cài Google Chrome (hoặc Microsoft Edge), ' +
    'hoặc đặt biến môi trường TABCOM_CHROME trỏ tới chrome.exe.\n' + (lastErr?.message || ''));
}
