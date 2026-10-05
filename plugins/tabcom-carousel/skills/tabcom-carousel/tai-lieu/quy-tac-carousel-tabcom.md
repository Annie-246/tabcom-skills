# Quy tắc carousel Tabcom

Bản hợp nhất từ guideline nội bộ của Tabcom, đã lược phần lịch sử. `SKILL.md` là bản rút gọn để dựng một bộ;
file này là nơi tra khi gặp tình huống skill chưa nói tới. Hai file khác nhau thì theo file này.

## 1. Tinh thần

Carousel Tabcom phải tạo cảm giác **thực chiến, rõ ràng, hiện đại, có tay nghề**. Không corporate, không giống
template AI, không hiệu ứng để gây choáng. Mỗi slide một ý, một điểm nhấn màu, một khối trực quan.

Không có slide cover riêng, không có slide CTA hay recap riêng. Bộ ảnh đi thẳng vào nội dung từ slide 1; CTA
nằm ở caption. Slide 1 dùng cùng nền, font, màu và khoảng trắng với các slide sau.

## 2. Kích thước, vùng cố định, nền

- Canvas **1080 × 1080**. Khung nội dung `left:80; right:80; top:154; bottom:150`, tức rộng 920, cao 776,
  đáy nội dung tại y = 930.
- Nền là ảnh vuông 1254 × 1254 đặt `center/cover`. Vùng đã in sẵn trong nền, quy về hệ 1080:

| Vùng | Toạ độ | Quy tắc |
|---|---|---|
| Thẻ giấy trắng bo góc | x, y từ 27 đến 1052 | Mọi nội dung nằm trong thẻ |
| Tab logo Tabcom trên giữa | đáy tab y ≈ 84 (nền xanh), y ≈ 64 (nền TikTok Shop); rộng x ≈ 395–730 | Nội dung bắt đầu từ y = 154, không chạm tab |
| Chân trang hotline `0786.668.222` và `tabcomgroup.vn` | y ≈ 995–1071 | Không thêm, không xóa, không đè. Chú thích cuối cách chân trang ≥ 60px |

- Hai nền, chọn theo sàn: **nền xanh** cho Shopee, bài chung nhiều sàn, kiến thức chung, bài so sánh Shopee
  với TikTok Shop; **nền TikTok Shop** chỉ cho bài nói riêng về TikTok Shop. Một bài một nền.
- Hai file trong `assets/backgrounds/mau-huong-dan/` là ảnh mẫu có in luật, để đối chiếu, không dùng làm nền.
- Không đánh số slide (`01/06`, `2/6`). Không tự vẽ lại logo.

## 3. Khung bốn lớp của một slide

1. **Tiêu đề**: gọi tên tình huống, tối đa 2 dòng.
2. **Dòng dẫn**: một câu in thường cỡ 26px dịch tiêu đề thành nghĩa. Đây là lớp hay bị bỏ quên nhất; thiếu
   nó người đọc nhảy thẳng từ tiêu đề vào bảng và thấy khó hiểu.
3. **Thân**: bullet, bảng, thẻ. Không bao giờ là đoạn văn dài.
4. **Câu chốt**: một nguyên tắc dùng được, màu đỏ, tách xuống cuối. Chỉ có khi nội dung gửi có; không bịa cho
   đủ bốn lớp. Câu chốt không phải chỗ để rào đón nguồn.

Với skill này, bốn lớp lấy nguyên văn từ nội dung người dùng gửi. Lớp nào không có thì bỏ.

## 4. Nhịp dọc

Nguyên nhân gốc của mọi slide "sát viền dưới, mảng nội dung xa nhau" là CSS cho khối chữ `flex:1` rồi căn
giữa, hoặc đẩy ảnh xuống đáy bằng `margin-top:auto`. Cấm cả hai.

| Khoảng cách | Số đo |
|---|---|
| Tiêu đề → gạch teal | 18px |
| Gạch → dòng dẫn | 26px |
| Dòng dẫn → khối thân | 26px |
| Giữa các bullet | 16px |
| Khối chữ → khối ảnh | **đúng 26px**, không hơn |
| Khối cuối → câu chốt | 22px |
| Chỗ trống dưới phần tử cuối (`freeBottom`) | **0..60px**, đo bằng script |

