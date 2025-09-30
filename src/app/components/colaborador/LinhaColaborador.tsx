import { Colaborador } from '@/core/model/Colaborador'

export interface LinhaColaboradorProps {
    colaborador: Colaborador
    onClick?: (colaborador: Colaborador) => void
}

export default function LinhaColaborador(props: LinhaColaboradorProps) {

    const trataEmpresa = (empresa: string) => {
        if (empresa == "SLL") {
            return "Londrina"
        }
        if (empresa === "SLM") {
            return "Mauá"
        }
        if (empresa === "JD") {
            return "São Paulo"
        }
        if (empresa === "ND") {
            return "Nordeste"
        }
        if (empresa === "SP") {
            return "Sementes"
        }
        return ""
    }

    const trataColaborador = (supervisor: string) => {
        if (supervisor === "G") {
            return "Gerente"
        }
        if (supervisor === "S") {
            return "Supervisor"
        }
        if (supervisor === "C") {
            return "Coordenador"
        }
        return ""
    }

    return (
        <div
            className="flex bg-zinc-900 items-center gap-5 p-4 rounded-md cursor-pointer"
            onClick={() => props.onClick?.(props.colaborador)}
        >
            <div className="flex flex-col">
                <span className="text-xl font-black">{props.colaborador.nome}</span>
                <div className="flex flex-row gap-3">
                    {Array.isArray(props.colaborador.premios) && props.colaborador.premios?.length > 0 && (
                        <span className="text-sm text-green-500 font-bold text-">Ganhou&nbsp;{props.colaborador.premios?.length}&nbsp;prêmio(s)</span>
                    )}
                </div>
                <div><span className="mr-2 text-sm text-orange-200 font-bold">{trataColaborador(props.colaborador.situacao)}</span><span className="text-sm text-zinc-200 font-bold">{trataEmpresa(props.colaborador.empresa)}</span></div>
            </div>
        </div>
    )
}
