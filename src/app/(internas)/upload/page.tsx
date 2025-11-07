"use client";

import { IconTools, IconToolsOff } from "@tabler/icons-react";
import Pagina from "@/app/components/template/Pagina";
import Titulo from "@/app/components/template/Titulo";
import useColaboladores from "@/app/data/hooks/userColaboladores";
import { useEffect, useState } from "react";
import UploadForm from "@/app/components/upload/FormularioUpload";
import * as XLSX from "xlsx";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Colaborador } from "@/core/model/Colaborador";
import ImportForm from "@/app/components/upload/FormularioImport";

interface ExcelData {
  empresa: string;
  matricula: string;
  nome: string;
  setor: string;
  funcao: string;
  colaborador: string;
}

interface ExcelDataIn {
  id: number;
  empresa: string;
  matricula: string;
  nome: string;
  setor: string;
  funcao: string;
  colaborador: string;
}

export default function Page() {
  const { upload, importar, colabs, setColabs, sizeColabs, getMensagem } =
    useColaboladores();

  const [array, setArray] = useState<ExcelDataIn[]>([]);
  const [_, setData] = useState<ExcelData[]>([]);

  const loadDataOnlyOnce = () => {
    setColabs([]);
  };

  useEffect(() => {
    loadDataOnlyOnce();
  }, []);

  function isNumber(value: string) {
    return typeof value === "number";
  }

  const processExcel = async (file: File) => {
    var colabsx: Partial<Colaborador>[] = [];
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet) as ExcelData[];
    setArray([]);
    setColabs([]);
    var icont = 0;
    jsonData.map((item) => {
      console.log(item);
      const ditem = {
        ...item,
        id: icont,
      };
      setArray((array) => [...array, ditem]);
      let colab: Partial<Colaborador> = {
        empresa: item.empresa,
        matricula: "" + item.matricula,
        supervisor:
          item.colaborador === "S"
            ? 1
            : item.colaborador === "C"
            ? 1
            : item.colaborador === "G"
            ? 1
            : 0,
        nome: item.nome,
        data: "",
        funcao: item.funcao,
        setor: item.setor,
        situacao: item.colaborador,
      };
      colabsx = [...colabsx, colab];
      icont += 1;
    });
    setData(jsonData);
    if (colabsx.length > 0) {
      setColabs(colabsx as Colaborador[]);
      upload(colabsx);
    }
  };

  return (
    <Pagina className="flex flex-col gap-10">
      <Titulo
        icone={IconTools}
        principal="Upload"
        segundario="Festa SL Alimentos 2025"
      />
      <>
        <div className="container">
          <div className="float-left">
            <UploadForm onFileUpload={processExcel} />
          </div>
          <div className="float-right">
            {sizeColabs() > 0 && <ImportForm fnImport={importar} />}
            {getMensagem()}
          </div>
        </div>
        {array.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Matricula</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Funcao</TableHead>
                <TableHead>Colaborador</TableHead>
                <TableHead>Supervisor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {array.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{row.empresa}</TableCell>
                  <TableCell>{row.matricula}</TableCell>
                  <TableCell>{row.nome}</TableCell>
                  <TableCell>{row.setor}</TableCell>
                  <TableCell>{row.funcao}</TableCell>
                  <TableCell>{row.colaborador}</TableCell>
                  <TableCell>
                    {row.colaborador === "S"
                      ? 1
                      : row.colaborador === "C"
                      ? 1
                      : row.colaborador === "G"
                      ? 1
                      : 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </>
    </Pagina>
  );
}
