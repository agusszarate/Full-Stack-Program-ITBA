"use client";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../app/layout";
import {
  MenuItem,
  FormControl,
  TextField,
  useTheme,
  Typography,
} from "@mui/material";

const SelectCuenta = (props) => {
  const theme = useTheme();

  const { backendUrl } = useContext(AppContext);

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

  const cuentas = data.map((cuenta) => (
    <MenuItem
      key={cuenta.id}
      value={cuenta}
      name={cuenta.id}
      sx={{ justifyContent: "space-between" }}
    >
      {cuenta.tipo} N° {cuenta.id}. Saldo: ${cuenta.balance}
    </MenuItem>
  ));

  return (
    <FormControl fullWidth>
      <TextField
        id="select-cuenta"
        select
        label="Cuenta de origen"
        value={props.cuenta}
        fullWidth
        onChange={(e) => props.setCuenta(e.target.value)}
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
      >
        {cuentas}
      </TextField>
    </FormControl>
  );
};

export default SelectCuenta;
