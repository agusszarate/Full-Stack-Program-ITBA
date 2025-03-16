import { Typography, Box, Grid2 as Grid } from "@mui/material";

export default function Movimientos({ children }) {
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
                color: "secondary.contrastText",
              }}
            >
              Movimientos
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
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
