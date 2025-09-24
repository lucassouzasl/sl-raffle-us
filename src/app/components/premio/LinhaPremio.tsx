import { Premio } from '@/core/model/Premio'

export interface LinhaPremioProps {
    registro: Premio
    onClick?: (registro: Premio) => void
}

export default function LinhaPremio(props: LinhaPremioProps) {
    return (
        <div
            className="flex bg-zinc-900 items-center gap-5 p-4 rounded-md cursor-pointer"
            onClick={() => props.onClick?.(props.registro)}
        >
            <div className="flex flex-col">
                <span className="text-xl font-black">{props.registro.nome}</span>
                <span className="text-sm text-zinc-400">{props.registro.tipo}</span>
            </div>
        </div>
    )
}
