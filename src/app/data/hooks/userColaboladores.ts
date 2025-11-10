import Backend from "@/backend";
import { Resumo } from "@/core/model/Resumo";
import { Colaborador } from "@/core/model/Colaborador";
import { ColaboradorPremio } from "@/core/model/ColaboradorPremio";
import { useEffect, useState } from "react";
import { Premio } from "@/core/model/Premio";

export default function useColaboradores() {
  const [mensagem, setMensagem] = useState<String>("");
  const [icont, setIcont] = useState<number>(0);
  const [ganhador, setGanhador] = useState<Colaborador>(<Colaborador>{});
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [ganhadores, setGanhadores] = useState<Colaborador[]>([]);
  const [nganhadores, setNGanhadores] = useState<Colaborador[]>([]);
  const [resumo, setResumo] = useState<Resumo[]>([]);
  const [resumoE, setResumoE] = useState<Resumo[]>([]);
  const [colaborador, setColaborador] = useState<Partial<Colaborador> | null>(
    null
  );
  const [selecionados, setSelecionados] = useState<Partial<Colaborador>[]>([]);
  const [colabs, setColabs] = useState<Colaborador[]>([]);
  const [livres, setLivres] = useState<Premio[]>([]);

  useEffect(() => {
    Backend.colaboladores.obter().then(setColaboradores);
    Backend.colaboladores.ganhadores().then(setGanhadores);
    Backend.colaboladores.naoGanhadores().then(setNGanhadores);
    Backend.premios.livres().then(setLivres);
  }, []);

  async function salvar() {
    if (!colaborador) return;
    //colaborador.premios = [];
    delete colaborador.premios;
    await Backend.colaboladores.salvar(colaborador);
    const colaboradores = await Backend.colaboladores.obter();
    setColaboradores(colaboradores);
    setColaborador(null);
  }

  async function getResumoGanhou() {
    const retorno = await Backend.colaboladores.resumoGanhou();
    setResumo(retorno);
  }

  async function getResumoExtra() {
    const retorno = await Backend.colaboladores.resumoExtra();
    setResumoE(retorno);
  }

  async function getColaboradores() {
    const retorno = await Backend.colaboladores.obter();
    setColaboradores(retorno);
    const winners = await Backend.colaboladores.ganhadores().then();
    setGanhadores(winners);
    const nwinners = await Backend.colaboladores.naoGanhadores().then();
    setNGanhadores(nwinners);
    const livres = await Backend.premios.livres().then();
    setLivres(livres);
  }

  async function sortear(
    tipo: string, // atualmente não muda o fluxo
    empresa: string,
    premio: string,
    supervisor: number // atualmente não usado
  ) {
    try {
      const premioId = Number(premio);

      const elegiveis = colaboradores.filter(
        (c: Colaborador) =>
          c.empresa === empresa &&
          (!Array.isArray(c.premios) ||
            c.premios.length === 0 ||
            !c.premios.some((p) => p.premioId === premioId))
      );

      if (elegiveis.length === 0) {
        setGanhador({} as Colaborador);
        console.warn("Nenhum colaborador elegível para este prêmio.");
        return;
      }

      const idx = Math.floor(Math.random() * elegiveis.length);
      const vencedor = elegiveis[idx];

      setGanhador(vencedor);

      await Backend.colaboradorPremios.criar({
        colaboradorId: vencedor.id,
        premioId,
      });

      const listaColabs = await Backend.colaboladores.obter();
      setColaboradores(listaColabs);
      setColaborador(null);

      const livres = await Backend.premios.livres();
      setLivres(livres);
    } catch (err) {
      console.error("Erro no sorteio:", err);
    }
  }

  async function upload(colaboradores: Partial<Colaborador>[]) {
    setMensagem("");
    setSelecionados(colaboradores);
  }

  async function importar() {
    setMensagem("");
    if (selecionados.length > 0) {
      var mensagem: String = "";
      mensagem = await Backend.colaboladores.criarVarios(selecionados);
      setMensagem(mensagem);
    }
    const colaboradores = await Backend.colaboladores.obter();
    setColaboradores(colaboradores);
    setColaborador(null);
    setSelecionados([]);
  }

  async function criar() {
    if (!colaborador) return;
    delete colaborador.premios;
    await Backend.colaboladores.criar(colaborador);
    const colaboradores = await Backend.colaboladores.obter();
    setColaboradores(colaboradores);
    setColaborador(null);
  }

  async function excluir() {
    if (!colaborador || !colaborador.id) return;
    await Backend.colaboladores.excluir(colaborador.id);
    const colaboradores = await Backend.colaboladores.obter();
    setColaboradores(colaboradores);
    setColaborador(null);
  }

  async function excluirPremio(colaboradorPremio: ColaboradorPremio) {
    if (!colaboradorPremio || !colaboradorPremio.id) return;
    await Backend.colaboradorPremios.excluir(colaboradorPremio.id);
    const colaboradores = await Backend.colaboladores.obter();
    setColaboradores(colaboradores);
  }

  async function excluirTodos() {
    await Backend.colaboladores.excluirTodos();
    const colaboradores = await Backend.colaboladores.obter();
    setColaboradores(colaboradores);
    setColaborador(null);
  }

  async function getLivres() {
    const result = await Backend.premios.livres();
    setLivres(result);
  }

  return {
    colaboradores,
    colaborador,
    ganhadores,
    nganhadores,
    colabs,
    resumo,
    resumoE,
    livres,
    setColabs,
    sizeColabs: () => {
      return colabs.length;
    },
    setMensagem,
    salvar,
    criar,
    excluir,
    excluirPremio,
    excluirTodos,
    sortear,
    importar,
    upload,
    getColaboradores,
    getMensagem: () => {
      return mensagem;
    },
    getContador: () => {
      return icont;
    },
    setContador: (i: number) => setIcont(i),
    cancelar: () => setColaborador(null),
    ganhador: () => {
      return ganhador;
    },
    getLivres,
    newGanhador: () => {
      setGanhador(<Colaborador>{});
    },
    getResumoGanhou,
    getResumoExtra,
    criarColaborador: (colaborador: Partial<Colaborador> | null) =>
      setColaborador(colaborador),
    alterarColaborador: (colaborador: Partial<Colaborador> | null) =>
      setColaborador(colaborador),
  };
}
