/**
 * App Provider - Enterprise Edition
 * Best practice: Compose tất cả providers ở đây
 */

import { store } from "@/stores";
import { Provider as ReduxProvider } from "react-redux";
import { AuthProvider } from "./AuthProvider";
import { CustomThemeProvider } from "./CustomThemeProvider";

interface AppProviderProps {
  children: React.ReactNode;
}

/**
 * AppProvider - Root provider cho toàn bộ app
 * Chứa các provider "toàn cục", không phụ thuộc vào router.
 * Order matters: Redux -> Auth -> Theme -> Children
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </AuthProvider>
    </ReduxProvider>
  );
};
