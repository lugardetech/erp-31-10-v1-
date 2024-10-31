export type Compras = {
  Row: {
    cartao_credito_id: number | null
    conta_bancaria_id: number | null
    data: string
    data_atualizacao: string | null
    data_criacao: string | null
    fornecedor_id: number | null
    id: number
    imposto_nacional: number | null
    metodo_pagamento: string
    outros_gastos: number | null
    status_id: number | null
    status_pedido_id: number | null
    tipo_imposto_id: number | null
    valor: number
  }
  Insert: {
    cartao_credito_id?: number | null
    conta_bancaria_id?: number | null
    data: string
    data_atualizacao?: string | null
    data_criacao?: string | null
    fornecedor_id?: number | null
    id?: number
    imposto_nacional?: number | null
    metodo_pagamento: string
    outros_gastos?: number | null
    status_id?: number | null
    status_pedido_id?: number | null
    tipo_imposto_id?: number | null
    valor: number
  }
  Update: {
    cartao_credito_id?: number | null
    conta_bancaria_id?: number | null
    data?: string
    data_atualizacao?: string | null
    data_criacao?: string | null
    fornecedor_id?: number | null
    id?: number
    imposto_nacional?: number | null
    metodo_pagamento?: string
    outros_gastos?: number | null
    status_id?: number | null
    status_pedido_id?: number | null
    tipo_imposto_id?: number | null
    valor?: number
  }
  Relationships: [
    {
      foreignKeyName: "compras_cartao_credito_id_fkey"
      columns: ["cartao_credito_id"]
      isOneToOne: false
      referencedRelation: "cartao_credito"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "compras_conta_bancaria_id_fkey"
      columns: ["conta_bancaria_id"]
      isOneToOne: false
      referencedRelation: "contas_bancarias"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "compras_fornecedor_id_fkey"
      columns: ["fornecedor_id"]
      isOneToOne: false
      referencedRelation: "fornecedores"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "compras_tipo_imposto_id_fkey"
      columns: ["tipo_imposto_id"]
      isOneToOne: false
      referencedRelation: "tipos_impostos"
      referencedColumns: ["id"]
    }
  ]
}
