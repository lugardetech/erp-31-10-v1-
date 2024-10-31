export type MovimentacoesEstoque = {
  Row: {
    data_movimentacao: string | null
    id: number
    produto_id: number | null
    quantidade: number
    tipo_movimentacao: string
  }
  Insert: {
    data_movimentacao?: string | null
    id?: number
    produto_id?: number | null
    quantidade: number
    tipo_movimentacao: string
  }
  Update: {
    data_movimentacao?: string | null
    id?: number
    produto_id?: number | null
    quantidade?: number
    tipo_movimentacao?: string
  }
  Relationships: []
}
