/**
 * AuthProvider Component - Enterprise Edition
 *
 * Responsibilities:
 * 1. Kích hoạt useGetCurrentUserQuery khi app khởi động
 * 2. Kiểm tra HTTP-only cookie và restore user session
 * 3. Hiển thị loading screen trong khi check auth
 *
 * Note: KHÔNG cần dispatch action nữa vì RTK Query tự quản lý cache
 */

import { useGetCurrentUserQuery } from "@/features/auth/api";
import { Box, CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider - Initialize auth state
 *
 * Flow:
 * 1. App start -> useGetCurrentUserQuery() tự động gọi GET /auth/me
 * 2. Nếu có HTTP-only cookie -> Backend trả user -> isAuthenticated = true
 * 3. Nếu không có cookie -> Backend trả 401 -> user = null -> isAuthenticated = false
 * 4. baseQuery xử lý 401 silently (không hiển thị lỗi)
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isLoading, error } = useGetCurrentUserQuery();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Loading State
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // 2. Error Handling (Tránh vòng lặp vô tận)
  // Chỉ redirect nếu lỗi KHÁC 401/403 VÀ không phải đang ở trang login
  if (error && "status" in error) {
    const isAuthError = error.status === 401 || error.status === 403;
    const isLoginPage = location.pathname === "/login";

    // Nếu lỗi hệ thống (500, network...) và chưa ở trang login thì mới đá về login
    if (!isAuthError && !isLoginPage) {
      navigate("/login");
      return null; // Tránh render children khi đang redirect
    }
  }

  // 3. Render App
  return <>{children}</>;
};