Dàn đúng: tiêu đề → gạch → dòng dẫn → thân (cao tự nhiên) → ảnh (cao theo ảnh) → câu chốt. Không cho
khoảng cách co giãn để lấp chỗ. Slide dư chỗ thì tăng cỡ chữ và padding khung ảnh, không tăng khoảng cách.

Đo bằng `scripts/measure-carousel.mjs`, không ước lượng bằng mắt.

## 5. Màu

| Thành phần | Màu |
|---|---|
| Tiêu đề | gradient ngang `#0246AD → #12B49C` |
| Gạch dưới tiêu đề | `#08DEB7` |
| Toàn bộ chữ nội dung, nhãn, tiêu đề card, chữ trong bảng, dòng dẫn | `#111111` (không dùng đen tuyệt đối `#000`) |
| Số hạng mục `01/02`, số liệu nhấn, viền thẻ được nhấn | `#0246AD`, một sắc cho cả bộ |
| Câu chốt, cụm cần nhấn, viền khối cảnh báo | `#C60001` |
| Viền card, bảng, khung ảnh | `#C9CEE6` 2px |
| Nền ô tiêu đề bảng, ô số | `#F2F4FB` |

Luật in ngay trên file mẫu: *"Highlight các từ quan trọng chỉ dùng màu đen, có thể dùng màu đỏ cho kết
luận hoặc nhấn ý, và dùng bold để highlight thông tin."* Bảng màu phần thân chỉ có chữ đen, chữ đen đậm, đỏ.

- Không tô navy, teal, gradient vào chữ nội dung. Gradient chỉ cho tiêu đề.
- Mỗi bộ chọn một sắc cho số nhấn (`#0246AD`), không xen kẽ xanh với đỏ giữa các slide.
- Mỗi khối chỉ có một điểm nhấn màu, đặt ở chỗ ra quyết định hoặc cảnh báo. Các ô còn lại viền trung tính.
- Không xanh lá, không green đậm, không neon, không glow, không gradient nhiều màu trên nền hay shape.

## 6. Typography

- **Tiêu đề: Inter Bold 700, 46px, line-height 1.05, IN HOA toàn bộ.** Số hạng mục đứng ngay trước tiêu đề,
  cùng dòng, cùng gradient: `01. HEADING`. Bài không đánh số thì tiêu đề không số; không bịa số để lấp bố cục.
- **Nội dung: Mulish 400**, nhấn bằng Mulish 700. Không dùng Inter cho nội dung, không dùng Mulish cho tiêu đề,
  không dùng weight Medium, SemiBold, ExtraBold.
- Cỡ chữ: dòng dẫn 26, bullet 25 (24 trong cột hẹp), câu chốt 25, chữ trong bảng 24, số lớn trong thẻ 66,
  ghi chú 22. Không quá ba cỡ chữ trong một slide. Chữ nội dung không xuống dưới 23.
- Số giữ dạng số: `95%`, không `chín mươi lăm`. Số hạng mục hai chữ số `01`, `02`, không dùng ký hiệu tick hay ✕.
- Không dấu gạch dài `—` trên ảnh. Dùng dấu phẩy, dấu chấm, dấu hai chấm hoặc xuống dòng.

### Gradient tiêu đề và lỗi cắt dấu tiếng Việt

```css
.title{font-family:Inter;font-weight:700;font-size:46px;line-height:.90;text-transform:uppercase}
.title span{display:block;width:fit-content;padding:.24em 0 .06em;
  background:linear-gradient(90deg,#0246AD,#12B49C);-webkit-background-clip:text;background-clip:text;color:transparent}
```

