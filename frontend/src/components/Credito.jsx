import React from "react";
import {
  Card,
  CardContent,
  Grid2 as Grid,
  Button,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import {
  CreditCard as CreditCardIcon,
  AttachMoney as AttachMoneyIcon,
  Lock as LockIcon,
  Payment as PaymentIcon,
} from "@mui/icons-material";
import Link from "next/link";

const Credito = ({ tarjeta, checked, pagar }) => {
  return (
    <Card
      elevation={3}
      sx={{
        backgroundColor: "secondary.main",
        color: "secondary.contrastText",
        borderRadius: 2,
        marginBottom: 2,
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Grid
          container
          spacing={{ sx: 3, sm: 8 }}
          justifyContent={{ sm: "space-between", xs: "center" }}
        >
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "0.9rem", sm: "1.1rem", lg: "1.3rem" },
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <CreditCardIcon sx={{ mr: 1 }} />
              Crédito {tarjeta.info}
            </Typography>
          </Grid>
          <Grid
            xs={12}
            sx={{
              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
            }}
          >
            <Box
              sx={{
                paddingLeft: 1,
                borderRadius: 1,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                gap: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  letterSpacing: 4,
                  fontFamily: "monospace",
                }}
              >
                XXXX XXXX XXXX {tarjeta.numero.slice(-4)}
              </Typography>
            </Box>
          </Grid>
          {/* {pagar ? (
            <Grid xs="grow">
              <Link
                href={`/tarjetas/pagos/${tarjeta.id}`}
                passHref
                legacyBehavior
              >
                <Button
                  component="a"
                  size="small"
                  variant="contained"
                  startIcon={<PaymentIcon />}
                  sx={{
                    backgroundColor: "button.background",
                    color: "primary.contrastText",
                    "&:hover": {
                      backgroundColor: "button.hover",
                    },
                  }}
                >
                  Pagar Tarjeta
                </Button>
              </Link>
            </Grid>
          ) : null} */}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Credito;
