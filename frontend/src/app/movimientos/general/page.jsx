import data from "@/info.json";
import ListaMovimientos from "@/components/ListaMovimientos";
import { cookies } from "next/headers";

export default async function General() {
  const cookieStore = cookies();

  const authToken = cookieStore.get("credentials")?.value;

  let movimientos = await fetch(
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
  return <ListaMovimientos movimientos={movimientos} />;
}
