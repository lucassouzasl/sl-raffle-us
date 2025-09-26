import { Premio } from '@/core/model/Premio'
import InputTexto from '../shared/InputTexto'

export interface FormularioPremioProps {
    registro: Partial<Premio>
    onChange: (registro: Partial<Premio>) => void
    criar: () => void
    salvar: () => void
    cancelar: () => void
    excluir: () => void
}

export default function FormalarioPremio(props: FormularioPremioProps) {
    return (
        <div className="flex flex-col gap-5">
            <InputTexto
                label="Nome"
                type="text"
                value={props.registro.nome}
                onChange={(e) => props.onChange?.({ ...props.registro, nome: e.target.value })}
            />
            <InputTexto
                label="Observação"
                type="text"
                value={props.registro.observacao}
                onChange={(e) => props.onChange?.({ ...props.registro, observacao: e.target.value })}
            />
            <InputTexto
                label="Tipo"
                type="text"
                value={props.registro.tipo}
                onChange={(e) => props.onChange?.({ ...props.registro, tipo: parseInt(e.target.value) })}
            />
            <div className="flex justify-between">
                <div className="flex gap-5">
                    {props.registro.id ? (
                        <button className="bg-blue-500 px-4 py-2 rounded-md" onClick={props.salvar}>
                            Salvar
                        </button>) : (
                        <button className="bg-red-500 px-4 py-2 rounded-md" onClick={props.criar}>
                            Criar
                        </button>
                    )}
                    <button className="bg-zinc-500 px-4 py-2 rounded-md" onClick={props.cancelar}>
                        Cancelar
                    </button>
                </div >
                <button className="bg-red-500 px-4 py-2 rounded-md" onClick={props.excluir}>
                    Excluir
                </button>
            </div >
        </div >
    )
}