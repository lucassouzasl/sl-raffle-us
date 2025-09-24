import { Empresa } from '@/core/model/Empresa'

export interface LinhaEmpresaProps {
    registro: Empresa
    onClick?: (registro: Empresa) => void
}

export default function LinhaEmpresa(props: LinhaEmpresaProps) {
    return (
        <div
            className="flex bg-zinc-900 items-center gap-5 p-4 rounded-md cursor-pointer"
            onClick={() => props.onClick?.(props.registro)}
        >
            <div className="flex flex-col">
                <span className="text-xl font-black">{props.registro.nome}</span>
                <span className="text-sm text-zinc-400">{props.registro.empresa}</span>
            </div>
        </div>
    )
}
