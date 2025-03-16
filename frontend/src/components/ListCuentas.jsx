import React from "react";
import { Grid2 as Grid } from "@mui/material";
import Link from "next/link";
import InfoCuenta from "./InfoCuenta";

function ListCuentas({ cuentas, checked }) {
  return (
    <Grid container spacing={1.5} sx={{ width: "100%" }}>
      {cuentas.map((cuenta) => (
        <Link
          href={`/movimientos/cuenta/${cuenta.id}`}
          key={cuenta.id}
          passHref
          legacyBehavior
          style={{ width: "100%", display: "block" }}
        >
          <Grid item xs={12} sx={{ width: "100%" }}>
            <InfoCuenta cuenta={cuenta} checked={checked} />
          </Grid>
        </Link>
      ))}
    </Grid>
  );
}

export default ListCuentas;
