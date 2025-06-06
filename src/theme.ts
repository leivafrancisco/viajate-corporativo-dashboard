import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#f8f9fa",
      paper: "#fff"
    },
    primary: {
      main: "#2d6cdf"
    },
    secondary: {
      main: "#f5f6fa"
    }
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 12px 0 rgba(60,72,100,0.08)",
          borderRadius: 16,
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: "#fff"
        }
      }
    }
  }
});

export default theme;
