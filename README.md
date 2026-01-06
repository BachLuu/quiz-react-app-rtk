# Quiz React App (Front-end)

Ứng dụng web quản lý & làm bài quiz. Project tập trung vào trải nghiệm UI (Material Design), kiến trúc rõ ràng theo feature, và tích hợp API an toàn với cơ chế đăng nhập/refresh token.

## Tech stack

- **Framework**: React 19 + Vite + TypeScript
- **UI**: MUI (Material UI) + Emotion
- **State/Data fetching**: Redux Toolkit + RTK Query (cache, invalidate, optimistic-friendly patterns)
- **Forms & Validation**: React Hook Form + Zod
- **Routing & bảo vệ trang**: React Router (public/protected routes), kiểm soát truy cập theo trạng thái đăng nhập

## Kỹ thuật/kiến trúc nổi bật

- **Feature-first structure**: tách theo `features/<domain>` (ví dụ: management/quiz, management/question, management/role) giúp dễ mở rộng và bảo trì.
- **RTK Query chuẩn hoá API layer**: endpoint dùng `api.injectEndpoints`, hỗ trợ cookie auth (`credentials: include`) và xử lý refresh session.
- **Server pagination**: dùng DataTable dùng chung + paging (0-based) cho các màn quản trị.
- **Form enterprise pattern**: tách riêng `useForm` cho create vs edit/view, đồng bộ dữ liệu async bằng `values` (tránh lỗi defaultValues chỉ chạy 1 lần).

---
