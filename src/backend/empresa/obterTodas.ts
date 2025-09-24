'use server'
import RepositorioEmpresa from './RepositorioEmpresa'

export default async function obterTodas() {
    return RepositorioEmpresa.obterTodas()
}
