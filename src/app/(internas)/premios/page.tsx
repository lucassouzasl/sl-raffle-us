'use client'
import { IconPlus, IconUser } from '@tabler/icons-react'
import FormularioPremio from '@/app/components/premio/FormularioPremio'
import ListaPremio from '@/app/components/premio/ListaPremio'
import Pagina from '@/app/components/template/Pagina'
import Titulo from '@/app/components/template/Titulo'
import usePremios from '@/app/data/hooks/usePremios'

export default function Page() {

    const { premio, premios, salvar, excluir, alterarPremio } = usePremios()

    return (
        <Pagina className="flex flex-col gap-10">
            <Titulo icone={IconUser} principal="Prêmios" segundario="Festa SL Alimentos 2024" />

            {premio ? (
                <FormularioPremio
                    registro={premio}
                    onChange={alterarPremio}
                    salvar={salvar}
                    cancelar={() => alterarPremio(null)}
                    excluir={excluir}
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
                    <ListaPremio registros={premios} onClick={alterarPremio} />
                </>
            )}
        </Pagina>
    )
}
