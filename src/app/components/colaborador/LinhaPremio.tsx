import { ColaboradorPremio } from '@/core/model/ColaboradorPremio'
import { IconTrash } from '@tabler/icons-react'

export interface LinhaPremioProps {
    colaboradorPremio: ColaboradorPremio
    onClick?: (colaboradorPremio: ColaboradorPremio) => void
}

export default function LinhaPremio(props: LinhaPremioProps) {

    return (
        <div
            className="flex bg-green-900 items-center gap-5 p-4 rounded-md">
            <div className="flex flex-col">
                <span className="text-xl font-black">{props.colaboradorPremio.premio?.nome}</span>
                <div className="flex flex-row items-end gap-3"></div>
            </div>
            <div className="flex flex-col">
                <button onClick={() => props.onClick?.(props.colaboradorPremio)}>
                    <IconTrash />
                </button>
            </div>
        </div>
    )
}
