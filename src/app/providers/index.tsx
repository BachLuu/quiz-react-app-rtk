/**
 * App Provider - Enterprise Edition
 * Best practice: Compose tất cả providers ở đây
 */

import { store } from "@/shared/stores";
import { Provider as ReduxProvider } from "react-redux";
import { CustomThemeProvider } from "./CustomThemeProvider";
import { ToastProvider } from "./ToastProvider";

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
      <CustomThemeProvider>
        <ToastProvider>{children}</ToastProvider>
      </CustomThemeProvider>
    </ReduxProvider>
  );
};
