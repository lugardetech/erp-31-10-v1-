export type Fornecedores = {
  Row: {
    contato: string | null
    email: string | null
    endereco: string | null
    id: number
    nome: string
    telefone: string | null
  }
  Insert: {
    contato?: string | null
    email?: string | null
    endereco?: string | null
    id?: number
    nome: string
    telefone?: string | null
  }
  Update: {
    contato?: string | null
    email?: string | null
    endereco?: string | null
    id?: number
    nome?: string
    telefone?: string | null
  }
  Relationships: []
}
