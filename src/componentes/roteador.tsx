import React, { useEffect, useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaCliente";
import FormularioCadastroClienteFunc from "./formularioCadastroCliente";
import DetalheCliente from "./detalheCliente";
import { Cliente } from "../modelos/types";
import M from "materialize-css";
import {
  consultarCadastros,
  buscarClientePorId as apiBuscarClientePorId,
  excluirCadastro,
} from "../services/api";

const RoteadorFunc: React.FC = () => {
  const tema = "blue-grey darken-4";
  const [tela, setTela] = useState("Clientes");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(
    null
  );
  const [modoEdicao, setModoEdicao] = useState(false);

  const buscarClientes = async () => {
    try {
      const dados = await consultarCadastros();
      setClientes(dados);
    } catch (error) {
      M.toast({ html: "Erro ao buscar clientes!" });
    }
  };

  const buscarClientePorId = async (id: string) => {
    try {
      const cliente = await apiBuscarClientePorId(id.trim());
      setClienteSelecionado(cliente);
      setTela("Detalhes do Cliente");
    } catch (error: any) {
      if (error.response?.status === 404) {
        M.toast({ html: `Cliente com ID ${id.trim()} não encontrado!` });
      } else {
        M.toast({ html: "Erro na busca!" });
      }
    }
  };

  const excluirCliente = async (cliente: Cliente) => {
    const confirmado = window.confirm(
      `Deseja realmente excluir ${cliente.nome}?`
    );
    if (!confirmado) return;

    if (cliente.id === undefined) {
      M.toast({ html: "ID do cliente inválido!" });
      return;
    }

    try {
      await excluirCadastro(cliente.id);
      M.toast({ html: "Cliente excluído com sucesso!" });
      buscarClientes();
      setTela("Clientes");
    } catch {
      M.toast({ html: "Erro ao excluir cliente!" });
    }
  };

  useEffect(() => {
    if (tela === "Clientes") {
      buscarClientes();
    }
  }, [tela]);

  const selecionarView = (novaTela: string, evento?: React.MouseEvent) => {
    if (evento) evento.preventDefault();
    setTela(novaTela);
    setClienteSelecionado(null);
    setModoEdicao(false);
  };

  const botoes = ["Clientes", "Cadastro de Cliente"];

  const mostrarDetalhes = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
    setTela("Detalhes do Cliente");
  };

  const voltarParaLista = () => {
    setTela("Clientes");
    setClienteSelecionado(null);
    setModoEdicao(false);
  };

  const iniciarEdicao = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
    setModoEdicao(true);
    setTela("Cadastro de Cliente");
  };

  let componente;
  switch (tela) {
    case "Clientes":
      componente = (
        <ListaCliente
          tema={tema}
          clientes={clientes}
          aoSelecionarDetalhe={mostrarDetalhes}
          aoBuscarPorId={buscarClientePorId}
        />
      );
      break;

    case "Cadastro de Cliente":
      componente = (
        <FormularioCadastroClienteFunc
          tema={tema}
          aoCadastrar={voltarParaLista}
          cliente={modoEdicao ? clienteSelecionado ?? undefined : undefined}
        />
      );
      break;

    case "Detalhes do Cliente":
      componente = clienteSelecionado ? (
        <DetalheCliente
          tema={tema}
          cliente={clienteSelecionado}
          aoVoltar={voltarParaLista}
          aoEditar={iniciarEdicao}
          aoExcluir={excluirCliente}
        />
      ) : (
        <h5 className="center-align">Cliente não selecionado</h5>
      );
      break;

    default:
      componente = <h5 className="center-align">Tela não encontrada</h5>;
  }

  return (
    <>
      <BarraNavegacao
        seletorView={selecionarView}
        tema={tema}
        botoes={botoes}
      />
      {componente}
    </>
  );
};

export default RoteadorFunc;
