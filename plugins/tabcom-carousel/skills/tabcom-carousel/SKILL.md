---
name: tabcom-carousel
description: Dựng bộ ảnh carousel 1080x1080 theo template và quy tắc Tabcom từ nội dung người dùng đã chia sẵn từng slide (Slide 1, Slide 2...). Không viết lại chữ - đưa nguyên văn vào khung chuẩn, chọn nền theo sàn, chèn ảnh giao diện thật, đo nhịp dọc rồi render PNG. Dùng khi người dùng gửi nội dung kèm yêu cầu "tạo carousel", "dựng carousel", "làm slides", "làm ảnh carousel", "dựng bộ này thành slide", hoặc muốn sửa, đổi ảnh, render lại một bộ đã dựng bằng skill này.
---

# Tabcom carousel — dựng slide từ nội dung có sẵn

Skill này nhận **nội dung đã chia slide** và trả về **bộ PNG 1080×1080** đúng khung Tabcom. Mọi thứ cần
để chạy đã nằm trong thư mục skill: nền, font, template, script đo và render, kho ảnh giao diện chính chủ,
hai bộ ví dụ đã duyệt. Đường dẫn dưới đây tính từ thư mục skill.

| Thư mục | Có gì |
|---|---|
| `assets/backgrounds/` | Nền xanh (Shopee, bài chung) và nền TikTok Shop. `mau-huong-dan/` là hai ảnh mẫu có ghi luật, chỉ để đối chiếu |
| `assets/fonts/` | Inter (tiêu đề), Mulish (nội dung) |
| `assets/templates/carousel-template.html` | Khung CSS chuẩn + 5 kiểu slide mẫu |
| `assets/screenshots/` | Kho ảnh giao diện Shopee, TikTok Shop, TikTok Studio, Zalo OA, Facebook… lấy từ App Store, Google Play, Shopee Uni. Có `README.md` liệt kê từng ảnh |
| `assets/logos/` | Logo Shopee, TikTok, Facebook, Zalo, Lazada bản gốc |
| `scripts/` | `new-carousel.mjs`, `measure-carousel.mjs`, `render-carousel.mjs`, `crop_utils.py` |
| `tai-lieu/quy-tac-carousel-tabcom.md` | Quy tắc đầy đủ. Đọc khi gặp tình huống skill này chưa nói tới |
| `tai-lieu/vi-du/` | Ba bộ đã duyệt kèm HTML và PNG: `bv114-*` (nền xanh: bảng, thẻ, hai cột), `bv109-*` (nền TikTok Shop: frame điện thoại, bảng, thẻ), `bang-hai-cot-*` (bảng hai cột tránh nói / nói thay bằng, cả bộ không dùng ảnh) |

## Nguyên tắc số 1: chữ của người dùng là chữ trên slide

Người dùng đã viết và duyệt nội dung. Việc của skill là **dàn trang**, không phải biên tập.

- **Không** viết lại, rút gọn, thêm câu, đổi từ, đổi số, đổi thứ tự bullet, đổi thứ tự slide, gộp hay tách slide.
- **Không** tự thêm dòng dẫn, câu chốt, nhãn, badge, số hạng mục nếu nội dung gửi không có. Thiếu phần nào thì
  bỏ khối đó khỏi slide.
- Chỉ được làm đúng bốn việc với chữ, và ghi lại ở phần bàn giao:
  1. Ngắt tiêu đề thành tối đa 2 dòng, mỗi dòng một `<span>`. CSS tự in hoa.
  2. In đậm nhãn đầu bullet khi người dùng đã đánh dấu `**...**` hoặc viết dạng `Nhãn: nội dung`.
  3. Đổi dấu gạch dài `—` thành dấu phẩy, dấu chấm hoặc dấu hai chấm, vì gạch dài bị cấm trên ảnh.
  4. Chuẩn hóa số hạng mục về hai chữ số `01`, `02` khi người dùng viết `1.`, `2.`.
- Chữ không vừa khung: **không cắt chữ**. Xử lý theo mục "Khi tràn" ở dưới; hết cách thì báo người dùng
  và đề xuất cụ thể nên cắt câu nào, chờ họ chốt.
- Thấy nội dung phạm quy tắc ngôn ngữ (tiêu đề khó hiểu, câu `Hãy...`, `không những... mà còn...`, khẳng định
  tuyệt đối về nhân quả, thuật ngữ sàn sai): **chỉ báo lại** trong phần bàn giao, không tự sửa trên slide.
- Người dùng gửi cả slide cover hay slide CTA riêng thì vẫn dựng đúng số slide họ gửi, kèm một dòng nhắc rằng
  quy tắc Tabcom không dùng hai loại slide này.