- **Mỗi dòng một `<span>`.** Tô gradient trên cả `h1` thì dòng 1 ăn hết dải màu, dòng 2 chỉ còn xanh dương.
- **`padding:.24em 0 .06em` cùng `line-height:.90` là bắt buộc.** `background-clip:text` chỉ tô phần chữ
  nằm trong hộp dòng; chữ hoa có dấu chồng hai tầng (`Ắ Ầ Ề Ẫ Ố Ớ Ữ`) vươn cao hơn hộp nên mất dấu trên:
  `9 PHẦN` thành `9 PHÂN`. Lỗi hay rơi vào **dòng 2**, vì dòng 2 nằm sát hộp dòng 1 nên hết headroom trước;
  dòng 1 hiện đúng rất dễ làm tưởng là ổn. Thông số cũ `.12em` với `line-height:1.05` không đủ.
- **Cách soát:** crop riêng vùng tiêu đề của PNG rồi phóng lên ≥ 1,2× kích thước gốc, soi riêng dòng 2. Ở
  mức thu nhỏ (contact sheet, mỗi slide còn ~120px) chữ mất dấu trông vẫn như còn. Công cụ đo nhịp dọc
  không bắt được lỗi này.
- Ngắt hai dòng xong phải **đọc to cả hai dòng liền nhau** để bắt lặp chữ: `…9 PHẦN` / `PHẦN 1 ĐẾN 4` đọc lên
  thành "chín phần phần một đến bốn".
- `width:fit-content` để gradient bám bề rộng chữ, không trải trên cả khung.

### Ngắt dòng tiêu đề

Tiêu đề hai dòng không phải cắt câu làm đôi ở giữa. Chỗ ngắt phải rơi đúng ranh giới cụm nghĩa.

| Lỗi | Ví dụ sai | Sửa |
|---|---|---|
| Cắt giữa danh từ và bổ ngữ | `PHỄU BẰNG ĐỒ SIÊU RẺ` / `KHÔNG LIÊN QUAN ĐÃ HẾT DÙNG` | `ĐỒ SIÊU RẺ KHÔNG LIÊN QUAN` / `KHÔNG CÒN HIỆU QUẢ` |
| Kết dòng 1 bằng hư từ `là`, `thì`, `mà`, `và` | `SẢN PHẨM PHỄU LÀ` / `MÃ KÉO KHÁCH VÀO SHOP` | `SẢN PHẨM PHỄU` / `LÀ MÃ KÉO KHÁCH VÀO SHOP` |
| Rụng động từ nối | `MỘT PHỄU CHO CẢ SHOP` / `HAI DÒNG CÒN LẠI NẰM IM` | `MỘT PHỄU CHO CẢ SHOP` / `LÀM HAI DÒNG KIA NẰM IM` |

Cách kiểm: đọc to riêng dòng 1. Không đứng được một mình thì chỗ ngắt sai. Với skill này chỉ được đổi chỗ
ngắt, không được đổi chữ; tiêu đề vốn không ngắt được cho đẹp thì báo người dùng.

### Ngôn ngữ trên slide (để nhận ra và báo lại, không tự sửa)

- Tiêu đề phải là cụm người Việt thật sự nói. `sửa chuyển đổi`, `sửa traffic`, `sửa ROAS` là ghép sai;
  chỉ số đi với `tăng / cải thiện / kéo lên / hạ`, `sửa` chỉ đi với thứ sờ được (ảnh bìa, tiêu đề sản phẩm,
  mô tả, giá, thiết lập chiến dịch).
- Nhân quả viết ở mức xác suất: `không chắc`, `chưa chắc`, `không tự động`, thay cho `không được`,
  `không bao giờ`, `là hết`.
- Thân slide là câu hoàn chỉnh, đủ chủ ngữ vị ngữ. Cấm `Hãy...`, `không những... mà còn...`,
  `không phải... mà...`. Không chuỗi nhãn nối bằng mũi tên.
- Không dòng rào đón nguồn trên slide ("đây là đúc kết của Tabcom, không phải mốc sàn công bố").
- Tên công cụ sàn phải đúng tên chính thức: **Voucher của Shop, Combo Khuyến Mãi, Mua Kèm Deal Sốc, Flash Sale
  của Shop, Shopee Video, Phân Tích Bán Hàng, Dịch Vụ Hiển Thị Sản Phẩm**. Không mượn thuật ngữ Meta Ads
  ("nuôi Pixel") hay Lazada ("Voucher tích lũy") cho Shopee.

