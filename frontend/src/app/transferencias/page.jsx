"use client";

import { useState, useContext } from "react";
import {
  Grid2 as Grid,
  Typography,
  Box,
  Snackbar,
  TextField,
  Button,
  Alert,
  Card,
  useTheme,
  InputAdornment,
} from "@mui/material";
import {
  AttachMoney as AttachMoneyIcon,
  AccountBalance as AccountBalanceIcon,
} from "@mui/icons-material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { transferenciaSchema } from "./schema";
import SelectCuenta from "@/components/SelectCuenta";
import { AppContext } from "../layout";

function Transferencias() {
  const theme = useTheme();

  const [cuenta, setCuenta] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [respuesta, setRespuesta] = useState("");

  const methods = useForm({
    defaultValues: {
      CBU: "",
      monto: "",
    },
    resolver: yupResolver(transferenciaSchema),
    mode: "onChange",
    context: { cuenta },
  });

  const { handleSubmit, control, formState } = methods;
  const { backendUrl } = useContext(AppContext);
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const postTransferir = (origen, CBU, cant) => {
    fetch(`${backendUrl}/movimientos/transferir/`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${getCookie("credentials")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        monto: cant,
        cuenta: origen,
        destino: CBU,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (
          data.message === "rechazado" ||
          data.message === "no se encontro la cuenta"
        ) {
          setRespuesta(data.message);
          setSnackbarOpen(true);
        } else {
          setRespuesta(
            `Tu transferencia fue exitosa, tu nuevo saldo es: $${data.obj.balance}`
          );
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const onSubmit = async (data) => {
    postTransferir(cuenta.id, data.CBU, data.monto.replace(",", "."));
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
          backgroundColor: theme.palette.background.paper,
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
                mb: 3,
                mt: 3,
                textAlign: { xs: "center", sm: "center", md: "left" },
                fontSize: { xs: "2.5rem", sm: "h3.fontSize" },
                color: theme.palette.secondary.contrastText,
              }}
            >
              Transferencias
            </Typography>
          </Grid>
          <Grid
            container
            xs={12}
            sx={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              alignContent: "center",
            }}
          >
            <FormProvider {...methods}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      p: 2,
                      backgroundColor: "secondary.main",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          alignItems: "center",
                          width: "100%",
                          alignContent: "center",
                        }}
                      >
                        <Controller
                          name="CBU"
                          control={control}
                          render={({ field }) => {
                            const handleCbu = (newValue) => {
                              field.onChange(newValue);
                            };
                            return (
                              <TextField
                                name="CBU"
                                id="CBU"
                                label="CBU/CVU o Alias"
                                fullWidth
                                value={field.value}
                                error={formState.errors.CBU?.message}
                                onChange={(e) => handleCbu(e.target.value)}
                                slotProps={{
                                  input: {
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <AccountBalanceIcon />
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
                        {formState.errors.CBU?.message && (
                          <Alert severity="error">
                            {formState.errors.CBU?.message}
                          </Alert>
                        )}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          width: "100%",
                          alignContent: "center",
                        }}
                      >
                        <SelectCuenta
                          color={
                            theme.palette.mode === "light"
                              ? "primary"
                              : "secondary"
                          }
                          cuenta={cuenta}
                          setCuenta={setCuenta}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          alignItems: "center",
                          width: "100%",
                          alignContent: "center",
                        }}
                      >
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
                    </Grid>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleSubmit(onSubmit)()}
                      sx={{
                        mt: 2,
                        backgroundColor: theme.palette.button.background,
                        color: theme.palette.primary.contrastText,
                        "&:hover": {
                          backgroundColor: theme.palette.button.hover,
                        },
                      }}
                    >
                      Transferir
                    </Button>
                  </Card>
                </Grid>
              </Grid>
            </FormProvider>
          </Grid>
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={respuesta}
        />
      </Box>
    </Box>
  );
}

export default Transferencias;
