import { ColaboradorPremio } from "@/core/model/ColaboradorPremio";
import { PrismaClient } from "@prisma/client";

export default class RepositorioEmpresa {
  private static db: PrismaClient = new PrismaClient();

  static async salvar(registro: ColaboradorPremio): Promise<ColaboradorPremio> {
    const { colaborador, premio, ...colaboradorPData } = registro;
    return await this.db.colaboradorPremio.upsert({
      where: { id: registro.id },
      update: colaboradorPData,
      create: colaboradorPData,
    });
  }

  static async criar(registro: ColaboradorPremio): Promise<ColaboradorPremio> {
    const { colaborador, premio, ...colaboradorPData } = registro;
    return await this.db.colaboradorPremio.create({ data: colaboradorPData });
  }

  static async obterTodos(): Promise<ColaboradorPremio[]> {
    return await this.db.colaboradorPremio.findMany();
  }

  static async obterPorId(id: number): Promise<ColaboradorPremio> {
    const registro = await this.db.colaboradorPremio.findUnique({
      where: { id },
    });
    return registro as ColaboradorPremio;
  }

  static async excluir(id: number): Promise<void> {
    await this.db.colaboradorPremio.delete({
      where: { id },
    });
  }

  /**
   * @description exclui os premios do colaborador pelo id
   * @param id id do colaborador
   * @returns number
   */
  static async excluirPorId(id: number): Promise<number> {
    const result = await this.db.colaboradorPremio.deleteMany({
      where: {
        colaboradorId: id,
      },
    });

    return result.count;
  }
}
