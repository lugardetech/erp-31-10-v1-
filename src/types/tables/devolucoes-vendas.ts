export type DevolucoesVendas = {
  Row: {
    id: number
    motivo: string
    produto_id: number | null
    quantidade: number
    status_id: number | null
    venda_id: number | null
  }
  Insert: {
    id?: number
    motivo: string
    produto_id?: number | null
    quantidade: number
    status_id?: number | null
    venda_id?: number | null
  }
  Update: {
    id?: number
    motivo?: string
    produto_id?: number | null
    quantidade?: number
    status_id?: number | null
    venda_id?: number | null
  }
  Relationships: []
}
