/**
 * App Provider - Enterprise Edition
 * Best practice: Compose tất cả providers ở đây
 */

import { store } from "@/stores";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import { theme } from "../theme";
import { AuthProvider } from "./AuthProvider";

interface AppProviderProps {
  children: React.ReactNode;
}

/**
 * AppProvider - Root provider cho toàn bộ app
 * Order matters: Redux -> Auth -> SessionExpiredHandler -> Theme -> Children
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AuthProvider>
    </ReduxProvider>
  );
};
