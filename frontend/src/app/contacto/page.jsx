"use client";

import {
  Box,
  Typography,
  Grid2 as Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
} from "@mui/material";
// export const metadata = {
//   title: "Contacto",
// };

export default function Contacto() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = {
      name: data.get("name"),
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
    };
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
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          p: 3,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          width: "100%",
        }}
      >
        <Grid sx={{ width: "100%" }} container spacing={2}>
          <Grid size={12}>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                mb: 3,
                mt: 3,
                textAlign: { xs: "center", sm: "center", md: "left" },
                fontSize: { xs: "2.5rem", sm: "h3.fontSize" },
              }}
            >
              Contacto
            </Typography>
          </Grid>
          <Grid size={12}>
            <Card fullWidth sx={{ p: 3 }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  name="name"
                  label="Nombre"
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="email"
                  label="Correo Electrónico"
                  type="email"
                  fullWidth
                  margin="normal"
                  required
                />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="subject-label">Asunto</InputLabel>
                  <Select
                    labelId="subject-label"
                    name="subject"
                    label="Asunto"
                    defaultValue=""
                  >
                    <MenuItem value="consulta">Consulta</MenuItem>
                    <MenuItem value="soporte">Soporte</MenuItem>
                    <MenuItem value="sugerencia">Sugerencia</MenuItem>
                    <MenuItem value="otro">Otro</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  name="message"
                  label="Mensaje"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  required
                />
                <Button type="submit" variant="contained" color="primary">
                  Enviar
                </Button>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
