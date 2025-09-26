'use server'

import { ColaboradorPremio } from '@/core/model/ColaboradorPremio'
import RepositorioColaboradorPremio from './RepositorioColaboradorPremio'

export default async function criarColaboradorPremio(registro: Partial<ColaboradorPremio>) {
    const novoColaboradorPremio = {
        ...registro
    }

    return RepositorioColaboradorPremio.criar(novoColaboradorPremio as ColaboradorPremio)
}
