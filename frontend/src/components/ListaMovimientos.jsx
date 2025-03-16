import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function ListaMovimientos(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#a6e0e0" }}>
          <TableRow>
            <TableCell
              align="center"
              sx={{
                fontWeight: "bold",
                color: "black",
                fontSize: { xs: "0.8rem", sm: "1rem", lg: "1.2rem" },
              }}
            >
              Fecha
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: { xs: "0.8rem", sm: "1rem", lg: "1.2rem" },
              }}
            >
              Tipo de operacion
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: { xs: "0.8rem", sm: "1rem", lg: "1.2rem" },
              }}
            >
              Importe
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: { xs: "0.8rem", sm: "1rem", lg: "1.2rem" },
              }}
            >
              cuenta
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: "secondary.main" }}>
          {props.movimientos.map((movimiento) => (
            <TableRow
              key={movimiento.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                align="center"
                sx={{ fontSize: { xs: "0.7rem", sm: "0.9rem", lg: "1.1rem" } }}
              >
                {movimiento.hora.split("T")[0]}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: { xs: "0.7rem", sm: "0.9rem", lg: "1.1rem" } }}
              >
                {movimiento.tipo_operacion}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: { xs: "0.7rem", sm: "0.9rem", lg: "1.1rem" } }}
              >
                {"$" + movimiento.monto}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: { xs: "0.7rem", sm: "0.9rem", lg: "1.1rem" } }}
              >
                {` N° ${movimiento.cuenta}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ListaMovimientos;
