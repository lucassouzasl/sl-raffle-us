import { ColaboradorPremio } from '@/core/model/ColaboradorPremio'
import LinhaColaborador from './LinhaColaborador'

export interface ListaColaboradorProps {
    colaboradoresPremio: ColaboradorPremio[]
    onClick?: (colaboradorPremio: ColaboradorPremio) => void
    onHandleClickDelete: (id: number) => void
}

export default function ListaColaborador(props: ListaColaboradorProps) {

    return (
        <div className="flex flex-col gap-4">
            <span className="text-lg font-black">Colaborador(es)</span>
            {props.colaboradoresPremio.map((colaboradorP: ColaboradorPremio) => {
                return <LinhaColaborador key={colaboradorP.id} colaboradorPremio={colaboradorP} onClick={props.onClick} onHandleClickDelete={props.onHandleClickDelete} />
            })}
        </div>
    )

}
