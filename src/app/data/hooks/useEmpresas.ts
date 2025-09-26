import Backend from '@/backend'
import { Empresa } from '@/core/model/Empresa'
import { ValueLabel } from '@/core/model/ValueLabel'
import { useEffect, useState } from 'react'

export default function useEmpresas() {
    const [empresas, setEmpresas] = useState<Empresa[]>([])
    const [empresa, setEmpresa] = useState<Partial<Empresa> | null>(null)

    useEffect(() => {
        Backend.empresas.obter().then(setEmpresas)
    }, [])

    async function salvar() {
        if (!empresa) return
        await Backend.empresas.salvar(empresa)
        const empresas = await Backend.empresas.obter()
        setEmpresas(empresas)
        setEmpresa(null)
    }

    async function criar() {
        if (!empresa) return;
        await Backend.empresas.criar(empresa);
        const empresas = await Backend.empresas.obter();
        setEmpresas(empresas);
        setEmpresa(null);
    }

    async function excluir() {
        if (!empresa || !empresa.id) return
        await Backend.empresas.excluir(empresa.id)
        const empresas = await Backend.empresas.obter()
        setEmpresas(empresas)
        setEmpresa(null)
    }

    return {
        empresas,
        empresa,
        criar,
        salvar,
        excluir,
        cancelar: () => setEmpresa(null),
        alterarEmpresa: (empresa: Partial<Empresa> | null) => setEmpresa(empresa),
        criarEmpresa: (empresa: Partial<Empresa> | null) => setEmpresa(empresa),
    }
}
