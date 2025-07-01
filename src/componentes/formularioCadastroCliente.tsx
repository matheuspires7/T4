import React, { useState, useEffect, FormEvent } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import { Cliente, ClienteFormulario } from "../modelos/types";
import { enviarCadastro, atualizarCadastro } from "../services/api";

type Props = {
  tema: string;
  aoCadastrar?: () => void;
  cliente?: Cliente;
};

const FormularioCadastroClienteFunc: React.FC<Props> = ({
  tema,
  aoCadastrar,
  cliente,
}) => {
  const [formData, setFormData] = useState<ClienteFormulario>({
    nome: "",
    nomeSocial: "",
    genero: "M",
    cpf: "",
    cpfData: "",
    rg: "",
    rgData: "",
    telefone: "",
    ddd: "",
  });

  const botaoClasse = `btn waves-effect waves-light ${tema}`;

  useEffect(() => {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }, []);

  useEffect(() => {
    setFormData({
      nome: cliente?.nome || "",
      nomeSocial: cliente?.sobreNome || "",
      genero: "M",
      cpf: "",
      cpfData: "",
      rg: "",
      rgData: "",
      telefone: cliente?.telefones?.[0]?.numero || "",
      ddd: cliente?.telefones?.[0]?.ddd || "",
    });
  }, [cliente]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload: Cliente = {
      id: cliente?.id,
      nome: formData.nome,
      sobreNome: formData.nomeSocial,
      email: null,
      endereco: {
        estado: "SP",
        cidade: "São Paulo",
        bairro: "Centro",
        rua: "Rua Exemplo",
        numero: "123",
        codigoPostal: "00000-000",
        informacoesAdicionais: "Cadastro via formulário React",
      },
      telefones: [
        {
          ddd: formData.ddd,
          numero: formData.telefone,
        },
      ],
    };

    try {
      if (cliente) {
        await atualizarCadastro(payload);
        M.toast({ html: "Cliente atualizado com sucesso!" });
      } else {
        await enviarCadastro(payload);
        M.toast({ html: "Cliente cadastrado com sucesso!" });
      }

      if (aoCadastrar) aoCadastrar();

      if (!cliente) {
        setFormData({
          nome: "",
          nomeSocial: "",
          genero: "M",
          cpf: "",
          cpfData: "",
          rg: "",
          rgData: "",
          telefone: "",
          ddd: "",
        });
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      M.toast({ html: "Erro ao salvar cliente!" });
    }
  };

  return (
    <div className="container">
      <h5 className="center-align">
        {cliente ? "Editar Cliente" : "Cadastro de Cliente"}
      </h5>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-field col s6">
            <input
              name="nome"
              id="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              required
            />
            <label htmlFor="nome" className={formData.nome ? "active" : ""}>
              Nome *
            </label>
          </div>
          <div className="input-field col s6">
            <input
              name="nomeSocial"
              id="nomeSocial"
              type="text"
              value={formData.nomeSocial}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="nomeSocial"
              className={formData.nomeSocial ? "active" : ""}
            >
              Sobrenome *
            </label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="browser-default"
            >
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
            <label className="active">Gênero</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
            <input
              name="cpf"
              id="cpf"
              type="text"
              value={formData.cpf}
              onChange={handleChange}
            />
            <label htmlFor="cpf" className={formData.cpf ? "active" : ""}>
              CPF
            </label>
          </div>
          <div className="input-field col s6">
            <input
              name="cpfData"
              id="cpfData"
              type="date"
              value={formData.cpfData}
              onChange={handleChange}
            />
            <label
              htmlFor="cpfData"
              className={formData.cpfData ? "active" : ""}
            >
              Data de emissão do CPF
            </label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
            <input
              name="rg"
              id="rg"
              type="text"
              value={formData.rg}
              onChange={handleChange}
            />
            <label htmlFor="rg" className={formData.rg ? "active" : ""}>
              RG
            </label>
          </div>
          <div className="input-field col s6">
            <input
              name="rgData"
              id="rgData"
              type="date"
              value={formData.rgData}
              onChange={handleChange}
            />
            <label htmlFor="rgData" className={formData.rgData ? "active" : ""}>
              Data de emissão do RG
            </label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s4">
            <input
              name="ddd"
              id="ddd"
              type="text"
              value={formData.ddd}
              onChange={handleChange}
            />
            <label htmlFor="ddd" className={formData.ddd ? "active" : ""}>
              DDD
            </label>
          </div>
          <div className="input-field col s8">
            <input
              name="telefone"
              id="telefone"
              type="text"
              value={formData.telefone}
              onChange={handleChange}
            />
            <label
              htmlFor="telefone"
              className={formData.telefone ? "active" : ""}
            >
              Telefone
            </label>
          </div>
        </div>

        <div className="row center-align">
          <button className={botaoClasse} type="submit">
            {cliente ? "Atualizar" : "Cadastrar"}
            <i className="material-icons right">
              {cliente ? "edit" : "person_add"}
            </i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioCadastroClienteFunc;