## Đầu vào

Mẫu người dùng thường gửi:

```
Bài: <tên bài>            (tuỳ chọn)
Sàn: Shopee | TikTok Shop | chung   (tuỳ chọn)

Slide 1 — <tiêu đề>
Dòng dẫn: <một câu>
- **Nhãn:** nội dung
- **Nhãn:** nội dung
Câu chốt: <một câu>
Ảnh: <mô tả ảnh cần chụp, hoặc tên file người dùng gửi kèm>

Slide 2 — 01. <tiêu đề>
...
```

Cách đọc:

- Tiêu đề: dòng `Slide N — ...` hoặc dòng đầu của mỗi slide.
- Dòng dẫn: dòng ngay sau tiêu đề, không có gạch đầu dòng, hoặc dòng có nhãn `Dòng dẫn:`.
- Bullet: các dòng `-`, `•`, `*`. Bảng markdown thì thành khối bảng. Hai cột đối chiếu thì thành hai thẻ.
- Câu chốt: dòng có nhãn `Câu chốt:`. Không có nhãn thì **không có câu chốt**, đừng lấy câu cuối làm chốt.
- Ảnh: dòng `Ảnh:` hoặc `Khối trực quan:`. Người dùng gửi file kèm thì dùng file đó trước tiên.
- Sàn không ghi thì suy từ nội dung: bài nói riêng về TikTok Shop dùng nền TikTok Shop, còn lại nền xanh.
- Cấu trúc không rõ (không biết dòng nào là dòng dẫn, dòng nào là chốt) thì hỏi người dùng một câu ngắn,
  đừng đoán.

## Quy trình

**Bước 0, một lần trên mỗi máy.** Kiểm tra `scripts/node_modules/` đã có chưa. Chưa có thì chạy
`npm install` trong `scripts/`. Máy cần Node 18+, Google Chrome hoặc Edge, Python 3 + Pillow (chỉ khi phải
crop ảnh). Chi tiết ở `cai-dat/README-cai-dat.md` trong gói.

**Bước 1. Tạo thư mục bài.** Người dùng chỉ định thư mục thì dùng thư mục đó; không thì tạo
`carousel/<slug-khong-dau>/` trong thư mục đang mở.

```bash
node "<skill>/scripts/new-carousel.mjs" "carousel/<slug>" --title "<Tên bài>"            # nền xanh
node "<skill>/scripts/new-carousel.mjs" "carousel/<slug>" --title "<Tên bài>" --tiktokshop  # nền TikTok Shop
```

Script copy font và nền vào `_assets/` của bài, sinh `carousel.html` từ template và `sources.md` trống.
Thư mục bài vì thế tự đứng được, chuyển đi đâu cũng render được.

**Bước 2. Đưa nội dung vào HTML.** Mỗi slide một `<section class="slide">`. Chọn kiểu khối theo bảng ở
mục "Kiểu khối". Xóa các slide mẫu không dùng. Chữ lấy nguyên văn.

**Bước 3. Chuẩn bị ảnh.** Theo mục "Ảnh". Lưu bản crop ngay trong thư mục bài, tên `ui-<slide>-<mô tả>.png`
(ảnh băng ngang) hoặc `ph-<slide>-<mô tả>.png` (ảnh cho frame điện thoại).

**Bước 4. Tính trước chiều cao** bằng bảng ở mục "Tính trước chiều cao". Đừng render rồi mới sửa.

**Bước 5. Đo.**

```bash
node "<skill>/scripts/measure-carousel.mjs" "carousel/<slug>"
```

Yêu cầu: `freeBottom` của **mọi slide trong 0..60**, không ảnh hỏng, tiêu đề đúng cấu trúc span. Script
trả exit code 1 khi có lỗi. Sửa HTML rồi đo lại cho tới khi sạch.

**Bước 6. Render.**

```bash
node "<skill>/scripts/render-carousel.mjs" "carousel/<slug>"
```

**Bước 7. Soát bằng mắt.** Mở **từng** `slide-N.png` bằng Read tool, đi theo checklist ở cuối. Có lỗi thì
sửa HTML, render lại, xem lại. Không bàn giao khi còn lỗi hiển thị.

**Bước 8. Ghi `sources.md` và bàn giao.** Xem mục "Bàn giao".

## Nền

| Bài về | File trong `assets/backgrounds/` | Cờ script |
|---|---|---|
| Shopee, nhiều sàn, kiến thức chung, so sánh Shopee với TikTok Shop | `tabcom-carousel-background-blue-2026.png` | (mặc định) |
| Riêng TikTok Shop | `tabcom-carousel-background-tiktokshop-2026.png` | `--tiktokshop` |

