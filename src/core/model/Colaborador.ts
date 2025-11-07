import { ColaboradorPremio } from "./ColaboradorPremio";

export interface Colaborador {
  id: number;
  empresa: string;
  tipo: number;
  flag: number;
  supervisor: number;
  nome: string;
  funcao: string;
  setor: string;
  matricula: string;
  situacao: string;
  data: string;
  observacao: string;
  premio: string;
  telefone: string;
  confirmedIn: Date | null;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  premios?: ColaboradorPremio[];
}
