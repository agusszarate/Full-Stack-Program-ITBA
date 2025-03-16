"use client";

import { useState, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  Grid2 as Grid,
  FormControlLabel,
  Switch,
  useTheme,
} from "@mui/material";
import ListTarjetas from "@/components/ListTarjetas";
import ListCuentas from "@/components/ListCuentas";
import { AppContext } from "@/app/layout";
import Link from "next/link";

const Home = () => {
  const theme = useTheme();
  const { username, backendUrl } = useContext(AppContext);

  let info = useContext(AppContext).data;

  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [tarjetas, setTarjetas] = useState({ credito: [], debito: [] });
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  useEffect(() => {
    const fetchTarjetas = async () => {
      try {
        const response = await fetch(`${backendUrl}/cliente/`, {
          method: "GET",
          headers: {
            Authorization: `Basic ${getCookie("credentials")}`,
          },
        });
        const data = await response.json();
        let credito = data.tarjetas.filter(
          (tarjeta) => tarjeta.tipo === "credito"
        );
        let debito = data.tarjetas.filter(
          (tarjeta) => tarjeta.tipo === "debito"
        );
        setTarjetas({ credito, debito });
        setData(data);
      } catch (error) {
        console.error("Error fetching tarjetas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTarjetas();
  }, []);

  if (loading) {
    return (
      <Typography variant="h4" component="h4">
        Loading...
      </Typography>
    );
  }

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
          width: "100%",
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
              Hola, {username}
            </Typography>
          </Grid>
          <Grid
            container
            size={{ sm: 12, md: 6 }}
            sx={{
              justifyContent: {
                xs: "center",
                md: "flex-end",
              },
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              alignContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                backgroundColor: "#006160",
                borderRadius: 6,
                p: 1,
                boxShadow: 1,
                width: "min-content",
                height: "min-content",
                whiteSpace: "pre",
              }}
            >
              <FormControlLabel
                value="Ocultar saldos"
                control={<Switch color="primary" defaultChecked />}
                label="Ocultar saldos"
                labelPlacement="start"
                onChange={handleChange}
                sx={{
                  ml: 1,
                  color: "white",
                  "& .MuiFormControlLabel-label": {
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                    fontWeight: "bold",
                  },
                }}
              />
            </Box>
          </Grid>

          <Grid container size={12} sx={{ alignItems: "flex-start" }}>
            <Grid container size={{ sm: 12, md: 6 }} spacing={2}>
              <Box
                sx={{
                  borderRadius: 2,
                  textAlign: "center",
                  backgroundColor: "#a6e0e0",
                  color: "black",
                  width: "100%",
                  height: "min-content",
                }}
              >
                <Link href="/cuentas">
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{
                      fontSize: {
                        xs: "1.3rem",
                        md: "h5.fontsize",
                        lg: "1.6rem",
                      },
                    }}
                  >
                    Cuentas
                  </Typography>
                </Link>
              </Box>
              <Grid size={12}>
                <ListCuentas cuentas={data.cuentas} checked={checked} />
              </Grid>
            </Grid>

            <Grid container size={{ sm: 12, md: 6 }}>
              <Box
                sx={{
                  borderRadius: 2,
                  textAlign: "center",
                  backgroundColor: "#a6e0e0",
                  color: "black",
                  width: "100%",
                  height: "min-content",
                }}
              >
                <Link href="/tarjetas">
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{
                      fontSize: {
                        xs: "1.3rem",
                        md: "h5.fontsize",
                        lg: "1.6rem",
                      },
                    }}
                  >
                    Tarjetas
                  </Typography>
                </Link>
              </Box>
              <Grid size={12}>
                <ListTarjetas tarjetas={tarjetas} checked={checked} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