Một bài một nền. Cả hai nền dùng **cùng một hệ màu** ở dưới. Logo Tabcom trên giữa và chân trang hotline,
website đã in sẵn trong nền: **không thêm, không xóa, không đè**. Khung nội dung `top:154px; bottom:150px`
đã chừa đúng hai vùng đó (tab logo tới y≈84, chân trang từ y≈996).

## Hệ màu và font

| Thành phần | Giá trị |
|---|---|
| Tiêu đề | Inter 700, 46px, IN HOA, gradient `#0246AD → #12B49C`, mỗi dòng một span |
| Gạch dưới tiêu đề | `#08DEB7`, 96×6 |
| Chữ nội dung, nhãn, chữ trong bảng và thẻ | Mulish 400/700, `#111111`. Không navy, không teal, không gradient |
| Số hạng mục `01`, số nhấn, viền thẻ được nhấn | `#0246AD`, một sắc duy nhất cho cả bộ |
| Câu chốt, hoặc một cụm thật sự cần nhấn | `#C60001` |
| Viền khung ảnh, bảng, thẻ | `#C9CEE6` 2px, bo góc 16–20px. Nền ô tiêu đề bảng `#F2F4FB` |
| Cỡ chữ | dòng dẫn 26, bullet 25 (24 trong cột hẹp), câu chốt 25, bảng 24, ghi chú 22. Tối thiểu 23 cho chữ nội dung |

Bảng màu của phần thân chỉ có **ba thứ**: chữ đen, chữ đen in đậm, đỏ cho câu chốt. Không có màu thứ tư.
Bullet là chữ thường có chấm tròn đen, **không** đóng khung.

## Kiểu khối

Template có sẵn 5 kiểu. Chọn theo dạng nội dung, không theo sở thích:

| Nội dung người dùng gửi | Kiểu khối | Class |
|---|---|---|
| Bullet + cần ảnh giao diện | Bullet rồi ảnh băng ngang dưới chữ, cách chữ 26px | `.items` + `.shot` |
| Bullet + ảnh dọc (màn hình điện thoại) | Hai cột: chữ trái, frame điện thoại đen phải (`.rev` để đảo) | `.row.tall` + `.txt` + `.phone` |
| Bullet + ảnh ngang nhỏ | Hai cột: chữ + ô ảnh cố định bề rộng | `.row` + `.txt` + `.pic` |
| Danh sách đánh số 01..0N, mỗi dòng một câu | Bảng đánh số, cột số 96px màu `#0246AD` | `.tbl.num` |
| Bảng hai cột nhãn / giá trị | Bảng hai cột, có hàng tiêu đề `.r.h` | `.tbl.two` |
| Hai kịch bản, hai cách làm, hai con số đối chiếu | Hai thẻ; thẻ nên làm thêm `.hi`, thẻ sai thêm `.no` | `.cmp` + `.card` |
| Một hoặc vài logo công cụ, kèm đoạn hướng dẫn hay prompt dài | Hàng logo **căn giữa**, tên công cụ dưới logo, rồi khối chữ trong khung | `.tools` + `.tool`, `.plabel`, `.prompt` |

- Bảng hoặc hai thẻ **đã là khối trực quan** của slide, không cần chèn thêm ảnh.
- Slide chỉ có bullet thì **bắt buộc** kèm một ảnh giao diện. Không slide nào chỉ có chữ.
- Trong bảng, nội dung ô phải bọc `<span>`; ô là flex, để trần thì `<b>` bị tách khỏi chữ.
- Số liệu giả định phải có dòng `Số minh họa...` ngay trong khối (`.note` hoặc `.r.note`). Đây là dòng duy nhất
  được thêm ngoài nội dung người dùng gửi, và chỉ khi họ nói số đó là giả định.
- Ba biến thể padding bảng để chỉnh nhịp: `.tight`, mặc định, `.roomy`. Ảnh băng ngang có `.pad` (padding 48)
  và `.w720` (giới hạn bề rộng ảnh).

## Tính trước chiều cao

Khung nội dung rộng **920**, cao **776**. Một dòng chữ 25px chứa khoảng **70 ký tự** (bullet có thụt đầu dòng).

