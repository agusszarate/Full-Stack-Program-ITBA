import data from "@/info.json";
import ListaMovimientos from "@/components/ListaMovimientos";
import { CardActionArea, Card, CardContent } from "@mui/material";
import Credito from "@/components/Credito";
import Link from "next/link";

export default function movsCuenta({ params }) {
  const id = params.id;
  let movimientos = [];
  let tarjeta;
  data.tarjetas.credito.forEach((tar) => {
    if (tar.id === id) {
      tarjeta = tar;
    }
  });
  data.movimientos.forEach((mov) => {
    if (mov.cuenta === id && mov.tipo === "tarjeta") {
      movimientos.push(mov);
    }
  });
  movimientos = movimientos.sort((a, b) => {
    if (a.fecha > b.fecha) {
      return -1;
    }
  });

  return (
    <>
      <Card>
        <CardActionArea>
          <CardContent>
            <Credito tarjeta={tarjeta} />
          </CardContent>
        </CardActionArea>
      </Card>
      <ListaMovimientos movimientos={movimientos} />
    </>
  );
}
