export type MetodosPagamento = {
  Row: {
    descricao: string
    id: number
  }
  Insert: {
    descricao: string
    id?: number
  }
  Update: {
    descricao?: string
    id?: number
  }
  Relationships: []
}
