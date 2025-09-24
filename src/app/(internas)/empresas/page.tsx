'use client'
import { IconPlus, IconUser } from '@tabler/icons-react'
import FormularioEmpresa from '@/app/components/empresa/FormularioEmpresa'
import ListaEmpresa from '@/app/components/empresa/ListaEmpresa'
import Pagina from '@/app/components/template/Pagina'
import Titulo from '@/app/components/template/Titulo'
import useEmpresas from '@/app/data/hooks/useEmpresas'

export default function Page() {

    const { empresa, empresas, salvar, excluir, alterarEmpresa } = useEmpresas()

    return (
        <Pagina className="flex flex-col gap-10">
            <Titulo icone={IconUser} principal="Empresas" segundario="Festa SL Alimentos 2024" />

            {empresa ? (
                <FormularioEmpresa
                    registro={empresa}
                    onChange={alterarEmpresa}
                    salvar={salvar}
                    cancelar={() => alterarEmpresa(null)}
                    excluir={excluir}
                />
            ) : (
                <>
                    <div className="flex justify-end">
                        <button
                            className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-md"
                            onClick={() => alterarEmpresa({})}
                        >
                            <IconPlus />
                            <span>Nova Empresa</span>
                        </button>
                    </div>
                    <ListaEmpresa registros={empresas} onClick={alterarEmpresa} />
                </>
            )}
        </Pagina>
    )
}
