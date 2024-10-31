export type HistoricoPrecos = {
  Row: {
    data_alteracao: string | null
    id: number
    preco_anterior: number
    preco_novo: number
    produto_id: number | null
    usuario_responsavel: string | null
  }
  Insert: {
    data_alteracao?: string | null
    id?: number
    preco_anterior: number
    preco_novo: number
    produto_id?: number | null
    usuario_responsavel?: string | null
  }
  Update: {
    data_alteracao?: string | null
    id?: number
    preco_anterior?: number
    preco_novo?: number
    produto_id?: number | null
    usuario_responsavel?: string | null
  }
  Relationships: []
}
