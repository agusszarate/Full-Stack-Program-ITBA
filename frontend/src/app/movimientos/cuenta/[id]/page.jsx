import data from "@/info.json";
import ListaMovimientos from "@/components/ListaMovimientos";
import { CardActionArea, Card, CardContent } from "@mui/material";
import InfoCuenta from "@/components/InfoCuenta";
import { cookies } from "next/headers";

export default async function movsCuenta({ params }) {
  const id = params.id;

  const cookieStore = cookies();

  const authToken = cookieStore.get("credentials")?.value;

  let response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/movimientos/`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  let responseCuentas = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/cuentas/`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  let movimientos = response.filter((mov) => mov.cuenta == id);

  let cuenta = responseCuentas.find((cu) => cu.id == id);

  return (
    <>
      <Card sx={{ width: "100%" }}>
        <CardActionArea>
          <CardContent>
            <InfoCuenta cuenta={cuenta} checked={false} />
          </CardContent>
        </CardActionArea>
      </Card>
      <ListaMovimientos movimientos={movimientos} />
    </>
  );
}
