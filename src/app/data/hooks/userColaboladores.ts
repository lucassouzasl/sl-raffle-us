import Backend from "@/backend";
import { Resumo } from "@/core/model/Resumo";
import { Colaborador } from "@/core/model/Colaborador";
import { useEffect, useState } from "react";

export default function useColaboradores() {

  const [mensagem, setMensagem] = useState<String>("");
  const [icont, setIcont] = useState<number>(0);
  const [ganhador, setGanhador] = useState<Colaborador>(<Colaborador>{});
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [ganhadores, setGanhadores] = useState<Colaborador[]>([]);
  const [ganhadoresE, setGanhadoresE] = useState<Colaborador[]>([]);
  const [resumo, setResumo] = useState<Resumo[]>([]);
  const [resumoE, setResumoE] = useState<Resumo[]>([]);
  const [colaborador, setColaborador] = useState<Partial<Colaborador> | null>(
    null
  );
  const [selecionados, setSelecionados] = useState<Partial<Colaborador>[]>([]);
  const [colabs, setColabs] = useState<Partial<Colaborador>[]>([]);

  useEffect(() => {
    Backend.colaboladores.obter().then(setColaboradores);
    Backend.colaboladores.ganhadores().then(setGanhadores);
    Backend.colaboladores.premioExtra().then(setGanhadoresE);
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
    const winnersE = await Backend.colaboladores.premioExtra().then();
    setGanhadoresE(winnersE);
  }

  async function sortear(tipo: string, empresa: string, premio: string, supervisor: number) {

    let id: number = 0,
      nome: string = "",
      min: number = 1,
      max: number = 0,
      random: number = 0,
      icont: number = 0;

    const colabs = colaboradores.filter((item) => {
      if (supervisor == 0) {
        if (tipo == "0") {
          return item.empresa.toLowerCase().startsWith(empresa.toLowerCase()) && item.observacao == "" && item.supervisor == 0;
        }
        return item.empresa.toLowerCase().startsWith(empresa.toLowerCase()) && item.premio == "" && item.supervisor == 0;
      } else {
        if (tipo == "0") {
          return item.empresa.toLowerCase().startsWith(empresa.toLowerCase()) && item.observacao == "";
        }
        return item.empresa.toLowerCase().startsWith(empresa.toLowerCase()) && item.premio == "";
      }
    });

    max = colabs.length - 1,
      random = Math.floor(Math.random() * (+max - +min) + +min),

      setGanhador(<Colaborador>{});
    colabs.map((colaborador: Colaborador) => {
      if (icont == random) {
        nome = colaborador.nome;
        id = colaborador.id;
        console.log(colaborador)
        setGanhador(colaborador);
      }
      icont += 1;
    });

    if (icont > 0) {
      if (tipo == "0") {
        //await Backend.colaboladores.salvar({ id: id, observacao: "GANHOU" });
        await Backend.colaboradorPremios.criar({ colaboradorId: id, premioId: parseInt(premio) })
      } else {
        //await Backend.colaboladores.salvar({ id: id, premio: "EXTRA" });
        await Backend.colaboradorPremios.criar({ colaboradorId: id, premioId: parseInt(premio) })
      }
      const colaboradores = await Backend.colaboladores.obter();
      setColaboradores(colaboradores);
      setColaborador(null);
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

  async function excluirTodos() {
    await Backend.colaboladores.excluirTodos();
    const colaboradores = await Backend.colaboladores.obter();
    setColaboradores(colaboradores);
    setColaborador(null);
  }

  return {
    colaboradores,
    colaborador,
    ganhadores,
    ganhadoresE,
    colabs,
    resumo,
    resumoE,
    setColabs,
    sizeColabs: () => {
      return colabs.length;
    },
    setMensagem,
    salvar,
    criar,
    excluir,
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
