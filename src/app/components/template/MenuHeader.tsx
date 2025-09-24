import { IconHome, IconUser, IconTool, IconTools, IconReport } from '@tabler/icons-react'
import MenuHeaderItem from './MenuHeaderItem'

export default function MenuHeader() {
    return (
        <aside className="bg-zinc-900">
            <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
                <nav>
                    <ul className="lg:flex items-center gap-5 justify-between text-base text-gray-700 pt-4 lg:pt-0">
                        <li><MenuHeaderItem icone={IconHome} texto="Início" url="/" /></li>
                        <li><MenuHeaderItem icone={IconUser} texto="Colaboradores" url="/colaboradores" /></li>
                        <li><MenuHeaderItem icone={IconTool} texto="Sorteio" url="/sorteio" /></li>
                        <li><MenuHeaderItem icone={IconTools} texto="Upload" url="/upload" /></li>
                        <li><MenuHeaderItem icone={IconReport} texto="Resumo" url="/resumo" /></li>
                        <li><MenuHeaderItem icone={IconReport} texto="Prêmio" url="/premios" /></li>
                        <li><MenuHeaderItem icone={IconReport} texto="Empresa" url="/empresas" /></li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}
