
import salvarUsuario from './usuario/salvarUsuario'
import obterTodos from './usuario/obterTodos'
import excluirUsuario from './usuario/excluirUsuario'

import salvarColaborador from './colaborador/salvarColaborador'
import criarColaborador from './colaborador/criarColaborador'
import todosColaboradores from './colaborador/todosColaboradores'
import todosNaoGanhadores from './colaborador/todosNaoGanhadores'
import todosGanhadores from './colaborador/todosGanhadores'
import todosPremioExtra from './colaborador/todosPremioExtra'
import resumoGanhou from './colaborador/resumoGanhou'
import resumoExtra from './colaborador/resumoExtra'
import excluirColaborador from './colaborador/excluirColaborador'
import excluirColaboradores from './colaborador/excluirColaboradores'
import criarVarios from './colaborador/criarVarios'

import salvarPremio from './premio/salvarPremio'
import criarPremio from './premio/criarPremio'
import todosPremios from './premio/obterTodos'
import excluirPremio from './premio/excluirPremio'

import salvarEmpresa from './empresa/salvarEmpresa'
import criarEmpresa from './empresa/criarEmpresa'
import todasEmpresas from './empresa/obterTodas'
import excluirEmpresa from './empresa/excluirEmpresa'

import salvarColaboradorPremio from './colaboradorpremio/salvarColaboradorPremio'
import todosColaboradorPremios from './colaboradorpremio/obterTodos'
import excluirColaboradorPremio from './colaboradorpremio/excluirColaboradorPremio'

// Padrão Facade
export default class Backend {
    static readonly usuarios = {
        salvar: salvarUsuario,
        obter: obterTodos,
        excluir: excluirUsuario,
    }
    static readonly colaboladores = {
        salvar: salvarColaborador,
        salvarGanhador: salvarColaborador,
        criar: criarColaborador,
        criarVarios: criarVarios,
        obter: todosColaboradores,
        excluir: excluirColaborador,
        excluirTodos: excluirColaboradores,
        naoGanhadores: todosNaoGanhadores,
        premioExtra: todosPremioExtra,
        ganhadores: todosGanhadores,
        resumoGanhou: resumoGanhou,
        resumoExtra: resumoExtra,
    }
    static readonly premios = {
        salvar: salvarPremio,
        criar: criarPremio,
        obter: todosPremios,
        excluir: excluirPremio,
    }
    static readonly empresas = {
        salvar: salvarEmpresa,
<<<<<<< HEAD
=======
        criar: criarEmpresa,
>>>>>>> 251d87eeb5e51a5464956f91fe8761ad8764745c
        obter: todasEmpresas,
        excluir: excluirEmpresa,
    }
    static readonly colaboradorPremios = {
        salvar: salvarColaboradorPremio,
        obter: todosColaboradorPremios,
        excluir: excluirColaboradorPremio,
    }
}
