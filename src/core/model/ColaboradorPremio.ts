
export interface ColaboradorPremio {
    id: number
    colaboradorId: number
    premioId: number
    nome: string
    observacao: string
    tipo: number
    createdAt: Date
    updatedAt: Date
    published: boolean
}