'use server'

import { Premio } from '@/core/model/Premio'
import Id from '@/core/utils/Id'
import RepositorioPremio from './RepositorioPremio'

export default async function salvarUsuario(premio: Partial<Premio>) {
    const novoPremio = {
        ...premio
    }

    return RepositorioPremio.salvar(novoPremio as Premio)
}
