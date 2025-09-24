'use server'
import RepositorioEmpresa from './RepositorioEmpresa'

export default async function excluirEmpresa(id: number) {
    return RepositorioEmpresa.excluir(id)
}
