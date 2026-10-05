# BV114 — Vì sao shop thời trang chạy ROAS 5.0 vẫn lỗ · ghi chú dựng

Bộ ví dụ **nền xanh**, 5 slide, đã duyệt và đăng. Dùng để xem cách dàn bảng, thẻ so sánh và bố cục hai cột.
`carousel.html` ở đây giữ nguyên CSS của bộ gốc (có thêm biến thể `.tbl.cost` cho bảng ba cột), chỉ đổi
đường dẫn asset sang `_assets/`.

Nền: `tabcom-carousel-background-blue-2026.png`

## Bố cục

| Slide | Kiểu khối | Khối trực quan |
|---|---|---|
| 1 | Dòng dẫn + 3 bullet + ảnh băng ngang | Ô "Quảng cáo Shopee" trên trang chủ Kênh Người Bán, có cột ROAS |
| 2 | Dòng dẫn + bảng đánh số 01–04 | Bảng bốn dòng |
| 3 | Dòng dẫn + bảng ba cột (khoản, %, tiền), dòng tổng và dòng biên tô nền | Bảng, kèm dòng "Số minh họa" |
| 4 | Dòng dẫn + hai thẻ so sánh + dòng "Số minh họa" | Thẻ "ROAS 5.0" và thẻ "Lỗ 25 triệu" |
| 5 | Dòng dẫn + hai cột: 3 bullet đánh số và ô ảnh 330px | Menu Cài đặt sản phẩm đang mở dòng Quản lý Bảng quy đổi kích cỡ |

## Ảnh

| Slide | Bản crop | Ảnh gốc trong `assets/screenshots/` | Vùng lấy (left, top, right, bottom) | Kích thước |
|---|---|---|---|---|
| 1 | `ui-1-quang-cao-shopee-roas.png` | `shopee-seller-center-trang-chu-quang-cao-roas-shopee-uni-2026-09-07.png` | (254, 576, 1392, 722): ô Quảng cáo Shopee, tiêu đề và hàng bốn chỉ số | 1138 × 146 |
| 5 | `ui-5-menu-bang-quy-doi-kich-co.png` | `shopee-seller-center-menu-quan-ly-bang-quy-doi-kich-co-shopee-uni-2026-09-07.png` | (1070, 170, 1394, 446): riêng bảng menu thả xuống | 324 × 276 |

Slide 1 đặt băng ngang rộng khung, tỷ lệ thu 0,78, chữ trong ảnh còn khoảng 17 px. Slide 5 đặt cột 330 px
nên ảnh hiện đúng 1:1, chữ 20 px. Ảnh là màn hình demo của tài khoản Shopee Uni (ROAS 0,00, số dư 699.947đ),
slide không nói gì về con số trong ảnh.

## Nhịp dọc đo được (freeBottom, px)

| Slide | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| freeBottom | 41 | 12 | 13 | 53 | 20 |

## Chỗ đã sửa sau lần render đầu

1. Slide 3 tràn 19 px: giảm padding dòng bảng 11 → 9 px.
2. Slide 5: lần crop đầu lệch 80 px theo trục dọc, ảnh lấy nhầm hàng nút và cắt mất hai dòng cuối menu.
   Crop lại đúng vùng bảng menu, rồi cắt thêm 6 px mép phải để bỏ mảnh ô nhập liệu nằm dưới menu.
