# BV109 — Setup shop TikTok trước đơn đầu tiên · ghi chú dựng

Bộ ví dụ **nền TikTok Shop**, 6 slide, đã duyệt và đăng. Dùng để xem frame điện thoại đen, bảng hai cột với
ba mức padding, và hai thẻ "cách hay làm / cách nên làm". `carousel.html` giữ nguyên CSS của bộ gốc, chỉ đổi
đường dẫn asset sang `_assets/`.

Nền: `tabcom-carousel-background-tiktokshop-2026.png`

## Bố cục

| Slide | Kiểu khối | Khối trực quan |
|---|---|---|
| 1 | Hai cột: dòng dẫn + 3 bullet + câu chốt bên trái, frame điện thoại bên phải | Trang chủ TikTok Shop Seller Center |
| 2 | Dòng dẫn + bảng hai cột `.tight`, có hàng tiêu đề | Bảng 6 hạng mục |
| 3 | Dòng dẫn + hai thẻ (thẻ sai nhãn đỏ, thẻ đúng nhãn xanh) | Hai thẻ cách cài giá |
| 4 | Dòng dẫn + bảng `.roomy` + 1 bullet | Bảng dòng tiền voucher sàn với voucher shop |
| 5 | Hai cột đảo bên (`.row.rev`): frame điện thoại bên trái | Màn Đơn hàng, Arrange Shipment |
| 6 | Dòng dẫn + bảng hai cột có số hạng mục `.n` | Bảng năm việc và hậu quả |

Frame điện thoại: viền 11px `#101010`, bo góc 42px, notch 104×20, khung 318×602, lòng 296×580. Không đặt
badge số trong frame vì badge che logo TikTok và thanh công cụ, mà tiêu đề đã có số `01` và `05`.

## Ảnh

| Slide | File | Ảnh gốc trong `assets/screenshots/` | Xử lý |
|---|---|---|---|
| 1 | `ph-1-trang-chu-seller-center.png` (534×1014) | `tiktok-seller-center-trang-chu-them-san-pham-appstore-2026-09-04.png` | Cắt vùng màn hình trong mockup, x 232–766, y 525–1539 |
| 5 | `ph-5-don-hang-arrange-shipment.png` (536×1015) | `tiktok-seller-center-don-hang-arrange-shipment-appstore-2026-09-04.png` | Cắt vùng màn hình trong mockup, x 226–762, y 532–1547 |

Hai ảnh gốc là ảnh giới thiệu app TikTok Shop Seller Center trên App Store (app id 1591003012, bản
`1000x0w.jpg`). Trong ảnh gốc, card nổi (Products ở ảnh 1, chi tiết đơn ở ảnh 5) rộng hơn khung điện thoại
nên crop theo mép màn hình sẽ cắt cụt chữ. Cách xử lý: cắt card ra, thu về đúng bề rộng màn hình trừ hai
bên 26px, bo góc 18px rồi dán lại vào giữa; vùng card cũ tô nền app `#F4F4F6`. Chữ trong card giữ nguyên.

Chữ trong ảnh sau khi thu nhỏ: 534 → 296 px, tỷ lệ 0,554. Nhãn chính của app (30–34 px gốc) hiện 17–19 px,
đạt ngưỡng. Chữ phụ nhỏ hơn ngưỡng nhưng không mang thông tin của bài.

## Nhịp dọc đo được (freeBottom, px)

| Slide | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| freeBottom | -1 | 41 | 4 | 59 | -1 | 16 |

Slide 1 và 5 âm 1 px là frame 602 cao hơn chỗ trống một chút do làm tròn, `overflow:hidden` cắt phần đó,
mắt không thấy. Script đo coi là OK khi âm dưới 2 px.

## Chỗ đã sửa sau lần render đầu

1. Badge số trong frame đè lên logo TikTok và thanh công cụ → bỏ hẳn badge.
2. Ô bảng slide 4 tách chữ: ô là flex nên text và `<b>` thành hai flex item, số bị đẩy sang phải → bọc nội
   dung ô trong `<span>`.
3. Bảng slide 2 tràn 69 px, slide 6 tràn 8 px, slide 3 và 4 dư trên 100 px → thêm ba biến thể padding
   (`tight`, `mid`, `roomy`) và tăng padding cùng cỡ chữ trong hai thẻ của slide 3.
4. Crop ảnh cắt cụt chữ ở lần đầu (`oducts`, `Arrange Shi`) → xử lý lại card nổi như mô tả ở mục Ảnh.
