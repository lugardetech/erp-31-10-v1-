export type ContasPagar = {
  Row: {
    compra_id: number | null
    data_pagamento: string | null
    data_vencimento: string
    fornecedor_id: number | null
    id: number
    metodo_pagamento_id: number | null
    status_id: number | null
    valor: number
  }
  Insert: {
    compra_id?: number | null
    data_pagamento?: string | null
    data_vencimento: string
    fornecedor_id?: number | null
    id?: number
    metodo_pagamento_id?: number | null
    status_id?: number | null
    valor: number
  }
  Update: {
    compra_id?: number | null
    data_pagamento?: string | null
    data_vencimento?: string
    fornecedor_id?: number | null
    id?: number
    metodo_pagamento_id?: number | null
    status_id?: number | null
    valor?: number
  }
  Relationships: [
    {
      foreignKeyName: "contas_pagar_compra_id_fkey"
      columns: ["compra_id"]
      isOneToOne: false
      referencedRelation: "compras"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "contas_pagar_fornecedor_id_fkey"
      columns: ["fornecedor_id"]
      isOneToOne: false
      referencedRelation: "fornecedores"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "contas_pagar_metodo_pagamento_id_fkey"
      columns: ["metodo_pagamento_id"]
      isOneToOne: false
      referencedRelation: "metodos_pagamento"
      referencedColumns: ["id"]
    }
  ]
}
