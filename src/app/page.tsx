import Image from "next/image";
import { IconGift } from "@tabler/icons-react";
import Pagina from "./components/template/Pagina";
import Titulo from "./components/template/Titulo";

export default function Home() {
  return (
    <Pagina className="flex flex-col gap-10">
      <Titulo
        icone={IconGift}
        principal="Início"
        segundario="Festa SL Alimentos 2025"
      />
    </Pagina>
  );
}
