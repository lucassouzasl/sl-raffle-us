import { ColaboradorPremio } from "./ColaboradorPremio"

export interface ColaboradorTmp {
    id: number
    empresa: string
    tipo: number
    flag: number
    supervisor: number
    nome: string
    funcao: string
    setor: string
    matricula: string
    situacao: string
    data: string
    observacao: string
    premio: string
    createdAt: Date
    updatedAt: Date
    published: boolean,
    premios: ColaboradorPremio[]
}
