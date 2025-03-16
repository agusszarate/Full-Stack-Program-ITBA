"use client";
import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Grid2 as Grid,
  Card,
} from "@mui/material";

function Prestamos() {
  const [monto, setMonto] = useState(5000000);
  const [plazo, setPlazo] = useState(12);
  const [totalPagar, setTotalPagar] = useState(0);
  const [cuotaMensual, setCuotaMensual] = useState(0);
  const [error, setError] = useState("");
  const tasaInteres = 0.3; // 30% anual

  const calcularPrestamo = () => {
    setError(""); // Limpiar errores previos

    if (!monto || !plazo) {
      setError("Por favor, selecciona un monto y un plazo.");
      return;
    }

    const interesAnual = monto * tasaInteres;
    const montoTotal = monto + interesAnual * (plazo / 12);
    const cuota = montoTotal / plazo;
    setTotalPagar(montoTotal);
    setCuotaMensual(cuota);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "71vh",
        backgroundColor: "#008584",
        p: 2,
        m: 0,
      }}
    >
      <Box
        maxWidth="md"
        sx={{
          width: "100%",
          maxWidth: 800,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          color: "white",
          m: { sm: 1, md: 3 },
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 5, textAlign: "center" }}
        >
          Préstamos
        </Typography>

        <Grid container spacing={2}>
          <Card sx={{ width: "100%", height: "100%", p: 2 }}>
            <Grid size={12} mb={2}>
              <FormControl fullWidth>
                <InputLabel id="monto-label">Monto a solicitar</InputLabel>
                <Select
                  labelId="monto-label"
                  id="monto"
                  value={monto}
                  onChange={(e) => setMonto(Number(e.target.value))}
                  error={error}
                >
                  <MenuItem value={5000000}>5 millones de pesos</MenuItem>
                  <MenuItem value={10000000}>10 millones de pesos</MenuItem>
                  <MenuItem value={15000000}>15 millones de pesos</MenuItem>
                  <MenuItem value={25000000}>25 millones de pesos</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Selección del plazo */}
            <Grid size={12} mb={2}>
              <FormControl fullWidth>
                <InputLabel id="plazo-label">Plazo en meses</InputLabel>
                <Select
                  labelId="plazo-label"
                  id="plazo"
                  value={plazo}
                  onChange={(e) => setPlazo(Number(e.target.value))}
                  error={error}
                >
                  <MenuItem value={12}>12 meses</MenuItem>
                  <MenuItem value={24}>24 meses</MenuItem>
                  <MenuItem value={36}>36 meses</MenuItem>
                  <MenuItem value={48}>48 meses</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Botón para calcular */}
            <Grid xs={12} mb={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={calcularPrestamo}
              >
                Calcular Préstamo
              </Button>
            </Grid>

            {/* Resultados */}
            <Grid xs={12}>
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  textAlign: "center",
                  fontSize: { xs: "1.2rem", md: "h5.fontsize", lg: "1.6rem" },
                  backgroundColor: "#a6e0e0",
                  color: "black",
                }}
              >
                Total a pagar: {totalPagar.toFixed(2)} pesos
              </Typography>
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  textAlign: "center",
                  fontSize: { xs: "1.2rem", md: "h5.fontsize", lg: "1.6rem" },
                  backgroundColor: "#a6e0e0",
                  color: "black",
                }}
              >
                Cuota mensual: {cuotaMensual.toFixed(2)} pesos
              </Typography>
            </Grid>
          </Card>
        </Grid>
      </Box>
    </Box>
  );
}

export default Prestamos;
