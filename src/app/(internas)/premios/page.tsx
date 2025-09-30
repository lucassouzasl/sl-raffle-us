'use client'
import { IconPlus, IconUser } from '@tabler/icons-react'
import FormularioPremio from '@/app/components/premio/FormularioPremio'
import ListaPremio from '@/app/components/premio/ListaPremio'
import Pagina from '@/app/components/template/Pagina'
import Titulo from '@/app/components/template/Titulo'
import usePremios from '@/app/data/hooks/usePremios'
import useEmpresas from '@/app/data/hooks/useEmpresas'

export default function Page() {

    const { premio, premios, criar, salvar, excluir, excluirColaborador, alterarPremio } = usePremios()

    const { empresas } = useEmpresas();
    
    return (
        <Pagina className="flex flex-col gap-10">
            <Titulo icone={IconUser} principal="Prêmios" segundario="Festa SL Alimentos 2025" />

            {premio ? (
                <FormularioPremio
                    registro={premio}
                    empresas={empresas}
                    onChange={alterarPremio}
                    salvar={salvar}
                    criar={criar}
                    cancelar={() => alterarPremio(null)}
                    excluir={excluir}
                    excluirColaborador={excluirColaborador}
                />
            ) : (
                <>
                    <div className="flex justify-end">
                        <button
                            className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-md"
                            onClick={() => alterarPremio({})}
                        >
                            <IconPlus />
                            <span>Novo Premio</span>
                        </button>
                    </div>
                    <ListaPremio registros={premios} onClick={alterarPremio} empresas={empresas} />
                </>
            )}
        </Pagina>
    )
}
