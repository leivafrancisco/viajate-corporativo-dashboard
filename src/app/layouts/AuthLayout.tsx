import { Outlet } from "react-router-dom"; 
import { Box } from "@mui/material";
import Logo from "@/presentation/theme/components/Logo";

export default function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4, 
        backgroundColor: "#0D47A1",
      }}
    >
      <Logo /> 
      <Outlet /> 
    </Box>
  );
}
