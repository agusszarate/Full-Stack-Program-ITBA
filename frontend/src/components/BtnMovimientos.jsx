import { 
  Button,
  Typography
} from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

const BtnMovimientos = (props) => {
  return (
    // <Link to={`/movimientos/${props.tipo}/${props.id}`}>Movimientos</Link>
    <Button
      size="small"
      href={`/movimientos/${props.tipo}/${props.id}`}
      startIcon={<CurrencyExchangeIcon />}
      sx={{
        textTransform: "none",
      }}
    >
      <Typography
        variant="body2"
        textAlign={"left"}
        color="textSecondary"
      >
        Ver movimientos
      </Typography>
    </Button>
  )
}

export default BtnMovimientos
