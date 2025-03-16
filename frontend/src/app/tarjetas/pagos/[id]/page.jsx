"use client";
import React, { useState } from "react";
import data from "@/info.json";
import Credito from "@/components/Credito";
import {
  Grid2 as Grid,
  Typography,
  Box,
  InputAdornment,
  TextField,
  Snackbar,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Alert,
  useTheme,
} from "@mui/material";
import { AttachMoney as AttachMoneyIcon } from "@mui/icons-material";
import SelectCuenta from "@/components/SelectCuenta";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { pagoTarjetaSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

function Pagos({ params }) {
  const theme = useTheme();

  const cuentas = data.cuentas;
  const [cuenta, setCuenta] = useState(data.cuentas[0]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [mensaje, setMensaje] = useState();

  const id = params.id;
  let tarjeta;
  data.tarjetas.credito.forEach((tar) => {
    if (tar.id === id) {
      tarjeta = tar;
    }
  });

  const methods = useForm({
    defaultValues: {
      monto: "",
    },
    resolver: yupResolver(pagoTarjetaSchema),
    mode: "onChange",
    context: { cuenta },
  });

  const { handleSubmit, control, formState } = methods;

  const onSubmit = (data) => {
    let { monto } = data;
    cuenta.saldo = cuenta.saldo - parseFloat(monto);
    if (tarjeta.signo === "en contra") {
      if (tarjeta.saldo > parseFloat(monto)) {
        tarjeta.saldo = tarjeta.saldo - parseFloat(monto);
      } else if (tarjeta.saldo < parseFloat(monto)) {
        tarjeta.saldo = parseFloat(monto) - tarjeta.saldo;
        tarjeta.signo = "a favor";
      } else {
        tarjeta.saldo = 0;
        tarjeta.signo = "";
      }
    } else {
      tarjeta.saldo = tarjeta.saldo + parseFloat(monto);
      tarjeta.signo = "a favor";
    }
    setMensaje(
      "Pago exitoso: \nNuevo saldo " +
        tarjeta.signo +
        " de la tarjeta: $" +
        tarjeta.saldo.toLocaleString("es-AR", { minimumFractionDigits: 2 }) +
        "\n\n Nuevo saldo de la cuenta: $" +
        cuenta.saldo.toLocaleString("es-AR", { minimumFractionDigits: 2 })
    );

    setSnackbarOpen(true);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "60vh",
        backgroundColor: "#008584",
        p: 3,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      <Box
        sx={{
          borderRadius: 3,
          m: { sm: 1, md: 3 },
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "10vh",
          backgroundColor: "background.paper",
          p: 3,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          width: { xs: "100%", sm: "80%" },
        }}
      >
        <Grid sx={{ width: "100%" }} container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                mb: 1,
                mt: 3,
                ml: { xs: 1, sm: 0, md: 3 },
                textAlign: { xs: "center", sm: "center", md: "left" },
                fontSize: { xs: "2.5rem", sm: "h3.fontSize" },
                color: theme.palette.secondary.contrastText,
              }}
            >
              Pagar
            </Typography>
          </Grid>

          <Grid
            container
            size={12}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormProvider {...methods}>
              <Grid
                container
                spacing={2}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    p: 2,
                    backgroundColor: "secondary.main",
                  }}
                >
                  <Box sx={{ mb: 4 }}>
                    <Link href={`/movimientos/tarjeta/${tarjeta.id}`}>
                      <CardActionArea>
                        <CardContent>
                          <Credito tarjeta={tarjeta} />
                        </CardContent>
                      </CardActionArea>
                    </Link>
                  </Box>
                  <Grid size={12} mb={2}>
                    <SelectCuenta
                      cuentas={cuentas}
                      cuenta={cuenta}
                      setCuenta={setCuenta}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Controller
                      name="monto"
                      control={control}
                      render={({ field }) => {
                        const handleMonto = (newValue) => {
                          const regex = /^[0-9]*[.,]?[0-9]*$/;

                          if (regex.test(newValue)) {
                            field.onChange(newValue);
                          }
                        };
                        return (
                          <TextField
                            id="Monto"
                            name="Monto"
                            label="Monto en pesos"
                            fullWidth
                            value={field.value}
                            error={formState.errors.monto?.message}
                            onChange={(e) => handleMonto(e.target.value)}
                            slotProps={{
                              input: {
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AttachMoneyIcon />
                                  </InputAdornment>
                                ),
                              },
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor:
                                    theme.palette.mode === "light"
                                      ? "rgba(0, 0, 0, 0.23)"
                                      : "rgba(255, 255, 255, 0.23)",
                                },
                                "&:hover fieldset": {
                                  borderColor:
                                    theme.palette.mode === "light"
                                      ? "rgba(0, 0, 0, 0.23)"
                                      : "rgba(255, 255, 255, 0.23)",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: theme.palette.primary.main,
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: theme.palette.secondary.contrastText,
                              },
                              "& .MuiInputLabel-root.Mui-focused": {
                                color: theme.palette.secondary.contrastText,
                              },
                            }}
                          />
                        );
                      }}
                    />
                    {formState.errors.monto?.message && (
                      <Alert severity="error">
                        {formState.errors.monto?.message}
                      </Alert>
                    )}
                  </Grid>
                  <Button
                    onClick={() => handleSubmit(onSubmit)()}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      backgroundColor: theme.palette.button.background,
                      color: theme.palette.primary.contrastText,
                      mt: 2,
                      "&:hover": {
                        backgroundColor: theme.palette.button.hover,
                      },
                    }}
                  >
                    Transferir
                  </Button>
                </Card>
              </Grid>
            </FormProvider>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={mensaje}
      />
    </Box>
  );
}

export default Pagos;
