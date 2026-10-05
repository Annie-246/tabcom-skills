"""Crop và ghép ảnh cho carousel Tabcom. Cần Pillow >= 10.

Dùng trong một đoạn python nhỏ, không phải CLI:

    import sys
    sys.path.insert(0, r'<đường-dẫn-skill>/scripts')
    from crop_utils import SHOTS, size, crop, stack, fit_height, text_size_on_slide, phone_box

    crop(SHOTS / 'shopee-app-home-google-play-2026-09-04.png', (0, 300, 1000, 900), 'ui-1-trang-chu.png')
"""
from pathlib import Path
from PIL import Image

# Kho ảnh giao diện chính chủ đi kèm skill (App Store, Google Play, Shopee Uni, TikTok Academy).
SHOTS = Path(__file__).resolve().parent.parent / 'assets' / 'screenshots'

# Số đo khung chuẩn
BOX_WIDTH = 920            # khung nội dung 1080 - 2*80
BOX_HEIGHT = 776           # 1080 - 154 - 150
PHONE_RATIO = 296 / 580    # lòng frame điện thoại đen, ảnh crop phải đúng tỷ lệ này


def size(path):
    """Kích thước (w, h) của ảnh, để tính tỷ lệ trước khi crop."""
    return Image.open(path).size


def crop(src, box, out):
    """Crop (left, top, right, bottom) rồi lưu. Sau khi crop phải mở ảnh xem lại mép."""
    im = Image.open(src).convert('RGB').crop(box)
    im.save(out)
    print(out, im.size)
    return im


def stack(parts, out=None, gap=12, bg='white'):
    """Ghép dọc nhiều crop về cùng bề rộng (bề rộng lớn nhất trong nhóm)."""
    parts = [Image.open(p).convert('RGB') if isinstance(p, (str, Path)) else p for p in parts]
    W = max(p.width for p in parts)
    parts = [p if p.width == W else p.resize((W, round(p.height * W / p.width)), Image.LANCZOS)
             for p in parts]
    canvas = Image.new('RGB', (W, sum(p.height for p in parts) + gap * (len(parts) - 1)), bg)
    y = 0
    for p in parts:
        canvas.paste(p, (0, y))
        y += p.height + gap
    if out:
        canvas.save(out)
        print(out, canvas.size)
    return canvas


def fit_height(w_src, h_src, shot_padding=22, box_width=BOX_WIDTH):
    """Chiều cao khung .shot khi đặt ảnh này vào, để đối chiếu với chỗ trống còn lại."""
    img_w = box_width - 2 * shot_padding - 4
    img_h = img_w * h_src / w_src
    return round(img_h + 2 * shot_padding + 4)


def text_size_on_slide(src_text_px, w_src, shot_padding=22, box_width=BOX_WIDTH):
    """Cỡ chữ trong ảnh sau khi thu nhỏ. Dưới 17 px thì đổi ảnh hoặc đổi bố cục."""
    img_w = box_width - 2 * shot_padding - 4
    return round(src_text_px * img_w / w_src, 1)


def phone_box(left, top, width):
    """Hộp crop đúng tỷ lệ lòng frame điện thoại (296x580) từ góc trên trái và bề rộng cho trước."""
    return (left, top, left + width, top + round(width / PHONE_RATIO))


def upscale(src, out, factor=2):
    """Phóng ảnh crop quá nhỏ bằng LANCZOS để chữ không vỡ khi hiện trên slide."""
    im = Image.open(src).convert('RGB')
    im = im.resize((im.width * factor, im.height * factor), Image.LANCZOS)
    im.save(out)
    print(out, im.size)
    return im
