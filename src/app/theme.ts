/**
 * MUI Theme Configuration
 * Best practice: Customize MUI theme theo design system
 */

import { createTheme } from "@mui/material/styles";

/**
 * Custom theme
 * Có thể customize colors, typography, spacing, etc.
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Không uppercase buttons
        },
      },
    },
  },
});
