import React from "react";
import { Box, Typography, Container, Button, useTheme } from "@mui/material";
import Link from "next/link";

export default function Ayuda() {
  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        backgroundColor: "primary.main",
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          mb: 4,
          color: "text.primary",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            backgroundColor: "primary.dark",
            color: "primary.contrastText",
            padding: "1rem",
            borderRadius: "2rem",
          }}
        >
          ¿En qué podemos ayudarte?
        </Typography>
        <Typography variant="body1" paragraph>
          Bienvenido a la central de Ayuda de DetBank. Aquí encontrarás un
          apartado con las preguntas más frecuentes.
        </Typography>
        <Typography variant="body1" paragraph>
          Si tienes alguna consulta más específica o de algún tema en
          particular, puedes comunicarte con nosotros por los siguientes medios.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 1,
            borderRadius: 2,
            textAlign: { xs: "center", md: "center" },
            backgroundColor: "secondary.main",
            color: "secondary.contrastText",
            p: 1,
          }}
        >
          ¿Cómo me puedo contactar con DetBank?
        </Typography>
        <Typography variant="body1" paragraph>
          Haciendo clic en el botón de abajo te mostraremos los medios de
          contacto.
        </Typography>
        <Link href="/contacto" passHref>
          <Button
            variant="contained"
            sx={{
              color: "secondary.contrastText",
              backgroundColor: "secondary.main",
              "&:hover": {
                backgroundColor: "secondary.dark",
              },
            }}
          >
            Medios de Contacto
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          color: "text.primary",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            backgroundColor: "primary.dark",
            color: "primary.contrastText",
            padding: "1rem",
            borderRadius: "2rem",
          }}
        >
          Preguntas Frecuentes
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 1,
            borderRadius: 2,
            textAlign: { xs: "center", md: "center" },
            backgroundColor: "secondary.main",
            color: "secondary.contrastText",
            p: 1,
            mt: 2,
          }}
        >
          ¿Cómo puedo abrir una cuenta?
        </Typography>
        <Typography variant="body1" paragraph>
          Para abrir una cuenta en DetBank, debes dirigirte a la sección de
          cuentas y seguir los pasos indicados.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 1,
            borderRadius: 2,
            textAlign: { xs: "center", md: "center" },
            backgroundColor: "secondary.main",
            color: "secondary.contrastText",
            p: 1,
            mt: 2,
          }}
        >
          ¿Cómo puedo solicitar una tarjeta de crédito?
        </Typography>
        <Typography variant="body1" paragraph>
          Para solicitar una tarjeta de crédito, debes dirigirte a la sección de
          tarjetas y seguir los pasos indicados.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 1,
            borderRadius: 2,
            textAlign: { xs: "center", md: "center" },
            backgroundColor: "secondary.main",
            color: "secondary.contrastText",
            p: 1,
            mt: 2,
          }}
        >
          ¿Cómo puedo realizar una transferencia?
        </Typography>
        <Typography variant="body1" paragraph>
          Para realizar una transferencia, debes dirigirte a la sección de
          transferencias y seguir los pasos indicados.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 1,
            borderRadius: 2,
            textAlign: { xs: "center", md: "center" },
            backgroundColor: "secondary.main",
            color: "secondary.contrastText",
            p: 1,
            mt: 2,
          }}
        >
          ¿Cómo puedo ver los movimientos de mi cuenta?
        </Typography>
        <Typography variant="body1" paragraph>
          Para ver los movimientos de tu cuenta, debes dirigirte a la sección de
          movimientos y seguir los pasos indicados.
        </Typography>
      </Box>
    </Container>
  );
}
