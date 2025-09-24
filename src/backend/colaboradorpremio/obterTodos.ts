'use server'
import RepositorioColaboradorPremio from './RepositorioColaboradorPremio'

export default async function obterTodos() {
    return RepositorioColaboradorPremio.obterTodos()
}
