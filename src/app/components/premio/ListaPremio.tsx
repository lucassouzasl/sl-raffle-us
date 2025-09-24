import { Premio } from '@/core/model/Premio'
import LinhaPremio from './LinhaPremio'

export interface ListaPremioProps {
    registros: Premio[]
    onClick?: (registro: Premio) => void
}

export default function ListaPremio(props: ListaPremioProps) {

    return (
        <div className="flex flex-col gap-4">
            {props.registros.map((registro: Premio) => {
                return <LinhaPremio key={registro.id} registro={registro} onClick={props.onClick} />
            })}
        </div>
    )

}
