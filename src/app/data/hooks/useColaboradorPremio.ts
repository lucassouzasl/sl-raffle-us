import Backend from '@/backend'
import { ColaboradorPremio } from '@/core/model/ColaboradorPremio'
import { useEffect, useState } from 'react'

export default function useColaboradorPremio() {

    const [colaboradorPremio, setColaboradorPremio] = useState<Partial<ColaboradorPremio> | null>(null)

    async function excluir() {
        console.log('excluir')
        if (!colaboradorPremio || !colaboradorPremio.id) return
        console.log('ok')
        await Backend.colaboradorPremios.excluir(colaboradorPremio.id)
    }

    return {
        colaboradorPremio,
        excluirPremio: (colaboradorPremio: Partial<ColaboradorPremio> | null) => {
            setColaboradorPremio(colaboradorPremio)
            excluir()
        },
    }
}
