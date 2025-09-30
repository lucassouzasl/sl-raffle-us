import { Premio } from '@/core/model/Premio'
import LinhaPremio from './LinhaPremio'
import { Empresa } from '@/core/model/Empresa'

export interface ListaPremioProps {
    registros: Premio[]
    empresas: Empresa[]
    onClick?: (registro: Premio) => void
}

export default function ListaPremio(props: ListaPremioProps) {

    return (
        <div className="flex flex-col gap-4">
            {props.registros.map((registro: Premio) => {
                return <LinhaPremio key={registro.id} registro={registro} onClick={props.onClick} empresas={props.empresas} />
            })}
        </div>
    )

}
