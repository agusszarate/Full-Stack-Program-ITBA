
import { Box, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2c3e50",
        color: "white",
        py: 2,
        px: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        flex: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 0,
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, paddingTop: 2 }}>
          <Link
            href="/politicas"
            variant="body2"
            sx={{ color: "white", textDecoration: "none", fontSize: "14px" }}
          >
            Política de Privacidad
          </Link>
          <Link
            href="/terminos"
            variant="body2"
            sx={{ color: "white", textDecoration: "none", fontSize: "14px" }}
          >
            Términos y Condiciones
          </Link>
          <Link
            href="/contacto"
            variant="body2"
            sx={{ color: "white", textDecoration: "none", fontSize: "14px" }}
          >
            Información de Contacto
          </Link>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 0,
        }}
      >
        <IconButton
          href="https://www.facebook.com/"
          target="_blank"
          color="inherit"
          sx={{ marginX: 1 }}
          aria-label="facebook"
        >
          <FacebookIcon
            sx={{ fontSize: "2.5rem", width: "30px", height: "30px" }}
          />
        </IconButton>
        <IconButton
          href="https://www.instagram.com/"
          target="_blank"
          color="inherit"
          sx={{ marginX: 1 }}
          aria-label="instagram"
        >
          <InstagramIcon
            sx={{ fontSize: "2.5rem", width: "30px", height: "30px" }}
          />
        </IconButton>
        <IconButton
          href="https://x.com/home"
          target="_blank"
          color="inherit"
          sx={{ marginX: 1 }}
          aria-label="X (previamente twitter)"
        >
          <TwitterIcon
            sx={{ fontSize: "2.5rem", width: "30px", height: "30px" }}
          />
        </IconButton>
      </Box>
      <Box sx={{ marginTop: "10px", fontSize: "12px" }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "white" }}
        >
          &copy; 2024 DevBank Homebanking. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
