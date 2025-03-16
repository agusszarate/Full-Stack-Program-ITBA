import {
  Card,
  CardContent,
  Grid2 as Grid,
  Button,
  Typography,
  Chip,
} from "@mui/material";
import {
  AccountBalance as AccountBalanceIcon,
  QrCode as QrCodeIcon,
  Label as LabelIcon,
  Lock as LockIcon,
  AttachMoney as AttachMoneyIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import Link from "next/link";

const infoCuenta = ({ cuenta, checked }) => {
  const InfoItem = ({ icon, label, value }) => (
    <Grid size={{ xs: 12, sm: 9 }}>
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: "0.9rem", sm: "1.1rem", lg: "1.3rem" },
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          width: { md: "min-content", xs: "auto" },
          height: "min-content",
          whiteSpace: { md: "pre" },
        }}
      >
        {icon}
        {label + value}
      </Typography>
    </Grid>
  );
  return (
    <Card
      elevation={3}
      sx={{
        backgroundColor: "secondary.main",
        color: "secondary.contrastText",
        borderRadius: 2,
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <CardContent sx={{ width: "100%" }}>
        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          justifyContent="space-between"
          alignItems="center"
        >
          <InfoItem
            icon={<AccountBalanceIcon sx={{ mr: 1 }} />}
            label="Cuenta: "
            value={`${cuenta.tipo} N° ${cuenta.id}`}
          />
          <Grid
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body1"
              align="right"
              sx={{
                fontSize: { xs: "0.5rem", sm: "1rem", lg: "1.2rem" },
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", sm: "flex-end" },
              }}
            >
              <AttachMoneyIcon sx={{ mr: 1 }} />
              SALDO:
            </Typography>

            {checked ? (
              <LockIcon sx={{ ml: 1 }} />
            ) : (
              <Typography
                variant="body1"
                sx={{
                  ml: 1,
                  fontSize: { xs: "0.5rem", sm: "1rem", lg: "1.2rem" },
                  fontWeight: "bold",
                }}
              >
                $
                {cuenta.balance}
              </Typography>
            )}
          </Grid>
          <Grid xs={12}>
            <InfoItem icon={<QrCodeIcon />} label="CBU: " value={cuenta.cbu} />
          </Grid>
          <Grid
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              minHeight: "60px",
            }}
          >
            <Link href={`/transferencias`} passHref legacyBehavior>
              <Button
                size="small"
                variant="contained"
                startIcon={<SendIcon />}
                sx={{
                  backgroundColor: "button.background",
                  color: "primary.contrastText",
                  "&:hover": {
                    backgroundColor: "button.hover",
                  },
                }}
              >
                Transferir
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default infoCuenta;
