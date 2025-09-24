import { Empresa } from '@/core/model/Empresa'
import { PrismaClient } from '@prisma/client'

export default class RepositorioEmpresa {
    private static db: PrismaClient = new PrismaClient()

    static async salvar(empresa: Empresa): Promise<Empresa> {
        return await this.db.empresa.upsert({
            where: { id: empresa.id },
            update: empresa,
            create: empresa,
        })
    }

    static async obterTodas(): Promise<Empresa[]> {
        return await this.db.empresa.findMany()
    }

    static async obterPorId(id: number): Promise<Empresa> {
        const empresa = await this.db.empresa.findUnique({
            where: { id },
        })
        return empresa as Empresa
    }

    static async obterPorEmpresa(empresaId: string): Promise<Empresa> {
        const empresa = await this.db.empresa.findFirst({
            where: {
                empresa: empresaId
            },
        })
        return empresa as Empresa
    }

    static async excluir(id: number): Promise<void> {
        await this.db.empresa.delete({
            where: { id },
        })
    }
}
