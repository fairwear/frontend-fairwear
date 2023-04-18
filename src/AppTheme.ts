import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { colors, createTheme } from "@mui/material";

const AppTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#222222",
          color: "#e9e9e9",
          "&:hover": {
            backgroundColor: "#222222",
            color: "#e9e9e9",
            opacity: 0.8,
          },
        },
        outlined: {
          borderColor: "#222222",
          color: "#222222",
          "&:hover": {
            borderColor: "#222222",
            color: "#222222",
          },
        },
      },
    },
  },

  palette: {
    red: {
      50: "#FEEBEE",
      100: "#FECDD2",
      200: "#EF9A9A",
      300: "#E57373",
      400: "#EF5350",
      500: "#F44336",
      600: "#E53935",
      700: "#D32F2F",
      800: "#C62828",
      900: "#B71C1C",
    },
  },

  typography: {
    fontFamily: "Inter",
    fontWeightLight: "300",
    fontWeightRegular: "400",
    fontWeightMedium: "500",
    fontWeightBold: "600",
    h1: {
      fontSize: "36px",
      lineHeight: "140%",
      fontWeight: "700",
      color: "#181D2B",
    },
    h2: {
      fontSize: "28px",
      lineHeight: "140%",
      fontWeight: "700",
      color: "#181D2B",
    },
    h3: {
      fontSize: "18px",
      lineHeight: "140%",
      fontWeight: "500",
      color: "#181D2B",
    },
    h5: {
      fontSize: "15px",
      lineHeight: "140%",
      fontWeight: "500",
      color: "#181D2B",
    },
    h6: {
      fontSize: "13px",
      lineHeight: "140%",
      fontWeight: "500",
      color: "#181D2B",
    },
    body1: {
      fontSize: "16px",
      lineHeight: "140%",
      fontWeight: "400",
      color: "#181D2B",
    },
    body2: {
      fontSize: "14px",
      lineHeight: "140%",
      fontWeight: "400",
      color: "#181D2B",
    },

    subtitle1: {
      fontSize: "12px",
      lineHeight: "140%",
      fontWeight: "400",
      color: "#181D2B",
    },
  },
});
declare module "@mui/material/styles/createPalette" {
  interface Palette {
    specific: Palette["primary"];
    neutral: Palette["primary"];
    error: Palette["primary"];
    red: Palette["grey"];
    green: Palette["grey"];
  }

  interface PaletteOptions {
    specific?: PaletteOptions["primary"];
    neutral?: PaletteOptions["primary"];
    error?: PaletteOptions["primary"];
    red?: PaletteOptions["grey"];
    green?: PaletteOptions["grey"];
  }
}

export default AppTheme;
