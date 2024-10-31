export type AjustesEstoque = {
  Row: {
    data_ajuste: string | null
    id: number
    motivo: string
    produto_id: number | null
    quantidade_ajuste: number
    usuario_responsavel: string | null
  }
  Insert: {
    data_ajuste?: string | null
    id?: number
    motivo: string
    produto_id?: number | null
    quantidade_ajuste: number
    usuario_responsavel?: string | null
  }
  Update: {
    data_ajuste?: string | null
    id?: number
    motivo?: string
    produto_id?: number | null
    quantidade_ajuste?: number
    usuario_responsavel?: string | null
  }
  Relationships: []
}
