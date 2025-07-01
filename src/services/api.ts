import axios from "axios";
import { Cliente } from "../modelos/types";

export interface CadastroData {
  nome: string;
  cpf: string;
}

const api = axios.create({
  baseURL: "http://localhost:32832",
  headers: {
    "Content-Type": "application/json",
  },
});

// Cadastrar novo cliente
export const enviarCadastro = async (dados: Cliente) => {
  const response = await api.post("/cliente/cadastrar", dados);
  return response.data;
};

// Atualizar cliente existente
export const atualizarCadastro = async (dados: Cliente) => {
  const response = await api.put("/cliente/atualizar", dados);
  return response.status;
};

// Excluir cliente
export const excluirCadastro = async (id: number) => {
  const response = await api.delete("/cliente/excluir", {
    data: { id },
  });
  return response.status;
};

// Buscar todos os clientes
export const consultarCadastros = async () => {
  try {
    const response = await api.get("/clientes", {
      validateStatus: (status) => status === 200 || status === 302,
      maxRedirects: 5,
    });

    if (response.status === 302 && response.headers.location) {
      const redirected = await api.get(response.headers.location);
      return redirected.data;
    }

    return response.data;
  } catch (error) {
    console.error("Erro ao consultar cadastros:", error);
    throw error;
  }
};


// Buscar cliente por ID
export const buscarClientePorId = async (id: string) => {
  const response = await api.get(`/cliente/${id}`, {
    validateStatus: (status) => status === 200 || status === 302
  });

  if (response.status === 302 && response.headers.location) {
    const redirected = await api.get(response.headers.location);
    return redirected.data;
  }

  return response.data;
};
