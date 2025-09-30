import { Premio } from '@/core/model/Premio'
import { PrismaClient } from '@prisma/client'

export default class RepositorioPremio {
    private static db: PrismaClient = new PrismaClient()

    static async salvar(premio: Premio): Promise<Premio> {
        const { ColaboradorPremio, ...premioData } = premio;
        return await this.db.premio.upsert({
            where: { id: premio.id },
            update: premioData,
            create: premioData,
        })
    }

    static async criar(registro: Premio): Promise<Premio> {
        const { ColaboradorPremio, ...premioData } = registro;
        return await this.db.premio.create({ data: premioData });
    }

    static async obterTodos(): Promise<Premio[]> {
        return await this.db.premio.findMany({
            include: {
                ColaboradorPremio: {
                    include: {
                        colaborador: true,
                    },
                },
            },
        })
    }

    static async obterLivres(): Promise<Premio[]> {
        return await this.db.premio.findMany({
            include: {
                ColaboradorPremio: {
                    include: {
                        colaborador: true,
                    },
                },
            },
            where: {
                OR: [
                    {
                        ColaboradorPremio: { none: {} },        
                    },
                    {
                        tipo: 1
                    }
                ]
            },
        })
    }

    static async obterPorId(id: number): Promise<Premio> {
        const premio = await this.db.premio.findUnique({
            include: {
                ColaboradorPremio: {
                    include: {
                        colaborador: true,
                    },
                },
            },
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
