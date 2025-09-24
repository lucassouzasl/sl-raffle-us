'use server'
import RepositorioPremio from './RepositorioPremio'

export default async function excluirPremio(id: number) {
    return RepositorioPremio.excluir(id)
}
