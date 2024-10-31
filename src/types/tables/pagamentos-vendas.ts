export type PagamentosVendas = {
  Row: {
    data_pagamento: string
    id: number
    metodo_pagamento_id: number | null
    status_pagamento_id: number | null
    valor_pagamento: number
    venda_id: string | null
  }
  Insert: {
    data_pagamento: string
    id?: number
    metodo_pagamento_id?: number | null
    status_pagamento_id?: number | null
    valor_pagamento: number
    venda_id?: string | null
  }
  Update: {
    data_pagamento?: string
    id?: number
    metodo_pagamento_id?: number | null
    status_pagamento_id?: number | null
    valor_pagamento?: number
    venda_id?: string | null
  }
  Relationships: [
    {
      foreignKeyName: "pagamentos_vendas_metodo_pagamento_id_fkey"
      columns: ["metodo_pagamento_id"]
      isOneToOne: false
      referencedRelation: "metodos_pagamento"
      referencedColumns: ["id"]
    }
  ]
}
