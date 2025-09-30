'use server'
import RepositorioPremio from './RepositorioPremio'

export default async function obterLivres() {
    return RepositorioPremio.obterLivres()
}
