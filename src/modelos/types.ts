export type Cliente = {
  id?: number;
  nome: string;
  sobreNome: string;
  email: string | null;
  endereco?: Endereco;
  telefones?: Telefone[];
};

export type Endereco = {
  id?: number;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais: string;
};

export type Telefone = {
  id?: number;
  ddd: string;
  numero: string;
};

export type ClienteFormulario = {
  id?: number;
  nome: string;
  nomeSocial: string;
  genero: string;
  cpf: string;
  cpfData: string;
  rg: string;
  rgData: string;
  telefone: string;
  ddd: string;
};
