"use client";

import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material";
import {
  LockOutlined,
  PersonOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { AppContext } from "@/app/layout";

export default function LoginForm() {
  const router = useRouter();
  const theme = useTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const authStatus = document.cookie.includes("aprobed=true");
    if (authStatus) {
      router.push("/Home");
    }
  }, [router]);

  const { error, handleLogin, setError } = useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    handleLogin(username, password);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Iniciar Sesión
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de Usuario"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlined />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: theme.palette.button.background,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.button.hover,
                },
              }}
            >
              Iniciar Sesión
            </Button>
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
