'use server'
import RepositorioColaboradorPremio from './RepositorioColaboradorPremio'

export default async function excluirColaboradorPremio(id: number) {
    return RepositorioColaboradorPremio.excluir(id)
}
