import { ColaboradorPremio } from '@/core/model/ColaboradorPremio'
import { IconTrash } from '@tabler/icons-react'

export interface LinhaColaboradorProps {
    colaboradorPremio: ColaboradorPremio
    onClick?: (colaboradorPremio: ColaboradorPremio) => void
    onHandleClickDelete: (id: number) => void
}

export default function LinhaColaborador(props: LinhaColaboradorProps) {

    const handleClick = () => {
        props.onClick?.(props.colaboradorPremio);
        props.onHandleClickDelete(props.colaboradorPremio.id);
    }

    return (
        <div
            className="flex bg-green-900 items-center gap-5 p-4 rounded-md">
            <div className="flex flex-col">
                <span className="text-xl font-black">{props.colaboradorPremio.colaborador?.nome}</span>
                <div className="flex flex-row items-end gap-3"></div>
            </div>
            <div className="flex flex-col">
                <button onClick={() => handleClick()}>
                    <IconTrash />
                </button>
            </div>
        </div>
    )
}
