import Backend from '@/backend'
import { ColaboradorPremio } from '@/core/model/ColaboradorPremio'
import { Premio } from '@/core/model/Premio'
import { useEffect, useState } from 'react'

export default function usePremios() {
    const [premios, setPremios] = useState<Premio[]>([])
    const [livres, setLivres] = useState<Premio[]>([])
    const [premio, setPremio] = useState<Partial<Premio> | null>(null)

    useEffect(() => {
        Backend.premios.obter().then(setPremios)
        Backend.premios.livres().then(setLivres)
    }, [])

    async function salvar() {
        if (!premio) return
        delete premio.ColaboradorPremio;
        await Backend.premios.salvar(premio)
        const premios = await Backend.premios.obter()
        setPremios(premios)
        setPremio(null)
    }

    async function criar() {
        if (!premio) return;
        delete premio.ColaboradorPremio;
        await Backend.premios.criar(premio);
        const premios = await Backend.premios.obter();
        setPremios(premios);
        setPremio(null);
    }

    async function excluir() {
        if (!premio || !premio.id) return
        await Backend.premios.excluir(premio.id)
        const premios = await Backend.premios.obter()
        setPremios(premios)
        setPremio(null)
    }

    async function excluirColaborador(colaboradorPremio: ColaboradorPremio) {
        if (!colaboradorPremio || !colaboradorPremio.id) return;
        await Backend.colaboradorPremios.excluir(colaboradorPremio.id);
        const premios = await Backend.premios.obter()
        setPremios(premios)
    }

    return {
        premios,
        livres,
        premio,
        criar,
        salvar,
        excluir,
        excluirColaborador,
        cancelar: () => setPremio(null),
        alterarPremio: (premio: Partial<Premio> | null) => setPremio(premio),
        criarPremio: (premio: Partial<Premio> | null) => setPremio(premio),
    }
}
