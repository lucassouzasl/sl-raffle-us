import { Empresa } from '@/core/model/Empresa'
import LinhaEmpresa from './LinhaEmpresa'

export interface ListaEmpresaProps {
    registros: Empresa[]
    onClick?: (registro: Empresa) => void
}

export default function ListaEmpresa(props: ListaEmpresaProps) {

    return (
        <div className="flex flex-col gap-4">
            {props.registros.map((registro: Empresa) => {
                return <LinhaEmpresa key={registro.id} registro={registro} onClick={props.onClick} />
            })}
        </div>
    )

}
