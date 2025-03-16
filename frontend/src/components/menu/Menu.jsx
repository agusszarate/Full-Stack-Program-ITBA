"use client";

import { useContext, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { AppContext } from "@/app/layout";
import MenuItems from "./menuItems";

export default function Menu() {
  const { handleLogout } = useContext(AppContext);
  const [navOpen, setNavOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setNavOpen(!navOpen);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
      }}
    >
      <IconButton
        aria-label="menu desplegable"
        size="large"
        onClick={handleDrawerToggle}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={isMobile ? "top" : "left"}
        open={navOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: "block",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { xs: "100%", sm: 240 },
            backgroundColor: theme.palette.background.Menu,
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <MenuItems handleLogout={handleLogout} />
      </Drawer>
    </Box>
  );
}
