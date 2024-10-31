export type Transportadoras = {
  Row: {
    contato: string | null
    id: number
    nome: string
    telefone: string | null
  }
  Insert: {
    contato?: string | null
    id?: number
    nome: string
    telefone?: string | null
  }
  Update: {
    contato?: string | null
    id?: number
    nome?: string
    telefone?: string | null
  }
  Relationships: []
}
