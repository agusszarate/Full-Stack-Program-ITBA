import { Box, Typography, Container } from "@mui/material";

function Terminos() {
  return (
    <Container maxWidth="600" 
        sx=
        {{ 
            py: 4,
            backgroundColor: '#008584',

        }}
        >
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          backdropFilter: 'blur(10px)', 
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          color: 'white',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Términos y Condiciones
        </Typography>
        <Typography variant="body1" paragraph>
          Bienvenido a DevBank. Al utilizar nuestros servicios, aceptas los siguientes términos y condiciones. Por favor, léelos detenidamente.
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
          1. Aceptación de los Términos
        </Typography>
        <Typography variant="body1" paragraph>
          Al acceder y utilizar los servicios de DevBank, aceptas y te comprometes a cumplir con estos términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, no deberías utilizar nuestros servicios.
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
          2. Modificaciones de los Términos
        </Typography>
        <Typography variant="body1" paragraph>
          Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones serán efectivas inmediatamente después de su publicación en nuestro sitio web. Es tu responsabilidad revisar periódicamente estos términos para estar al tanto de cualquier cambio.
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
          3. Uso de los Servicios
        </Typography>
        <Typography variant="body1" paragraph>
          Debes utilizar nuestros servicios de manera legal y ética. No debes utilizar nuestros servicios para cualquier propósito ilegal o no autorizado. Nos reservamos el derecho de suspender o terminar tu acceso a nuestros servicios si violas estos términos.
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
          4. Propiedad Intelectual
        </Typography>
        <Typography variant="body1" paragraph>
          Todo el contenido y los materiales disponibles en nuestro sitio web, incluyendo pero no limitado a textos, gráficos, logotipos, íconos, imágenes, clips de audio, descargas digitales y software, son propiedad de DevBank o de sus proveedores de contenido y están protegidos por las leyes de propiedad intelectual.
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
          5. Privacidad
        </Typography>
        <Typography variant="body1" paragraph>
          Tu privacidad es importante para nosotros. Por favor, revisa nuestra Política de Privacidad para entender cómo recopilamos, usamos y protegemos tu información personal.
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
          6. Limitación de Responsabilidad
        </Typography>
        <Typography variant="body1" paragraph>
          DevBank no será responsable por cualquier daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de usar nuestros servicios. Esta limitación de responsabilidad se aplicará en la máxima medida permitida por la ley.
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
          7. Ley Aplicable
        </Typography>
        <Typography variant="body1" paragraph>
          Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes del país en el que operamos, sin dar efecto a ningún principio de conflicto de leyes.
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
          8. Contacto
        </Typography>
        <Typography variant="body1" paragraph>
          Si tienes alguna pregunta o inquietud sobre estos términos y condiciones, por favor, contáctanos a través de nuestro correo electrónico: terminos@devbank.com o llamando al número de teléfono: 0800-123-4567.
        </Typography>
      </Box>
    </Container>
  );
}

export default Terminos;
