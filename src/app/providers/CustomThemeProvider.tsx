import {
    CssBaseline,
    ThemeProvider as MUIThemeProvider,
    createTheme,
} from "@mui/material";

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Custom Theme Provider
 * Bọc các component con trong ThemeProvider của MUI và áp dụng CssBaseline.
 */
export const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  return (
    <MUIThemeProvider theme={theme}>
      {/* CssBaseline reset CSS và áp dụng các style nền tảng từ theme */}
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
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
