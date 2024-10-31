export type ContasReceber = {
  Row: {
    cliente_id: number | null
    data_recebimento: string | null
    data_vencimento: string
    id: number
    metodo_recebimento_id: number | null
    status_id: number | null
    valor: number
    venda_id: number | null
  }
  Insert: {
    cliente_id?: number | null
    data_recebimento?: string | null
    data_vencimento: string
    id?: number
    metodo_recebimento_id?: number | null
    status_id?: number | null
    valor: number
    venda_id?: number | null
  }
  Update: {
    cliente_id?: number | null
    data_recebimento?: string | null
    data_vencimento?: string
    id?: number
    metodo_recebimento_id?: number | null
    status_id?: number | null
    valor?: number
    venda_id?: number | null
  }
  Relationships: [
    {
      foreignKeyName: "contas_receber_cliente_id_fkey"
      columns: ["cliente_id"]
      isOneToOne: false
      referencedRelation: "clientes"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "contas_receber_metodo_recebimento_id_fkey"
      columns: ["metodo_recebimento_id"]
      isOneToOne: false
      referencedRelation: "metodos_pagamento"
      referencedColumns: ["id"]
    }
  ]
}
