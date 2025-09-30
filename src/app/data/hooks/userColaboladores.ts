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
  const [livres, setLivres] = useState<Premio[]>([])

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

  async function sortear(tipo: string, empresa: string, premio: string, supervisor: number) {

    let id: number = 0,
      nome: string = "",
      min: number = 1,
      max: number = 0,
      random: number = 0,
      icont: number = 0;

    const colabs = colaboradores.filter((item) => {
      if (item.empresa == empresa) {
        if (Array.isArray(item.premios) && item.premios.length > 0) {
          const premioZ = item.premios.find(item => item.premioId === parseInt(premio));
          if (premioZ) {
            return item;
          }
        } else {
          return item;
        }
      }
    });

    max = colabs.length - 1,
    random = Math.floor(Math.random() * (+max - +min) + +min),

    setGanhador(<Colaborador>{});
    colabs.map((colaborador: Colaborador) => {
      if (icont == random) {
        nome = colaborador.nome;
        id = colaborador.id;
        console.log(colaborador);
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
      const livres = await Backend.premios.livres().then();
      setLivres(livres);
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
