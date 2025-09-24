'use server'

import { Empresa } from '@/core/model/Empresa'
import Id from '@/core/utils/Id'
import RepositorioEmpresa from './RepositorioEmpresa'

export default async function salvarEmpresa(empresa: Partial<Empresa>) {
    const novaEmpresa = {
        ...empresa
    }

    return RepositorioEmpresa.salvar(novaEmpresa as Empresa)
}
