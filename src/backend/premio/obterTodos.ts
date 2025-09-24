'use server'
import RepositorioPremio from './RepositorioPremio'

export default async function obterTodos() {
    return RepositorioPremio.obterTodos()
}
