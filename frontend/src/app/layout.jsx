"use client";

import { useState, useEffect, useMemo, createContext } from "react";
import localFont from "next/font/local";
import "./globals.css";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Container,
  IconButton,
  CssBaseline,
} from "@mui/material";
import { useRouter } from "next/navigation";
import MenuComponent from "@/components/menu/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Footer from "@/components/footer";
import data from "@/info.json";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const AppContext = createContext(null);

export default function RootLayout({ children }) {
  const router = useRouter();

  const [mode, setMode] = useState("dark");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState("");

  useEffect(() => {
    const authStatus = document.cookie.includes("aprobed=true");
    setIsAuthenticated(authStatus);
    if (!authStatus) {
      router.push("/");
    } else {
      setUsername(
        document.cookie.includes("username")
          ? document.cookie.split("username=")[1].split(";")[0]
          : ""
      );
    }
    const colorModeCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("colorMode="));
    if (colorModeCookie) {
      const colorMode = colorModeCookie.split("=")[1];
      setMode(colorMode);
    }
  }, [router]);

  const toggleColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    setCookie("colorMode", newMode, 30); // Set cookie for 30 days
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#a6e0e0" : "#004242",
            dark: mode === "light" ? "#006f6d" : "#8dc0c0",
          },
          secondary: {
            main: mode === "light" ? "#ffffff" : "#006666",
            contrastText: mode === "light" ? "#1e1e1e" : "#ffffff",
            invertedCotrastText: mode === "light" ? "#1e1e1e" : "#ffffff",
          },
          background: {
            default: mode === "light" ? "#e9e9e9" : "#cccccc",
            paper: mode === "light" ? "#ffffff" : "#004242",
            Menu: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
          button: {
            background: mode === "light" ? "#a6e0e0" : "#004242",
            hover: mode === "light" ? "#006f6d" : "#8dc0c0",
          },
        },
        typography: {
          fontFamily: geistSans.variable,
          h3: {
            fontWeight: 700,
            fontSize: "2.2rem",
            "@media (min-width:600px)": {
              fontSize: "2.5rem",
            },
          },
          h4: {
            fontWeight: 600,
            fontSize: "1.8rem",
            "@media (min-width:600px)": {
              fontSize: "2.2rem",
            },
          },
          h5: {
            fontWeight: 500,
          },
        },
      }),
    [mode]
  );

  const setCookie = (name, value, days) => {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
  };

  const handleLogin = (enteredUsername, password) => {
    let auth = btoa(`${enteredUsername}:${password}`);

    fetch(`${backendUrl}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login successful") {
          setCookie("aprobed", "true", 1);
          setCookie("username", enteredUsername, 1);
          setCookie("credentials", auth, 1);
          setCredentials(auth);
          setIsAuthenticated(true);
          setUsername(enteredUsername);
          setError("");
          router.push("/Home");
        } else {
          setError("Nombre de usuario o contraseña incorrectos");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Error en el inicio de sesion");
      });
  };

  const handleLogout = () => {
    document.cookie =
      "aprobed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthenticated(false);
    setUsername("");
    router.push("/");
  };

  const contextValue = {
    mode,
    data,
    toggleColorMode,
    isAuthenticated,
    username,
    error,
    handleLogin,
    handleLogout,
    setError,
    backendUrl,
    credentials,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <AppBar position="static" color="primary" enableColorOnDark>
                <Container maxWidth="xl">
                  <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: "flex" }}>
                      {isAuthenticated && <MenuComponent />}
                    </Box>
                    <Typography
                      variant="h3"
                      noWrap
                      component="a"
                      href="/Home"
                      sx={{
                        display: "flex",
                        flexGrow: 1,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                        m: 4,
                        fontSize: { xs: "2.7rem", sm: "h3.fontSize" },
                      }}
                    >
                      DETBANK
                    </Typography>
                    <IconButton
                      sx={{ ml: 1 }}
                      onClick={toggleColorMode}
                      color="inherit"
                    >
                      {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                  </Toolbar>
                </Container>
              </AppBar>
              <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
              </Box>
              <Footer />
            </Box>
          </body>
        </html>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
