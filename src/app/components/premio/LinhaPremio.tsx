import { Empresa } from '@/core/model/Empresa'
import { Premio } from '@/core/model/Premio'

export interface LinhaPremioProps {
    registro: Premio
    empresas: Empresa[]
    onClick?: (registro: Premio) => void
}

export default function LinhaPremio(props: LinhaPremioProps) {

    const trataPremio = (tipo: number) => {
        if (tipo === 0) {
            return "Normal"
        }
        if (tipo === 1) {
            return "Extra"
        }
        return ""
    }

    const trataEmpresa = (empresa: string) => {
        const resultado = props.empresas?.find(item => item.empresa === empresa);
        const nomeEncontrado = resultado ? resultado.nome : "";
        return nomeEncontrado;
    }    

    return (
        <div
            className="flex bg-zinc-900 items-center gap-5 p-4 rounded-md cursor-pointer"
            onClick={() => props.onClick?.(props.registro)}
        >
            <div className="flex flex-col">
                <span className="text-xl font-black">{props.registro.nome}</span>
                <span className="mr-2 text-sm text-green-400 font-bold">{trataEmpresa(props.registro.empresa)}</span>
                <div className="flex flex-row gap-3">
                    {Array.isArray(props.registro.ColaboradorPremio) && props.registro.ColaboradorPremio?.length > 0 && (
                        <span className="text-sm text-blue-500 font-bold text-">{props.registro.ColaboradorPremio?.length}&nbsp;colaborador(es)</span>
                    )}
                </div>
                {props.registro.tipo == 0 ? 
                    <div><span className="mr-2 text-sm text-orange-400 font-bold">{trataPremio(props.registro.tipo)}</span></div>
                : 
                    <div><span className="mr-2 text-sm text-pink-400 font-bold">{trataPremio(props.registro.tipo)}</span></div>
                }
            </div>
        </div>
    )
}
