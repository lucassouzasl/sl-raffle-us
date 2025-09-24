'use server'

import { Premio } from '@/core/model/Premio'
import RepositorioPremio from './RepositorioPremio'

export default async function criarPremio(registro: Partial<Premio>) {
    const novoPremio = {
        ...registro
    }

    return RepositorioPremio.criar(novoPremio as Premio)
}
