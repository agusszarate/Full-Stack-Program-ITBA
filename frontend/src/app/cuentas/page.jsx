"use client";
import { useState, useContext, useEffect } from "react";
import {
  Box,
  Grid2 as Grid,
  Typography,
  FormControlLabel,
  Switch,
  useTheme,
} from "@mui/material";
import ListCuentas from "@/components/ListCuentas";
import { AppContext } from "../layout";

function Cuentas() {
  const theme = useTheme();
  const { backendUrl } = useContext(AppContext);

  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        const response = await fetch(`${backendUrl}/cuentas/`, {
          method: "GET",
          headers: {
            Authorization: `Basic ${getCookie("credentials")}`,
          },
        });
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCuentas();
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
              Cuentas
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

          <Grid size={12}>
            <ListCuentas cuentas={data} checked={checked} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default Cuentas;
