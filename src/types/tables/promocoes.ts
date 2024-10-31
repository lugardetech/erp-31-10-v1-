export type Promocoes = {
  Row: {
    ativo: boolean | null
    data_fim: string
    data_inicio: string
    id: number
    produto_id: number | null
    valor_desconto: number | null
  }
  Insert: {
    ativo?: boolean | null
    data_fim: string
    data_inicio: string
    id?: number
    produto_id?: number | null
    valor_desconto?: number | null
  }
  Update: {
    ativo?: boolean | null
    data_fim?: string
    data_inicio?: string
    id?: number
    produto_id?: number | null
    valor_desconto?: number | null
  }
  Relationships: []
}
