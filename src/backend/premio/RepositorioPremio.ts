import { Premio } from '@/core/model/Premio'
import { PrismaClient } from '@prisma/client'

export default class RepositorioPremio {
    private static db: PrismaClient = new PrismaClient()

    static async salvar(premio: Premio): Promise<Premio> {
        return await this.db.premio.upsert({
            where: { id: premio.id },
            update: premio,
            create: premio,
        })
    }

    static async criar(registro: Premio): Promise<Premio> {
        return await this.db.premio.create({ data: registro });
    }

    static async obterTodos(): Promise<Premio[]> {
        return await this.db.premio.findMany()
    }

    static async obterPorId(id: number): Promise<Premio> {
        const premio = await this.db.premio.findUnique({
            where: { id },
        })
        return premio as Premio
    }

    static async excluir(id: number): Promise<void> {
        await this.db.premio.delete({
            where: { id },
        })
    }
}
