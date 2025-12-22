/**
 * App Provider - Enterprise Edition
 * Best practice: Compose tất cả providers ở đây
 */

import { store } from "@/shared/stores";
import { Provider as ReduxProvider } from "react-redux";
import { CustomThemeProvider } from "./CustomThemeProvider";
import { ToastProvider } from "./ToastProvider";
import Snowfall from "react-snowfall";

interface AppProviderProps {
  children: React.ReactNode;
}

/**
 * AppProvider - Root provider cho toàn bộ app
 * Chứa các provider "toàn cục", không phụ thuộc vào router.
 * Order matters: Redux -> Theme -> Toast -> Children
 * Note: AuthProvider đã được chuyển vào trong App.tsx để support useNavigate
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ReduxProvider store={store}>
      <Snowfall
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 10000,
        }}
      />
      <CustomThemeProvider>
        <ToastProvider>{children}</ToastProvider>
      </CustomThemeProvider>
    </ReduxProvider>
  );
};
