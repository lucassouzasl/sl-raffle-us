"use client";
import { IconTool } from "@tabler/icons-react";
import Pagina from "@/app/components/template/Pagina";
import Titulo from "@/app/components/template/Titulo";
import useColaboladores from "@/app/data/hooks/userColaboladores";
import useEmpresas from "@/app/data/hooks/useEmpresas";
import usePremios from "@/app/data/hooks/usePremios";
import { useContext, useEffect, useState } from "react";
import MyReusableSelect from "@/app/components/shared/MyReusableSelect";
import { RaffleContext } from "@/contexts/raffleContext";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Page() {

  const WITHOUT_SUP = 1

  const raffle = useContext(RaffleContext);

  const [tipo, setTipo] = useState("0");
  const [empresa, setEmpresa] = useState("");
  const [premio, setPremio] = useState("");
  const [loading, setLoading] = useState(false);

  const { colaboradores, sortear, ganhador, newGanhador } = useColaboladores();

  const { empresas } = useEmpresas();

  const { premios } = usePremios();

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const colabs = colaboradores.filter((item) => {
    if (tipo == "0") {
      return item.empresa.toLowerCase().startsWith(empresa.toLowerCase()) && item.observacao == "";
    }
    return item.empresa.toLowerCase().startsWith(empresa.toLowerCase()) && item.premio == "";
  });

  const handleSorteio = async () => {
    setLoading(true);
    raffle.onChangeLoading(true);
    newGanhador();
    await delay(3000);
    sortear(tipo, empresa, premio, WITHOUT_SUP);
    setLoading(false);
    raffle.onChangeLoading(false);
  };

  const tipos = [
    { value: "0", label: "Normal" },
    { value: "1", label: "Extra" },
  ];

  const empresas_base = [
    { value: "", label: "Todas" }
  ];

  const novasEmpresas = empresas.map((item) => ({
    value: item.empresa,
    label: item.nome,
  }));

  const empresas_tmp = [...empresas_base, ...novasEmpresas];

  const premios_tmp = premios.map((item) => ({
    value: "" + item.id,
    label: item.nome,
  }));

  const trataEmpresa = (empresa: string) => {
    const resultado = empresas.find(item => item.empresa === empresa);
    const nomeEncontrado = resultado ? resultado.nome : "";
    return nomeEncontrado;
  }

  useEffect(() => {
    raffle.onChangeWinner(ganhador());
  }, [ganhador, raffle]);

  return (
    <Pagina className="flex flex-col gap-10">
      <div>
        <Titulo
          icone={IconTool}
          principal="Sorteio"
          segundario="Festa SL Alimentos 2024"
        />
        <Link href={"/raffle"} target="_blank">
          <ExternalLink size={22} />
        </Link>
      </div>
      <div className="flex flex-row justify-start">
        <div className="grid grid-flow-row auto-rows-max md:auto-rows-min">
          <div className="flex flex-col gap-10">
            <div className="mb-5">
              <MyReusableSelect
                label="Prêmio"
                value={premio}
                onChange={(newValue) => setPremio(newValue)}
                placeholder="Prêmio"
                options={premios_tmp}
              />
              {premio.length <= 0 && (
                <div className="flex flex-col gap-3">
                  <div className="text-sm text-yellow-200 ps-2 mt-2"><span>SELECIONE UM PRÊMIO!</span></div>
                </div>
              )}
            </div>
            <div className="mb-5">
              <MyReusableSelect
                label="Tipo"
                value={tipo}
                onChange={(newValue: string) => setTipo(newValue)}
                placeholder="Tipo"
                options={tipos}
              />
            </div>
            <div className="mt-5">
              <MyReusableSelect
                label="Empresa"
                value={empresa}
                onChange={(newValue) => setEmpresa(newValue)}
                placeholder="Grupo"
                options={empresas_tmp}
              />
            </div>
            {colabs.length > 0 && premio.length > 0 && (
              <div className="flex flex-col gap-3">
                <button
                  className={`flex items-center gap-2 bg-gray-500 ${loading ? "opacity-80 cursor-wait" : ""
                    } px-4 py-2 rounded-md`}
                  disabled={loading}
                  onClick={() => handleSorteio()}
                >
                  <span>Sortear</span>
                </button>
                <div className="text-sm ps-2"><span>Faltam {colabs.length}</span></div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full justify-items-center pt-20">
          <div className="flex flex-row">
            {ganhador() && (
              <div className="flex items-center justify-center">
                <div className="flex bg-zinc-900 items-center gap-5 p-4 rounded-md cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-xl font-black">{ganhador().nome}</span>
                    <span className="text-sm text-zinc-400">{ganhador().funcao}</span>
                    <span className="text-sm text-zinc-400">{trataEmpresa(ganhador().empresa)}</span>
                  </div>
                </div>
              </div>
            )}
            {loading && (
              <div role="status" className="flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="w-32 h-32 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Pagina>
  );
}