| Thành phần | Chiều cao (px) |
|---|---|
| Tiêu đề 2 dòng | ~103 (1 dòng ~52) |
| Gạch + margin | 24 |
| Dòng dẫn 1 dòng | 26 + 37 |
| Khối bullet | 26 + Σ(số dòng × 35,5) + 16 mỗi khoảng giữa bullet |
| Câu chốt 1 dòng | 22 + 35 |
| Ảnh băng ngang `.shot` | 26 + ảnh_cao + 2×padding + 4, với ảnh_cao = (920 − 2×padding − 4) × h_gốc ÷ w_gốc |
| Frame điện thoại | 602, chiếm cột phải 318 rộng; cột chữ còn 558 |
| Dòng bảng | padding×2 + số dòng chữ × 32 (mặc định 14px padding → ~60/dòng một câu) |

Cộng lại, hiệu với 776 ra `freeBottom` dự kiến. Đích **0..60**.

## Khi tràn, khi dư

Tràn (freeBottom < 0), sửa theo đúng thứ tự, **không cắt chữ**:

1. Thu khối ảnh: giảm padding `.shot` (tối thiểu 14), crop ảnh dẹt hơn nhưng mép vẫn sạch, hoặc `max-width` cho ảnh.
2. Giảm khoảng cách: `.it{margin-top:16→12}`, bảng sang `.tight`, `.foot{margin-top:22→16}`.
3. Giảm cỡ chữ nội dung theo bậc 25 → 24 → 23. Không xuống dưới 23.
4. Chuyển bullet sang bố cục hai cột với ảnh dọc nếu ảnh đang là băng ngang cao.
5. Vẫn tràn: dừng lại, báo người dùng slide nào dài bao nhiêu dòng, đề xuất cắt câu nào. Chờ họ chốt.

Dư (freeBottom > 60), theo thứ tự:

1. Tăng cỡ chữ nội dung 25 → 26 → 27, dòng dẫn tới 28.
2. Tăng padding khung ảnh (`.pad`, tối đa khoảng 70) hoặc bảng sang `.roomy`.
3. Thêm một băng ảnh thứ hai nếu có ảnh thật sự phục vụ ý của slide.
4. Chỉ khi ba cách trên chưa đủ mới nới crop cho ảnh cao hơn, và soát lại mép crop.

**Cấm** `margin-top:auto` trên khối ảnh và cấm `flex:1` cho khung ảnh không lấp đầy. Hai cách này tạo băng
trống giữa slide, là lỗi bị bắt nhiều lần nhất.

## Ảnh

Khối trực quan là **ảnh chụp giao diện thật của đúng nền tảng bài đang nói**. Thứ tự nguồn:

1. **Ảnh người dùng gửi kèm.** Dùng trước tiên, crop đúng phần cần.
2. **Kho `assets/screenshots/`.** Đọc `README.md` trong đó để biết ảnh nào chụp màn gì. Một ảnh gốc crop
   được nhiều vùng cho nhiều slide.
3. **Ảnh giới thiệu app chính chủ** khi kho chưa có, qua App Store Lookup API (không cần key):

   ```bash
   curl -s "https://itunes.apple.com/lookup?id=<app_id>&country=vn"     # JSON có screenshotUrls
   # đổi đuôi URL ảnh thành 1000x0w.jpg để lấy bản lớn, rồi curl -o về
   ```

   App id đã kiểm (07/09/2026): Shopee Seller Center `6749287561`, Shopee `959841449`, TikTok Shop Seller
   Center `1591003012`, TikTok Studio `6478151677`, TikTok `1235601864`. Tìm app khác:
   `https://itunes.apple.com/search?term=<từ khóa>&country=vn&entity=software`.
   Google Play `https://play.google.com/store/apps/details?id=<pkg>&hl=vi&gl=VN` là phương án hai.
   Ảnh mới lấy thì lưu thêm vào `assets/screenshots/` theo mẫu `<nen-tang>-<noi-dung>-<nguon>-<yyyy-mm-dd>.png`
   và thêm một dòng vào `README.md` của kho.
4. **Không có ảnh phù hợp**: hỏi người dùng gửi ảnh chụp. Không dùng ảnh stock chung chung (máy ảnh, sạp
   hàng, người cầm điện thoại), không dựng sơ đồ SVG thay ảnh, không vẽ giao diện giả, không lấy ảnh gian
   hàng hay sản phẩm của người bán khác.

Kỹ thuật:

- Ảnh giao diện luôn hiện trọn: khung `.shot` dùng `height:auto`, **không bao giờ** `object-fit:cover`.
  Frame điện thoại là ngoại lệ dùng `cover`, nên ảnh cho frame phải crop **đúng tỷ lệ 296:580** (0,5103);
  `crop_utils.phone_box()` tính sẵn hộp crop.
