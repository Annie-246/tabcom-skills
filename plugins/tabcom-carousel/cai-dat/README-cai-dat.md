# Cài đặt môi trường

Làm một lần trên mỗi máy, khoảng 10 phút.

## 1. Chép skill vào Claude Code

**Windows**

```powershell
Copy-Item ".\skills\tabcom-carousel" "$env:USERPROFILE\.claude\skills\" -Recurse -Force
```

**macOS / Linux**

```bash
cp -r skills/tabcom-carousel ~/.claude/skills/
```

Mở lại Claude Code, gõ `/` sẽ thấy `tabcom-carousel`. Muốn dùng riêng cho một dự án thì chép vào
`<thư-mục-dự-án>/.claude/skills/` thay vì thư mục người dùng.

## 2. Cài phần mềm

| Phần mềm | Vì sao cần | Cách cài (Windows) |
|---|---|---|
| **Node.js 18+** | Chạy script đo và render | `winget install OpenJS.NodeJS.LTS` rồi mở lại terminal |
| **Google Chrome** (hoặc Microsoft Edge) | Script render slide bằng trình duyệt có sẵn trên máy | Cài bản thường |
| **Python 3.11+ và Pillow** | Crop, ghép ảnh chụp màn hình | `winget install Python.Python.3.12`, rồi `pip install pillow` |

macOS: `brew install node python@3.12`, rồi `pip3 install pillow`. Chrome cài bản thường.

Kiểm tra: `node --version`, `python --version` (hoặc `python3`), `python -c "import PIL; print(PIL.__version__)"`
đều phải ra kết quả. Pillow phải từ bản 10 trở lên.

## 3. Cài thư viện cho script (bắt buộc)

Chạy trong thư mục `scripts` của skill **sau khi đã chép** vào Claude Code:

```powershell
cd "$env:USERPROFILE\.claude\skills\tabcom-carousel\scripts"
npm install
```

```bash
cd ~/.claude/skills/tabcom-carousel/scripts && npm install
```

Lệnh này cài `playwright-core`, thư viện điều khiển Chrome. Không tải trình duyệt riêng, dùng Chrome có
sẵn trên máy.

Máy không có Chrome lẫn Edge thì cài thêm bản Chromium của Playwright:

```bash
npm install playwright && npx playwright install chromium
```

Chrome cài ở chỗ lạ thì đặt biến môi trường trỏ tới file chạy:

```powershell
$env:TABCOM_CHROME = "D:\Apps\Chrome\chrome.exe"
```

## 4. Kiểm tra

Render thử bộ ví dụ đi kèm:

```powershell
cd "$env:USERPROFILE\.claude\skills\tabcom-carousel"
node scripts\measure-carousel.mjs "tai-lieu\vi-du\bv114-roas-hoa-von-thoi-trang"
node scripts\render-carousel.mjs  "tai-lieu\vi-du\bv114-roas-hoa-von-thoi-trang"
```

Phải in ra bảng `freeBottom` 5 slide đều `OK`, rồi dòng `Đã render 5 slide`. Mở `slide-1.png` trong thư
mục đó xem: nền xanh, logo Tabcom trên giữa, hotline dưới đáy, chữ đúng font.

## Lỗi hay gặp

| Hiện tượng | Nguyên nhân | Cách xử lý |
|---|---|---|
| `Cannot find package 'playwright-core'` | Chưa `npm install` trong `scripts` | Làm mục 3 |
| `Không mở được trình duyệt` | Không có Chrome/Edge, hoặc cài chỗ lạ | Cài Chrome, hoặc đặt `TABCOM_CHROME` |
| Slide render ra chữ font hệ thống, không phải Inter/Mulish | Thư mục bài thiếu `_assets/` | `node scripts/new-carousel.mjs "<thư-mục-bài>" --refresh-assets` |
| `ModuleNotFoundError: PIL` | Chưa cài Pillow | `pip install pillow` |
| Ảnh trên slide bị vỡ, chữ mờ | Ảnh gốc quá nhỏ bị kéo giãn | Crop lại từ ảnh lớn hơn, hoặc dùng `crop_utils.upscale()` |
