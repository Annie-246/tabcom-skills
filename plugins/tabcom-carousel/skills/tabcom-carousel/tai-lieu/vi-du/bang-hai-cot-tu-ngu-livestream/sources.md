# Từ ngữ nên tránh khi bán hàng livestream · ghi chú dựng

Bộ ví dụ **bảng hai cột, cả bộ không dùng ảnh chụp**. Dựng 11/09/2026 từ một bộ ảnh cũ người dùng gửi, giữ
nguyên từng chữ. Xem bộ này khi nội dung là dạng đối chiếu "tránh nói / nói thay bằng", hoặc khi cần
biến một slide cover có icon thành slide đúng khung Tabcom.

Nền: `tabcom-carousel-background-blue-2026.png`

## Bố cục

| Slide | Nội dung | Kiểu khối |
|---|---|---|
| 1 | Tiêu đề bài, dòng dẫn, 5 nhóm | `.tbl.num`, cột số 01–05 |
| 2 | Nhóm 1: so sánh, dèm pha đối thủ | `.tbl.eq`, 4 cặp |
| 3 | Nhóm 2: giá cả, khuyến mãi | `.tbl.eq`, 5 cặp |
| 4 | Nhóm 3: từ gây phản cảm | `.tbl.eq`, 3 cặp |
| 5 | Nhóm 4: từ ngữ tuyệt đối | `.tbl.eq`, 5 cặp |
| 6 | Nhóm 5: nội dung y tế | `.tbl.eq`, 5 cặp |

Bảng chính là khối trực quan, nên bộ này hợp lệ dù không có ảnh.

## Kỹ thuật đáng học lại

- **Mỗi slide một biến thể padding** (`.v1` đến `.v6`) vì số dòng bảng khác nhau. Slide 4 chỉ 3 cặp nên
  padding 44px và chữ 28px; slide 3 có 5 cặp dài nên padding 19px và chữ 25px. Cách này giữ `freeBottom`
  của cả 6 slide trong 28..53 mà không phải cắt chữ.
- **Hàng tiêu đề bảng mang màu thay cho icon:** cột trái `TRÁNH NÓI` màu `#C60001`, cột phải
  `NÓI THAY BẰNG` màu `#0246AD`. Bản gốc dùng icon ✕ đỏ và ✓ xanh lá lặp ở từng ô, vi phạm hai điều: icon
  lặp làm trang trí, và xanh lá là màu thứ tư ngoài hệ.
- **Slide cover thành slide có nội dung:** bản gốc slide 1 là icon khiên tròn lớn cộng 5 chip bo tròn.
  Bản dựng đưa 5 nhóm vào bảng đánh số, vừa giữ đủ chữ vừa thành khối trực quan mang thông tin.
- **Đánh số thì phải khớp thứ tự.** Dãy chip trong bản gốc xếp ngược với thứ tự 5 slide sau; khi chuyển
  sang bảng đánh số `01`–`05` phải sắp lại theo số nhóm, nhãn giữ nguyên chữ.

## Nhịp dọc đo được (freeBottom, px)

| Slide | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| freeBottom | 33 | 28 | 53 | 39 | 46 | 41 |

## Chỗ đã báo lại, không tự sửa

- Lặp chữ trong tiêu đề slide 4, 5, 6: "NHÓM 3: NHÓM TỪ GÂY PHẢN CẢM" đọc lên thành "nhóm ba nhóm từ…".
  Lặp có sẵn trong bản gốc nên giữ nguyên, chỉ báo người dùng.
- "Cam kết / Bảo đảm" nằm ở cột tránh nói của slide 5, trong khi cột nói thay bằng của slide 2 lại có
  "Sản phẩm cam kết nguồn gốc rõ ràng".
