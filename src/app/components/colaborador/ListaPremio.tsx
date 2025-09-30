import { ColaboradorPremio } from '@/core/model/ColaboradorPremio'
import LinhaPremio from './LinhaPremio'

export interface ListaPremioProps {
    colaboradoresPremio: ColaboradorPremio[]
    onClick?: (colaboradorPremio: ColaboradorPremio) => void
    onHandleClickDelete: (id: number) => void
}

export default function ListaPremio(props: ListaPremioProps) {

    return (
        <div className="flex flex-col gap-4">
            <span className="text-lg font-black">Prêmio(s)</span>
            {props.colaboradoresPremio.map((colaboradorP: ColaboradorPremio) => {
                return <LinhaPremio key={colaboradorP.id} colaboradorPremio={colaboradorP} onClick={props.onClick} onHandleClickDelete={props.onHandleClickDelete} />
            })}
        </div>
    )

}
