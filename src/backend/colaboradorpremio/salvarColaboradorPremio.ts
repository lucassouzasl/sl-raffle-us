'use server'

import { ColaboradorPremio } from '@/core/model/ColaboradorPremio'
import Id from '@/core/utils/Id'
import RepositorioColaboradorPremio from './RepositorioColaboradorPremio'

export default async function salvarEmpresa(colaboradorPremio: Partial<ColaboradorPremio>) {
    const novoColaboradorPremio = {
        ...colaboradorPremio,
        id: colaboradorPremio.id ?? Id.novo,
    }

    return RepositorioColaboradorPremio.salvar(novoColaboradorPremio as ColaboradorPremio)
}
