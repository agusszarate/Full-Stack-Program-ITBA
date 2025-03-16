import React from "react";
import {
  Card,
  CardContent,
  Grid2 as Grid,
  Typography,
  Box,
} from "@mui/material";
import { CreditCard as CreditCardIcon } from "@mui/icons-material";

const Debito = ({ tarjeta }) => {
  return (
    <Card
      elevation={3}
      sx={{
        backgroundColor: "secondary.main",
        color: "secondary.contrastText",
        borderRadius: 2,
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        width: "100%",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Grid container spacing={7} justifyContent="space-between">
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1.1rem", lg: "1.3rem" },
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CreditCardIcon sx={{ mr: 1 }} />
            Debito {tarjeta.info}
          </Typography>
          {/* <Grid
            size={"grow"}
            sx={{
              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              alignContent: "center",
            }}
          >
          </Grid> */}
          {/* <Grid
            size={{ xs: 12, sm: 6 }}
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
            <Typography
              variant="body1"
              align="right"
              sx={{
                fontSize: { xs: "0.8rem", sm: "1rem", lg: "1.2rem" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Cuenta asociada: N° {tarjeta.cuenta}
            </Typography>
          </Grid> */}
          <Grid
            xs={6}
            sx={{
              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "0.8rem", sm: "1rem" },
                letterSpacing: 4,
                padding: { xs: 0, md: 0.7 },
                fontFamily: "monospace",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              XXXX XXXX XXXX {tarjeta.numero.slice(-4)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Debito;
