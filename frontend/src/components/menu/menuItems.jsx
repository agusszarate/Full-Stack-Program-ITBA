import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import {
  Home as HomeIcon,
  AccountBalance as AccountBalanceIcon,
  CreditCard as CreditCardIcon,
  CompareArrows as CompareArrowsIcon,
  FormatListBulleted as FormatListBulletedIcon,
  Support as SupportIcon,
  LocalPhone as LocalPhoneIcon,
  AttachMoney as AttachMoneyIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const menuItems = [
  [
    { text: "Inicio", icon: <HomeIcon />, href: "/Home" },
    { text: "Cuentas", icon: <AccountBalanceIcon />, href: "/cuentas" },
    { text: "Tarjetas", icon: <CreditCardIcon />, href: "/tarjetas" },
    {
      text: "Transferencias",
      icon: <CompareArrowsIcon />,
      href: "/transferencias",
    },
    {
      text: "Movimientos",
      icon: <FormatListBulletedIcon />,
      href: "/movimientos/general",
    },
    { text: "Prestamos", icon: <AttachMoneyIcon />, href: "/prestamos" },
    {
      text: "Cambio Divisas",
      icon: <CompareArrowsIcon />,
      href: "/cambioDivisas",
    },
  ],
  [
    { text: "Ayuda", icon: <SupportIcon />, href: "/ayuda" },
    { text: "Contacto", icon: <LocalPhoneIcon />, href: "/contacto" },
    { text: "Logout", icon: <LogoutIcon />, href: "/" },
  ],
];

const MenuItems = ({ handleLogout }) => {
  return (
    <List>
      {menuItems.map((group, groupIndex) => (
        <Box key={groupIndex}>
          {group.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                href={item.href}
                onClick={() => {
                  if (item.href === "/") {
                    handleLogout();
                  }
                }}
                sx={{
                  py: 2,
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          {groupIndex < menuItems.length - 1 && <Divider />}
        </Box>
      ))}
    </List>
  );
};

export default MenuItems;