## 7. Bullet, card, bảng

- Bullet: chấm tròn đen 9px + chữ đen. Nhãn đầu bullet in đậm rồi tới nội dung. **Không** viền, không nền,
  không bo góc. Không đường kẻ dưới từng bullet.
- Card chỉ khi khối thật sự là bảng, thẻ so sánh, thẻ bước, thẻ số liệu. Bo góc 14–20px, viền 2px trung
  tính. Card không được to và rỗng: card phải giãn thì nâng cỡ chữ bên trong lên cùng lúc.
- Hai thẻ so sánh: thẻ đúng viền `#0246AD` và số lớn màu `#0246AD`; thẻ sai nhãn `.cap` màu đỏ. Số liệu giả
  định kèm dòng `Số minh họa` ngay dưới, cỡ 22.
- Bảng: cột số 96px màu `#0246AD` nền `#F2F4FB`, hoặc hai cột nhãn / giá trị với hàng tiêu đề in hoa cỡ 22.
  Nội dung ô bọc `<span>`. Ba mức padding `.tight` 9px, mặc định 14px, `.roomy` 23px.
- Slide đã có bảng hoặc thẻ nhiều dòng thì khối đó là khối trực quan; không bolt thêm ảnh tí hon phía dưới.

## 8. Ảnh

### Nguồn, theo thứ tự

1. Ảnh người dùng chụp và gửi.
2. Kho `assets/screenshots/` của skill.
3. Ảnh giới thiệu app chính chủ trên App Store (Lookup API) hoặc Google Play. Ảnh trong bài hướng dẫn chính
   thức của sàn (Shopee Uni, TikTok Academy) cũng dùng được.
4. Không có thì hỏi người dùng. **Không** ảnh stock chung chung, **không** sơ đồ SVG thay ảnh, **không** giao diện
   giả do AI vẽ, **không** ảnh gian hàng hay sản phẩm của người bán khác (bản quyền của họ).

Bài về sàn nào phải dùng ảnh giao diện của chính sàn đó. Ảnh máy ảnh, người quay video, sạp hàng, máy tính
tiền đều bị loại dù là CC0.

### Lấy ảnh app qua App Store Lookup API

```bash
curl -s "https://itunes.apple.com/lookup?id=1591003012&country=vn"      # TikTok Shop Seller Center
curl -s "https://itunes.apple.com/search?term=shopee%20seller&country=vn&entity=software"
```

JSON có `screenshotUrls`; đổi đuôi URL thành `1000x0w.jpg` để lấy bản lớn. Ảnh 512×512 là icon, bỏ.
Google Play: `https://play.google.com/store/apps/details?id=com.shopee.vn&hl=vi&gl=VN`, lọc URL ảnh
`play-lh.googleusercontent.com`, thêm `=w1200` để lấy bản lớn. Trang seller-vn.tiktok.com và TikTok Academy
là SPA, `curl` không lấy được ảnh trong bài.

### Kỹ thuật

- Ảnh giao diện hiện trọn vùng đã crop: `img{width:100%;height:auto}`, không `object-fit:cover`.
- Chữ trong ảnh sau khi thu nhỏ ≥ 17px: `cỡ hiển thị = cỡ gốc × (rộng hiển thị ÷ rộng gốc)`. Ô nửa slide
  chỉ khoảng 455px; ảnh toàn chữ rộng 590px đặt vào đó tụt còn 10px, không đọc nổi.
- Mép crop sạch: không chữ cắt dở, icon cắt nửa, mảnh popup, viền ô input cắt ngang. Đây là lỗi phải sửa lại
  nhiều lần nhất; xem lại mép sau mỗi lần crop, và sau mỗi lần nới crop.
- Ảnh dải rất rộng (thanh điều hướng 752×78, hàng chỉ số 476×104) làm băng ngang rộng cả khung, không nhét
  vào ô vuông.
