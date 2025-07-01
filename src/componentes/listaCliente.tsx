import React, { useState } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import { Cliente } from "../modelos/types";

type Props = {
  tema: string;
  clientes: Cliente[];
  aoSelecionarDetalhe: (cliente: Cliente) => void;
  aoBuscarPorId: (id: string) => void;
};

const ListaClienteFunc: React.FC<Props> = ({
  tema,
  clientes,
  aoSelecionarDetalhe,
  aoBuscarPorId,
}) => {
  const [idBusca, setIdBusca] = useState("");
  const estilo = `collection-item ${tema}`;

  const buscar = () => {
    if (!idBusca.trim()) {
      M.toast({ html: "Digite um ID para buscar." });
      return;
    }

    console.log("Buscando ID:", idBusca);
    aoBuscarPorId(idBusca.trim());
    setIdBusca("");
  };

  return (
    <div className="container">
      <h5 className="center-align">Lista de Clientes</h5>

      {/* Campo de busca por ID */}
      <div className="row">
        <div className="input-field col s10">
          <input
            type="text"
            placeholder="Buscar cliente por ID"
            value={idBusca}
            onChange={(e) => setIdBusca(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") buscar();
            }}
          />
        </div>
        <div className="col s2">
          <button
            className="btn waves-effect waves-light"
            onClick={buscar}
            disabled={!idBusca.trim()}
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="collection z-depth-1">
        {clientes.length === 0 ? (
          <div className={`${estilo} white-text`}>
            Nenhum cliente cadastrado.
          </div>
        ) : (
          clientes.map((c) => (
            <div
              key={c.id ?? `${c.nome}-${c.sobreNome}`}
              className={`${estilo} white-text`}
            >
              <div className="row" style={{ marginBottom: 0 }}>
                <div className="col s10">
                  <strong>{c.nome} {c.sobreNome}</strong><br />
                  <small>ID: {c.id ?? "N/A"}</small><br />
                  Email: {c.email ?? "N/A"}
                </div>
                <div className="col s2 right-align">
                  <button
                    className="btn-small green"
                    onClick={() => aoSelecionarDetalhe(c)}
                  >
                    <i className="material-icons">visibility</i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListaClienteFunc;
