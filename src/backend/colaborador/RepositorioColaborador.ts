import { Colaborador } from "@/core/model/Colaborador";
import { Resumo } from "@/core/model/Resumo";
import { PrismaClient } from "@prisma/client";

export default class RepositorioColaborador {
  private static db: PrismaClient = new PrismaClient();

  static async salvar(colaborador: Colaborador): Promise<Colaborador> {
    const { premios, ...colaboradorData } = colaborador;
    return await this.db.colaborador.upsert({
      where: { id: colaborador.id },
      update: colaboradorData,
      create: colaboradorData,
    });
  }

  static async criar(colaborador: Colaborador): Promise<Colaborador> {
    const { premios, ...colaboradorData } = colaborador;
    return await this.db.colaborador.create({ data: colaboradorData });
  }

  static async criarVarios(colabs: Partial<Colaborador>[]): Promise<String> {
    try {
      await this.db.colaborador.deleteMany();
      await this.db
        .$queryRaw`UPDATE sqlite_sequence SET seq=0 WHERE name="Colaborador"`;
      await this.db.colaborador.createMany({ data: colabs });
    } catch (e) {
      console.error(e);
      return "Erro ao tentar criar colaboradores!!";
    } finally {
      return colabs.length + " colaboradores inseridos no banco de dados!!";
    }
  }

  static async todosColaboradores(): Promise<Colaborador[]> {
    return await this.db.colaborador.findMany({
      include: {
        premios: {
          include: {
            premio: true,
          },
        },
      },
    });
  }

  static async todosNaoGanhadores(): Promise<Colaborador[]> {
    return await this.db.colaborador.findMany({
      include: {
        premios: {
          include: {
            premio: true,
          },
        },
      },
      where: {
        premios: { none: {} },
      },
    });
  }

  static async todosGanhadores(): Promise<Colaborador[]> {
    return await this.db.colaborador.findMany({
      include: {
        premios: {
          include: {
            premio: true,
          },
        },
      },
      where: {
        premios: { some: {} },
      },
    });
  }

  static async todosPremioExtra(): Promise<Colaborador[]> {
    return await this.db.colaborador.findMany({
      include: {
        premios: {
          include: {
            premio: true,
          },
        },
      },

      where: {
        premio: "EXTRA",
      },
    });
  }

  static async resumoGanhou(): Promise<Resumo[]> {
    const retorno = await this.db.colaborador.groupBy({
      by: ["empresa"],
      where: {
        premios: { some: {} },
      },
      _count: {
        empresa: true,
      },
      orderBy: {
        empresa: "asc",
      },
    });
    return retorno;
  }

  static async resumoExtra(): Promise<Resumo[]> {
    const retorno = await this.db.colaborador.groupBy({
      by: ["empresa"],
      where: {
        premio: {
          contains: "EXTRA",
        },
      },
      _count: {
        empresa: true,
      },
      orderBy: {
        empresa: "asc",
      },
    });
    return retorno;
  }

  static async obterPorId(id: number): Promise<Colaborador> {
    const colaborador = await this.db.colaborador.findUnique({
      where: { id },
    });
    return colaborador as Colaborador;
  }

  static async excluir(id: number): Promise<void> {
    await this.db.colaborador.delete({
      where: { id },
    });
  }

  static async removeAllColaboradores(): Promise<void> {
    await this.db.colaborador.deleteMany({});
  }
}
