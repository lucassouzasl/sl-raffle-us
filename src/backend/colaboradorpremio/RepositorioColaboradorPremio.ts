import { ColaboradorPremio } from '@/core/model/ColaboradorPremio'
import { PrismaClient } from '@prisma/client'

export default class RepositorioEmpresa {
    private static db: PrismaClient = new PrismaClient()

    static async salvar(registro: ColaboradorPremio): Promise<ColaboradorPremio> {
        return await this.db.colaboradorPremio.upsert({
            where: { id: registro.id },
            update: registro,
            create: registro,
        })
    }

    static async criar(registro: ColaboradorPremio): Promise<ColaboradorPremio> {
        return await this.db.colaboradorPremio.create({ data: registro });
    }

    static async obterTodos(): Promise<ColaboradorPremio[]> {
        return await this.db.colaboradorPremio.findMany()
    }

    static async obterPorId(id: number): Promise<ColaboradorPremio> {
        const registro = await this.db.colaboradorPremio.findUnique({
            where: { id },
        })
        return registro as ColaboradorPremio
    }

    static async excluir(id: number): Promise<void> {
        await this.db.colaborador.delete({
            where: { id },
        })
    }
}
