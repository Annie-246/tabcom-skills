# Tabcom Skills

Bộ skill Claude Code, cài riêng từng plugin theo nhu cầu.

```
/plugin marketplace add Annie-246/tabcom-skills
```

| Plugin | Cài | Làm gì |
|---|---|---|
| `tabcom-carousel` | `/plugin install tabcom-carousel@tabcom-skills` | Dựng carousel 1080x1080 cho Shopee/TikTok Shop |
| `tabcom-video-edit` | `/plugin install tabcom-video-edit@tabcom-skills` | Edit video dọc 9:16 + tạo thumbnail |
| `social-qa-video` | `/plugin install social-qa-video@tabcom-skills` | Video hỏi-đáp từ bài Threads/Facebook |

Khởi động lại Claude Code sau khi cài.

## Yêu cầu theo plugin

- **tabcom-carousel**: Node 18+, Chrome/Edge, Python 3 + Pillow. Lần đầu tự chạy `npm install` trong `scripts/`. Xem `plugins/tabcom-carousel/DOC-DAU-TIEN.md`.
- **tabcom-video-edit**: ffmpeg, Python 3, model tách nền. Xem `plugins/tabcom-video-edit/DOC-DAU-TIEN.md` và `cai-dat/`.
- **social-qa-video**: chạy `npm install` và `python scripts/fetch_assets.py` trong `skills/social-qa-video` (tải clip nền, không lưu trong git).

## License

MIT
