'use client'
import { IconPlus, IconUser } from '@tabler/icons-react'
import FormularioColaborador from '@/app/components/colaborador/FormularioColaborador'
import ListaColaborador from '@/app/components/colaborador/ListaColaborador'
import Pagina from '@/app/components/template/Pagina'
import Titulo from '@/app/components/template/Titulo'
import useColaboladores from '@/app/data/hooks/userColaboladores'
import { useState } from 'react'
import InputTexto from '@/app/components/shared/InputTexto'

export default function Page() {

    const [busca, setBusca] = useState('')

    const { colaborador, colaboradores, salvar, criar, excluir, criarColaborador, alterarColaborador } = useColaboladores()

    const colabs = colaboradores.filter((item) => {
        return item.nome.toLowerCase().includes(busca.toLowerCase()) || item.observacao.toLowerCase().startsWith(busca.toLowerCase()) || item.premio.toLowerCase().startsWith(busca.toLowerCase())
    });

    return (
        <Pagina className="flex flex-col gap-10">
            <Titulo icone={IconUser} principal="Colaboradores" segundario="Festa SL Alimentos 2024" />

            {colaborador ? (
                <FormularioColaborador
                    colaborador={colaborador}
                    onChange={alterarColaborador}
                    salvar={salvar}
                    criar={criar}
                    cancelar={() => alterarColaborador(null)}
                    excluir={excluir}
                />
            ) : (
                <>
                    <div className="flex justify-end">
                        <button
                            className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-md"
                            onClick={() => criarColaborador({})}
                        >
                            <IconPlus />
                            <span>Novo Colaborador</span>
                        </button>
                    </div>
                    <InputTexto
                        label="Buscar"
                        type="text"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                    <ListaColaborador colaboradores={colabs} onClick={alterarColaborador} />
                </>
            )}
        </Pagina>
    )
}