- Một ảnh gốc crop nhiều vùng cho nhiều slide để đồng tông màu.
- Khi cần khoanh vùng trong ảnh: viền đỏ mảnh `#C60001` 2px, sát vùng có nội dung, không bao khoảng trắng.
  Viền khoanh là dấu duy nhất được thêm lên ảnh.
- Không caption, không "Nguồn ảnh", không ngày chụp, không nhãn "Ví dụ" hay "Minh họa" trên ảnh. Ngoại lệ
  duy nhất: số liệu tự dựng phải ghi `Số minh họa` ngay trong khối số.

### Frame điện thoại đen

Viền `11px #101010`, bo góc 42px, notch 104×20, khung ngoài 318×602, **lòng 296×580, tỷ lệ 0,5103**. Ảnh
crop phải đúng tỷ lệ này vì frame dùng `object-fit:cover`, lệch là cụt chữ sát mép.

- Ảnh giới thiệu app đã có mockup điện thoại: cắt lấy đúng vùng màn hình bên trong, nếu không sẽ lồng hai khung.
- Card nổi trong ảnh marketing thường rộng hơn màn hình: cắt card ra, thu về bề rộng màn hình trừ mỗi bên
  22–26px, bo góc 18px, dán lại vào giữa, vùng cũ tô màu nền app. Chữ trong card giữ nguyên.
- Thêm khoảng 46px nền trắng ở đỉnh nếu dòng tiêu đề của app bị bo góc frame cắt.
- Không đặt badge số trong frame: badge che logo và thanh công cụ của app, mà tiêu đề đã có số hạng mục.
- Chữ nhãn chính của app (30–34px gốc) thu về 296px hiện 17–19px, đạt ngưỡng; chữ phụ nhỏ hơn không sao vì
  phần giải thích nằm ở cột chữ bên cạnh.

## 9. Những thứ phải tránh

- Kicker, eyebrow: dòng nhãn nhỏ in hoa trên tiêu đề. Slide đi thẳng vào tiêu đề.
- Badge, pill danh mục trang trí ("Tips", "Bóc lỗi", "Bạn có biết?").
- Chấm tròn và capsule kiểu template AI; card bo góc lặp lại không chức năng.
- Nhiều box viền nhỏ cùng lúc; headline, badge, bullet, icon tranh nhau sự chú ý; chữ li ti.
- Icon ngôi sao, cảnh báo, tick lặp lại như đồ trang trí. Chỉ dùng icon khi nó thay được một đoạn giải thích.
- Gradient neon, glow, kính bóng, shadow nặng. Màu xanh rừng thay cho teal Tabcom.
- Slide đầu quá mạnh, trông như campaign visual tách biệt.
- Text quá nhiều, quá sát mép, nhiều dòng cùng cỡ.
- Cố đưa toàn bộ kiến thức lên ảnh thay vì chuyển phần giải thích sang caption.

## 10. Checklist duyệt

- [ ] Đúng nền theo sàn, cả bộ một nền.
- [ ] Tiêu đề IN HOA, Inter Bold, gradient, mỗi dòng một span; dấu chồng còn nguyên khi phóng to.
- [ ] Đọc to dòng 1 tiêu đề: đứng được một mình, không kết bằng `là / thì / mà / và`.
- [ ] Chữ nội dung toàn `#111111`; số nhấn một sắc; đỏ chỉ ở câu chốt.
- [ ] Card bo tròn, viền 2px trung tính, không to mà rỗng. Bullet không đóng khung.
- [ ] Mỗi slide có một khối trực quan đúng ý, không hình trang trí.
- [ ] Ảnh giao diện đúng nền tảng, `contain`, mép sạch, chữ trong ảnh ≥ 17px.
- [ ] Khối ảnh cách khối chữ 26px, không `margin-top:auto`, `freeBottom` 0..60.
- [ ] Không đè tab logo (y ≤ 84) và chân trang (y ≥ 996). Chú thích cuối cách chân trang ≥ 60px.
- [ ] Không caption, không đánh số slide, không kicker, không gạch dài `—`.
- [ ] Chữ trên slide trùng nguyên văn nội dung người dùng gửi.
