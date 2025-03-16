import React, { useContext } from "react";
import { Grid2 as Grid, Button } from "@mui/material";
import Link from "next/link";
import Credito from "./Credito";
import Debito from "./Debito";

export function ListCredito({ tarjetas, checked }) {
  return (
    <>
      {tarjetas.map((tarjeta) => (
        <Credito tarjeta={tarjeta} checked={checked} pagar={true} />
      ))}
    </>
  );
}

export function ListDebito({ tarjetas }) {
  return (
    <>
      {tarjetas.map((tarjeta) => (
        <Debito tarjeta={tarjeta} />
      ))}
    </>
  );
}

function ListTarjetas({ tarjetas, checked }) {
  return (
    <Grid container>
      <ListCredito tarjetas={tarjetas.credito} checked={checked} />
      <ListDebito tarjetas={tarjetas.debito} />
    </Grid>
  );
}

export default ListTarjetas;
