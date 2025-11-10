"use server";
import RepositorioColaboradorPremio from "./RepositorioColaboradorPremio";

export default async function excluirColaboradorPremioPorId(id: number) {
  return RepositorioColaboradorPremio.excluirPorId(id);
}
