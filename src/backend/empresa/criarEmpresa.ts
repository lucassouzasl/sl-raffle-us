'use server'

import { Empresa } from '@/core/model/Empresa'
import RepositorioEmpresa from './RepositorioEmpresa'

export default async function criarEmpresa(registro: Partial<Empresa>) {
    const novaEmpresa = {
        ...registro
    }

    return RepositorioEmpresa.criar(novaEmpresa as Empresa)
}
