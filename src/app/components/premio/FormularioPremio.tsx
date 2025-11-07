import { Premio } from "@/core/model/Premio";
import { ColaboradorPremio } from "@/core/model/ColaboradorPremio";
import InputTexto from "../shared/InputTexto";
import { IconTrash } from "@tabler/icons-react";
import MyReusableSelect from "@/app/components/shared/MyReusableSelect";
import ListaColaborador from "@/app/components/premio/ListaColaborador";
import { useState } from "react";
import { Empresa } from "@/core/model/Empresa";

export interface FormularioPremioProps {
  registro: Partial<Premio>;
  empresas: Empresa[];
  onChange: (registro: Partial<Premio>) => void;
  criar: () => void;
  salvar: () => void;
  cancelar: () => void;
  excluir: () => void;
  excluirColaborador: (colaboradorPremio: ColaboradorPremio) => void;
}

export default function FormalarioPremio(props: FormularioPremioProps) {
  const [colabP, setColabP] = useState<ColaboradorPremio[]>(
    props.registro.ColaboradorPremio || []
  );

  const [empresa, setEmpresa] = useState(props.registro.empresa);

  const empresas_tmp = props.empresas.map((item) => ({
    value: item.empresa,
    label: item.nome,
  }));

  const handleClickDelete = (id: number) => {
    setColabP(colabP?.filter((x) => x.id != id));
  };

  const handleEmpresa = (newValue: string) => {
    setEmpresa(newValue);
    props.onChange?.({ ...props.registro, empresa: newValue });
  };

  return (
    <div className="flex flex-col gap-5">
      <InputTexto
        label="Nome"
        type="text"
        value={props.registro.nome}
        onChange={(e) =>
          props.onChange?.({ ...props.registro, nome: e.target.value })
        }
      />
      <InputTexto
        label="Observação"
        type="text"
        value={props.registro.observacao}
        onChange={(e) =>
          props.onChange?.({ ...props.registro, observacao: e.target.value })
        }
      />
      <InputTexto
        label="Imagem (ID do Google Drive)"
        type="text"
        value={props.registro.imagem}
        onChange={(e) =>
          props.onChange?.({ ...props.registro, imagem: e.target.value })
        }
      />
      <InputTexto
        label="Tipo (0-Normal | 1-Extra)"
        type="number"
        value={props.registro.tipo}
        onChange={(e) =>
          props.onChange?.({
            ...props.registro,
            tipo: parseInt(e.target.value),
          })
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
      <div className="flex justify-between">
        <div className="flex gap-5">
          {props.registro.id ? (
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
        <button
          className="bg-red-500 px-4 py-2 rounded-md"
          onClick={props.excluir}
        >
          Excluir
        </button>
      </div>
      {Array.isArray(colabP) && colabP?.length > 0 && (
        <ListaColaborador
          colaboradoresPremio={colabP}
          onClick={props.excluirColaborador}
          onHandleClickDelete={handleClickDelete}
        />
      )}
    </div>
  );
}
