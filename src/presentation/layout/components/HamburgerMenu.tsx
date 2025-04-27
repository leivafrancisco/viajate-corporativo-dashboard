// src/components/HamburgerMenu.tsx
import { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const HamburgerMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { label: "Mi perfil", path: "/perfil" },
    { label: "Mis comunidades", path: "/comunidades" },
    { label: "Cerrar sesión", action: () => {
        // Acción real de logout
        console.log("Cerrar sesión");
        navigate("/login"); // Redirige al login
      } 
    },
  ];

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        sx={{ ml: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (item.path) {
                      navigate(item.path);
                    } else if (item.action) {
                      item.action();
                    }
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
