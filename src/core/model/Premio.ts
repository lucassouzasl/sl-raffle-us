import { ColaboradorPremio } from "./ColaboradorPremio";

export interface Premio {
  id: number;
  nome: string;
  empresa: string;
  imagem: string;
  observacao: string;
  tipo: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  ColaboradorPremio?: ColaboradorPremio[];
}
