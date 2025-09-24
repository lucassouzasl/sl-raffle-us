import { Empresa } from '@/core/model/Empresa'
import InputTexto from '../shared/InputTexto'

export interface FormularioEmpresaProps {
    registro: Partial<Empresa>
    onChange: (registro: Partial<Empresa>) => void
    salvar: () => void
    cancelar: () => void
    excluir: () => void
}

export default function FormalarioEmpresa(props: FormularioEmpresaProps) {
    return (
        <div className="flex flex-col gap-5">
            <InputTexto
                label="Nome"
                type="text"
                value={props.registro.nome}
                onChange={(e) => props.onChange?.({ ...props.registro, nome: e.target.value })}
            />
            <InputTexto
                label="Empresa"
                type="text"
                value={props.registro.empresa}
                onChange={(e) => props.onChange?.({ ...props.registro, empresa: e.target.value })}
            />
            <InputTexto
                label="Observação"
                type="text"
                value={props.registro.observacao}
                onChange={(e) => props.onChange?.({ ...props.registro, observacao: e.target.value })}
            />
            <div className="flex justify-between">
                <div className="flex gap-5">
                    <button className="bg-blue-500 px-4 py-2 rounded-md" onClick={props.salvar}>
                        Salvar
                    </button>
                    <button className="bg-zinc-500 px-4 py-2 rounded-md" onClick={props.cancelar}>
                        Cancelar
                    </button>
                </div>
                <button className="bg-red-500 px-4 py-2 rounded-md" onClick={props.excluir}>
                    Excluir
                </button>
            </div>
        </div>
    )
}
