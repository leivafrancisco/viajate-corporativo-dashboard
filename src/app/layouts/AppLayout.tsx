import { Outlet } from "react-router-dom";
import { AppBar, Box, Toolbar, Container, Typography } from "@mui/material";
import HamburgerMenu from "@/presentation/layout/components/HamburgerMenu";
import Logo from "@/presentation/theme/components/Logo";

const AppLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "#0D47A1" }}>
        <Container maxWidth="lg"> 
          <Toolbar
            sx={{
              justifyContent: "space-between",
              py: 2,
            }}
          >
            <Logo />
            <HamburgerMenu />
          </Toolbar>
        </Container>
      </AppBar>

      <Container sx={{ flexGrow: 1, mt: 2 }}>
        <Outlet />
      </Container>

      <Box component="footer" sx={{ py: 2, textAlign: "center", mt: "auto" }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Viajate
        </Typography>
      </Box>
    </Box>
  );
};

export default AppLayout;
