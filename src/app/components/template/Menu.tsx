import { IconHome, IconUser, IconTool, IconTools, IconReport } from '@tabler/icons-react'
import MenuItem from './MenuItem'

export default function Menu() {
    return (
        <aside className="w-52 bg-zinc-900 h-screen">
            <nav className="flex flex-col gap-1 py-7">
                <MenuItem icone={IconHome} texto="Início" url="/" />
                <MenuItem icone={IconUser} texto="Colaboradores" url="/colaboradores" />
                <MenuItem icone={IconTool} texto="Sorteio" url="/sorteio" />
                <MenuItem icone={IconTools} texto="Upload" url="/upload" />
                <MenuItem icone={IconReport} texto="Resumo" url="/report" />
                <MenuItem icone={IconReport} texto="Prêmio" url="/premios" />
                <MenuItem icone={IconReport} texto="Empresa" url="/empresas" />
            </nav>
        </aside>
    )
}
