export type Vendas = {
  Row: {
    cliente_marketplace_id: string | null
    data_atualizacao: string | null
    data_criacao: string | null
    data_venda: string | null
    desconto: number | null
    id: number
    id_envio_mercado_livre: string | null
    id_seq: number | null
    lucro: number | null
    marketplace_id: number | null
    marketplace_order_id: string
    metodo_pagamento_id: number | null
    status_pedido: number | null
    taxa_marketplace: number | null
    valor_frete: number | null
    valor_total: number
  }
  Insert: {
    cliente_marketplace_id?: string | null
    data_atualizacao?: string | null
    data_criacao?: string | null
    data_venda?: string | null
    desconto?: number | null
    id: number
    id_envio_mercado_livre?: string | null
    id_seq?: number | null
    lucro?: number | null
    marketplace_id?: number | null
    marketplace_order_id: string
    metodo_pagamento_id?: number | null
    status_pedido?: number | null
    taxa_marketplace?: number | null
    valor_frete?: number | null
    valor_total: number
  }
  Update: {
    cliente_marketplace_id?: string | null
    data_atualizacao?: string | null
    data_criacao?: string | null
    data_venda?: string | null
    desconto?: number | null
    id?: number
    id_envio_mercado_livre?: string | null
    id_seq?: number | null
    lucro?: number | null
    marketplace_id?: number | null
    marketplace_order_id?: string
    metodo_pagamento_id?: number | null
    status_pedido?: number | null
    taxa_marketplace?: number | null
    valor_frete?: number | null
    valor_total?: number
  }
  Relationships: [
    {
      foreignKeyName: "vendas_cliente_marketplace_id_fkey"
      columns: ["cliente_marketplace_id"]
      isOneToOne: false
      referencedRelation: "clientes"
      referencedColumns: ["marketplace_cliente_id"]
    },
    {
      foreignKeyName: "vendas_marketplace_id_fkey"
      columns: ["marketplace_id"]
      isOneToOne: false
      referencedRelation: "marketplaces"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "vendas_metodo_pagamento_id_fkey"
      columns: ["metodo_pagamento_id"]
      isOneToOne: false
      referencedRelation: "metodos_pagamento"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "vendas_status_pedido_fkey"
      columns: ["status_pedido"]
      isOneToOne: false
      referencedRelation: "status_geral"
      referencedColumns: ["id"]
    }
  ]
}