- **Chữ trong ảnh sau khi thu nhỏ phải ≥ 17px.** `measure-carousel.mjs` in tỷ lệ thu nhỏ của từng ảnh;
  nhân với cỡ chữ gốc để kiểm. Dưới ngưỡng thì crop hẹp lại, cho ảnh băng ngang rộng cả khung, hoặc phóng
  2× bằng `crop_utils.upscale()`.
- **Mép crop phải sạch:** không dính chữ cắt dở, icon cắt nửa, mảnh popup, nút cắt ngang. Mở ảnh crop xem lại
  trước khi đặt vào slide.
- Ảnh giới thiệu app trên App Store thường đã có mockup điện thoại: cắt lấy **vùng màn hình bên trong** rồi
  mới đặt vào frame, nếu không sẽ lồng hai khung. Card nổi rộng hơn màn hình thì cắt card ra, thu về bề
  rộng màn hình trừ mỗi bên 22–26px, bo góc, dán lại vào giữa; vùng cũ tô màu nền app.
- Ảnh dạng dải rất rộng (thanh điều hướng, hàng chỉ số) thì làm băng ngang, hoặc ghép nhiều crop bằng
  `crop_utils.stack()`.
- **Không caption, không nhãn nguồn, không "Ví dụ", "Minh họa" trên ảnh.** Nguồn ghi trong `sources.md`.

Crop bằng Python:

```python
import sys; sys.path.insert(0, r'<skill>/scripts')
from crop_utils import SHOTS, size, crop, stack, fit_height, text_size_on_slide, phone_box, upscale
size(SHOTS / 'shopee-app-home-google-play-2026-09-04.png')
crop(SHOTS / 'shopee-app-home-google-play-2026-09-04.png', (0, 420, 1080, 980), 'ui-2-trang-chu-shopee.png')
```

## Checklist soát trước khi bàn giao

Mở từng PNG và tick đủ:

- [ ] Chữ trên slide trùng nguyên văn nội dung người dùng gửi, chỉ khác bốn việc được phép.
- [ ] `freeBottom` mọi slide trong 0..60, không slide nào tràn, không băng trống giữa slide.
- [ ] Crop riêng vùng tiêu đề, phóng ≥ 1,2×, soi **dòng 2**: dấu chồng (`Ắ Ầ Ề Ẫ Ố Ớ Ữ`) còn nguyên, gradient
      không ăn mất dấu. Xem ở mức thu nhỏ thì không thấy lỗi này.
- [ ] Đọc to hai dòng tiêu đề liền nhau: không lặp chữ ở chỗ nối (`…9 PHẦN` / `PHẦN 1 ĐẾN 4`).
- [ ] Đúng nền theo sàn, cả bộ một nền. Logo và chân trang in sẵn không bị đè.
- [ ] Chữ nội dung toàn `#111111`; số nhấn một sắc `#0246AD`; đỏ chỉ ở câu chốt.
- [ ] Mỗi slide có một khối trực quan đúng ý; không slide nào chỉ có chữ.
- [ ] Ảnh là giao diện đúng nền tảng, mép crop sạch, chữ trong ảnh đọc được, không bị `cover` cắt chữ.
- [ ] Không caption dưới ảnh, không đánh số slide, không kicker trên tiêu đề, không badge trang trí.
- [ ] Bullet là chữ thường có chấm đen, không đóng khung. Card bo góc, không to mà rỗng.
- [ ] Không dấu gạch dài `—` trên ảnh.

## Bàn giao

`sources.md` trong thư mục bài ghi: nền đã dùng · bảng slide → kiểu khối → khối trực quan · bảng ảnh (slide
→ bản crop → ảnh gốc → vùng lấy) · bảng `freeBottom` đo được · những chỗ đã sửa sau lần render đầu · những
chỗ cần người dùng quyết.

Báo người dùng, ngắn gọn:

1. Đường dẫn thư mục bài và danh sách `slide-N.png`.
2. Bốn việc đã làm với chữ (ngắt dòng tiêu đề nào, in đậm nhãn nào, đổi gạch dài ở đâu, đổi số hạng mục ở đâu).
3. Slide nào chữ dài phải hạ cỡ chữ; slide nào không vừa và cần họ cắt.
4. Lỗi ngôn ngữ hoặc thuật ngữ sàn nhìn thấy nhưng **không sửa**, để họ quyết.
5. Ảnh đã dùng và nguồn; slide nào chưa có ảnh phù hợp và cần họ gửi.

Người dùng chỉ định thư mục thành phẩm thì copy `slide-*.png` sang đó; file nguồn (HTML, crop, `_assets`)
giữ nguyên trong thư mục bài để sửa lại sau.
