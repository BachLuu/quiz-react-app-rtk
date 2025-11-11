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
  // Trigger getCurrentUser query to check if user has valid session
  const { isLoading, error } = useGetCurrentUserQuery();

  // Show loading screen while checking authentication
  // This prevents flashing of login page when user is actually authenticated
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

  // Show error page if /auth/me fails with non-401 error (e.g., 500, network error)
  if (error && "status" in error && error.status !== 401) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <div>Không thể kết nối đến server. Vui lòng thử lại sau.</div>
        <button onClick={() => window.location.reload()}>Thử lại</button>
      </Box>
    );
  }

  // Authentication check complete, render app
  // useAuth hook in other components will get the cached user data
  return <>{children}</>;
};
