import { Box, Typography, Container } from "@mui/material";

function Politicas() {
  return (
    <Container maxWidth="600" 
        sx={{
            py: 2,
            backgroundColor: '#008584', 
            }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          backdropFilter: 'blur(10px)', 
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          color: 'white',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Política de Privacidad
        </Typography>
        <Typography variant="body1" paragraph>
          En DetBank, valoramos y respetamos tu privacidad. Esta política de privacidad describe cómo recopilamos, usamos y protegemos tu información personal.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom
           sx=
           {{ 
             mb: 1, 
             borderRadius: 2,
             textAlign: { xs: "center", md: "center" },
             backgroundColor: "#a6e0e0",
             color: "black",
           }}
        >
          1. Información que Recopilamos
        </Typography>
        <Typography variant="body1" paragraph>
          Recopilamos información personal que nos proporcionas directamente, como tu nombre, dirección de correo electrónico, número de teléfono y detalles de la cuenta bancaria. También recopilamos información automáticamente a través de tu uso de nuestros servicios, como tu dirección IP, tipo de navegador y páginas visitadas.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom
           sx=
           {{ 
             mb: 1, 
             borderRadius: 2,
             textAlign: { xs: "center", md: "center" },
             backgroundColor: "#a6e0e0",
             color: "black",
           }}
        >
          2. Uso de la Información
        </Typography>
        <Typography variant="body1" paragraph>
          Utilizamos tu información personal para proporcionar y mejorar nuestros servicios, comunicarnos contigo, personalizar tu experiencia y cumplir con nuestras obligaciones legales. No compartimos tu información personal con terceros, excepto cuando sea necesario para proporcionar nuestros servicios o cumplir con la ley.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom
           sx=
           {{ 
             mb: 1, 
             borderRadius: 2,
             textAlign: { xs: "center", md: "center" },
             backgroundColor: "#a6e0e0",
             color: "black",
           }}
        >
          3. Protección de la Información
        </Typography>
        <Typography variant="body1" paragraph>
          Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra el acceso no autorizado, la pérdida o el daño. Sin embargo, ninguna transmisión de datos por Internet o sistema de almacenamiento es completamente seguro, por lo que no podemos garantizar la seguridad absoluta de tu información.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom
           sx=
           {{ 
             mb: 1, 
             borderRadius: 2,
             textAlign: { xs: "center", md: "center" },
             backgroundColor: "#a6e0e0",
             color: "black",
           }}
        >
          4. Tus Derechos
        </Typography>
        <Typography variant="body1" paragraph>
          Tienes derecho a acceder, corregir, actualizar y eliminar tu información personal. También puedes oponerte al procesamiento de tu información personal y solicitar la portabilidad de tus datos. Para ejercer estos derechos, por favor, contáctanos a través de los medios proporcionados en esta política.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom
           sx=
           {{ 
             mb: 1, 
             borderRadius: 2,
             textAlign: { xs: "center", md: "center" },
             backgroundColor: "#a6e0e0",
             color: "black",
           }}
        >
          5. Cambios a esta Política
        </Typography>
        <Typography variant="body1" paragraph>
          Podemos actualizar esta política de privacidad de vez en cuando para reflejar cambios en nuestras prácticas o en la legislación aplicable. Te notificaremos sobre cualquier cambio significativo publicando la nueva política en nuestro sitio web y, si es necesario, solicitando tu consentimiento.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom
           sx=
           {{ 
             mb: 1, 
             borderRadius: 2,
             textAlign: { xs: "center", md: "center" },
             backgroundColor: "#a6e0e0",
             color: "black",
           }}
        >
          6. Contacto
        </Typography>
        <Typography variant="body1" paragraph>
          Si tienes alguna pregunta o inquietud sobre esta política de privacidad o sobre cómo manejamos tu información personal, por favor, contáctanos a través de nuestro correo electrónico: privacidad@detbank.com o llamando al número de teléfono: 0800-123-4567.
        </Typography>
      </Box>
    </Container>
  );
}

export default Politicas;
