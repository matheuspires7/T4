import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import { Cliente } from "../modelos/types";

type Props = {
  tema: string;
  cliente: Cliente;
  aoVoltar: () => void;
  aoEditar: (cliente: Cliente) => void;
  aoExcluir: (cliente: Cliente) => void;
};

const DetalheCliente: React.FC<Props> = ({
  tema,
  cliente,
  aoVoltar,
  aoEditar,
  aoExcluir,
}) => {
  return (
    <div className="container">
      <h5 className="center-align">Detalhes do Cliente</h5>
      <div className={`card ${tema} white-text z-depth-2`}>
        <div className="card-content">
          <p>
            <strong>Nome:</strong> {cliente.nome} {cliente.sobreNome}
          </p>
          <p>
            <strong>Email:</strong> {cliente.email || "N/A"}
          </p>

          <hr style={{ margin: "15px 0" }} />

          <h6>Endereço</h6>
          {cliente.endereco ? (
            <>
              <p>
                <strong>Rua:</strong> {cliente.endereco.rua}, {cliente.endereco.numero}
              </p>
              <p>
                <strong>Bairro:</strong> {cliente.endereco.bairro}
              </p>
              <p>
                <strong>Cidade/Estado:</strong> {cliente.endereco.cidade} - {cliente.endereco.estado}
              </p>
              <p>
                <strong>CEP:</strong> {cliente.endereco.codigoPostal}
              </p>
              <p>
                <strong>Complemento:</strong> {cliente.endereco.informacoesAdicionais}
              </p>
            </>
          ) : (
            <p>Endereço não informado</p>
          )}

          <hr style={{ margin: "15px 0" }} />

          <h6>Telefones</h6>
          {cliente.telefones && cliente.telefones.length > 0 ? (
            cliente.telefones.map((tel, index) => (
              <p key={index}>
                <strong>Telefone:</strong> ({tel.ddd}) {tel.numero}
              </p>
            ))
          ) : (
            <p>Sem telefone cadastrado</p>
          )}
        </div>
        <div className="card-action">
          <button className="btn white black-text" onClick={aoVoltar}>
            Voltar
          </button>
          <button className="btn blue black-text right" onClick={() => aoEditar(cliente)}>
            Editar
          </button>
          <button
            className="btn red black-text right"
            style={{ marginRight: "10px" }}
            onClick={() => aoExcluir(cliente)}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalheCliente;
