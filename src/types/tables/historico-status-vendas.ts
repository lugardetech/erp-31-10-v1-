export type HistoricoStatusVendas = {
  Row: {
    data_alteracao: string | null
    id: number
    observacao: string | null
    status: string
    usuario_responsavel: string | null
    venda_id: number | null
  }
  Insert: {
    data_alteracao?: string | null
    id?: number
    observacao?: string | null
    status: string
    usuario_responsavel?: string | null
    venda_id?: number | null
  }
  Update: {
    data_alteracao?: string | null
    id?: number
    observacao?: string | null
    status?: string
    usuario_responsavel?: string | null
    venda_id?: number | null
  }
  Relationships: []
}
