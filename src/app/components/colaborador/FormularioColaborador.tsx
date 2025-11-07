import { Colaborador } from "@/core/model/Colaborador";
import { ColaboradorPremio } from "@/core/model/ColaboradorPremio";
import InputTexto from "../shared/InputTexto";
import ReusableCheck from "../shared/ReusableCheck";
import { IconTrash } from "@tabler/icons-react";
import ListaPremio from "@/app/components/colaborador/ListaPremio";
import MyReusableSelect from "@/app/components/shared/MyReusableSelect";
import { useState } from "react";
import { Empresa } from "@/core/model/Empresa";

export interface FormularioColaboradorProps {
  colaborador: Partial<Colaborador>;
  empresas: Empresa[];
  onChange: (colaborador: Partial<Colaborador>) => void;
  salvar: () => void;
  criar: () => void;
  cancelar: () => void;
  excluir: () => void;
  excluirPremio: (colaboradorPremio: ColaboradorPremio) => void;
}

export default function FormularioColaborador(
  props: FormularioColaboradorProps
) {
  const [colabP, setColabP] = useState<ColaboradorPremio[]>(
    props.colaborador.premios || []
  );

  const [empresa, setEmpresa] = useState(props.colaborador.empresa);

  const empresas_tmp = props.empresas.map((item) => ({
    value: item.empresa,
    label: item.nome,
  }));

  const handleClick = () => {
    props.onChange?.({ ...props.colaborador, observacao: "" });
  };
  const handleClickPremio = () => {
    props.onChange?.({ ...props.colaborador, premio: "" });
  };
  const handleClickDelete = (id: number) => {
    setColabP(colabP?.filter((x) => x.id != id));
  };
  const handleEmpresa = (newValue: string) => {
    setEmpresa(newValue);
    props.onChange?.({ ...props.colaborador, empresa: newValue });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-5">
        <InputTexto
          label="Nome"
          type="text"
          value={props.colaborador.nome}
          onChange={(e) =>
            props.onChange?.({ ...props.colaborador, nome: e.target.value })
          }
        />
        <InputTexto
          label="Telefone"
          type="text"
          required
          placeholder="(99) 99999-9999"
          value={props.colaborador.telefone}
          onChange={(e) =>
            props.onChange?.({ ...props.colaborador, telefone: e.target.value })
          }
        />
        <div>
          <MyReusableSelect
            label="Empresa"
            value={empresa!}
            onChange={(newValue) => handleEmpresa(newValue)}
            placeholder="Selecionar"
            options={empresas_tmp}
          />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-5">
        <InputTexto
          label="Função"
          type="text"
          value={props.colaborador.funcao}
          onChange={(e) =>
            props.onChange?.({ ...props.colaborador, funcao: e.target.value })
          }
        />
        <InputTexto
          label="Setor"
          type="text"
          value={props.colaborador.setor}
          onChange={(e) =>
            props.onChange?.({ ...props.colaborador, setor: e.target.value })
          }
        />
        <InputTexto
          label="Matricula"
          type="text"
          value={props.colaborador.matricula}
          onChange={(e) =>
            props.onChange?.({
              ...props.colaborador,
              matricula: e.target.value,
            })
          }
        />
        <InputTexto
          label="Situação"
          type="text"
          value={props.colaborador.situacao}
          onChange={(e) =>
            props.onChange?.({ ...props.colaborador, situacao: e.target.value })
          }
        />
        <InputTexto
          label="Data"
          type="text"
          value={props.colaborador.data}
          onChange={(e) =>
            props.onChange?.({ ...props.colaborador, data: e.target.value })
          }
        />
      </div>
      <div className="grid grid-cols-3 gap-5">
        <ReusableCheck
          label="Tipo"
          type="checkbox"
          checked={props.colaborador.tipo == 1 ? true : false}
          onChange={(e) =>
            props.onChange?.({
              ...props.colaborador,
              tipo: e.target.checked == true ? 1 : 0,
            })
          }
        />
        <ReusableCheck
          label="Flag"
          type="checkbox"
          checked={props.colaborador.flag == 1 ? true : false}
          onChange={(e) =>
            props.onChange?.({
              ...props.colaborador,
              flag: e.target.checked == true ? 1 : 0,
            })
          }
        />
        <ReusableCheck
          label="Supervisor"
          type="checkbox"
          checked={props.colaborador.supervisor == 1 ? true : false}
          onChange={(e) =>
            props.onChange?.({
              ...props.colaborador,
              supervisor: e.target.checked == true ? 1 : 0,
            })
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <InputTexto
            label="Observação"
            type="text"
            value={props.colaborador.observacao}
            onChange={(e) =>
              props.onChange?.({
                ...props.colaborador,
                observacao: e.target.value,
              })
            }
          />
          <button onClick={handleClick}>
            <IconTrash />
          </button>
        </div>
        <div>
          <InputTexto
            label="Premio"
            type="text"
            value={props.colaborador.premio}
            onChange={(e) =>
              props.onChange?.({ ...props.colaborador, premio: e.target.value })
            }
          />
          <button onClick={handleClickPremio}>
            <IconTrash />
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-5">
          {props.colaborador.id ? (
            <button
              className="bg-blue-500 px-4 py-2 rounded-md"
              onClick={props.salvar}
            >
              Salvar
            </button>
          ) : (
            <button
              className="bg-red-500 px-4 py-2 rounded-md"
              onClick={props.criar}
            >
              Criar
            </button>
          )}
          <button
            className="bg-zinc-500 px-4 py-2 rounded-md"
            onClick={props.cancelar}
          >
            Cancelar
          </button>
        </div>
        {props.colaborador.id ? (
          <button
            className="bg-red-500 px-4 py-2 rounded-md"
            onClick={props.excluir}
          >
            Excluir
          </button>
        ) : (
          ""
        )}
      </div>
      {Array.isArray(colabP) && colabP?.length > 0 && (
        <ListaPremio
          colaboradoresPremio={colabP}
          onClick={props.excluirPremio}
          onHandleClickDelete={handleClickDelete}
        />
      )}
    </div>
  );
}
