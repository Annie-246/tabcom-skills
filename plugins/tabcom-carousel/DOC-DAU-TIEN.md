# Skill carousel Tabcom

Skill cho Claude Code để dựng bộ ảnh carousel 1080×1080 theo đúng template và quy tắc Tabcom.

Cách dùng rất ngắn: bạn gửi nội dung **đã chia sẵn từng slide**, Claude đưa nguyên văn vào khung chuẩn,
chọn nền theo sàn, chèn ảnh giao diện thật, đo nhịp dọc rồi xuất PNG. **Claude không viết lại chữ của bạn.**
Chữ không vừa khung thì nó thu ảnh, hạ cỡ chữ trong giới hạn, còn không vừa nữa thì hỏi bạn cắt câu nào.

Gói này **đã kèm sẵn nền, font, template, script và kho ảnh giao diện** Shopee, TikTok Shop, TikTok Studio,
Zalo OA. Chép vào máy, cài một lần là chạy được.

## Dùng thế nào

**Bước 1.** Chép skill vào Claude Code:

```powershell
# Windows PowerShell, chạy trong thư mục gói này
Copy-Item ".\skills\tabcom-carousel" "$env:USERPROFILE\.claude\skills\" -Recurse -Force
```

```bash
# macOS / Linux
cp -r skills/tabcom-carousel ~/.claude/skills/
```

**Bước 2.** Cài môi trường theo [cai-dat/README-cai-dat.md](cai-dat/README-cai-dat.md): Node.js, Google Chrome,
`npm install` trong thư mục `scripts` của skill, Python + Pillow. Làm một lần, khoảng 10 phút.

**Bước 3.** Mở Claude Code tại thư mục bạn muốn chứa bài, gửi nội dung theo mẫu:

```
Tạo carousel cho bài này, sàn Shopee.

Slide 1 — Scale ads không phải là bơm thêm tiền
Dòng dẫn: Scale ads không phải là có đơn rồi bơm tiền để ra nhiều đơn hơn.
- **Cách shop hay làm:** có đơn, tăng ngân sách, chờ doanh số gấp đôi.
- **Thứ tự nên đi:** chọn đúng mã hàng, chẩn đoán điểm nghẽn, tối ưu chỉ số nền, rồi mới mở rộng ngân sách.
Câu chốt: Tăng ngân sách là bước cuối, không phải bước đầu.
Ảnh: khối chỉ số hiệu quả chiến dịch trong Shopee Ads

Slide 2 — 01. Mã hàng bán được chưa chắc scale được
...
```

Có ảnh chụp màn hình riêng thì bỏ vào cùng thư mục và ghi tên file ở dòng `Ảnh:`.

Claude sẽ tạo thư mục `carousel/<tên-bài>/`, dựng `carousel.html`, crop ảnh, đo, render và tự soát từng
slide trước khi báo bạn. Kết quả là `slide-1.png` … `slide-N.png` trong thư mục đó.

**Bước 4.** Xem ảnh, góp ý bằng lời: "slide 3 đổi ảnh khác", "slide 2 chữ nhỏ quá". Claude sửa HTML và render
lại trong vài giây. Muốn quy tắc mới áp dụng cho mọi bài sau thì nói thêm *"ghi vào quy tắc của skill luôn"*.

## Trong gói có gì

```
skills/tabcom-carousel/
  SKILL.md                      Quy trình rút gọn Claude đọc mỗi lần dựng
  assets/
    backgrounds/                Nền xanh (Shopee, bài chung) và nền TikTok Shop
    fonts/                      Inter, Mulish
    templates/                  carousel-template.html: khung CSS + 5 kiểu slide mẫu
    screenshots/                Kho ảnh giao diện chính chủ, có README liệt kê từng ảnh
    logos/                      Logo Shopee, TikTok, Facebook, Zalo, Lazada
  scripts/
    new-carousel.mjs            Tạo thư mục bài, copy font + nền, sinh HTML từ template
    measure-carousel.mjs        Đo nhịp dọc từng slide, báo tràn / dư / ảnh hỏng
    render-carousel.mjs         Xuất PNG 1080x1080
    crop_utils.py               Crop, ghép, tính cỡ chữ sau thu nhỏ
  tai-lieu/
    quy-tac-carousel-tabcom.md  Quy tắc đầy đủ: nền, màu, font, nhịp dọc, ảnh, những thứ cấm
    vi-du/                      Hai bộ đã duyệt kèm HTML và PNG để đối chiếu
cai-dat/
  README-cai-dat.md             Hướng dẫn cài môi trường
```

## Nguyên tắc để nhớ

- Nội dung duyệt bằng chữ trước, gửi cho Claude sau. Sửa chữ khi còn là văn bản mất một phút; sửa khi đã
  thành sáu tấm ảnh mất mười lăm phút.
- Ảnh trên slide là **ảnh giao diện thật của đúng sàn**. Tự chụp được là tốt nhất. Không ảnh stock, không sơ đồ vẽ.
- Một slide một ý. Chữ dài quá thì tách slide hoặc đẩy xuống caption, đừng bắt Claude nhồi.
- Chân trang hotline và logo đã nằm sẵn trong nền, Claude không được đụng vào.
