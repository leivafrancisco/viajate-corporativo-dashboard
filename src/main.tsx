import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; 
import "./index.css";
import Router from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </StrictMode>
);
