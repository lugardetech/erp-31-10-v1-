export type AtendimentosClientes = {
  Row: {
    cliente_id: number | null
    data_atendimento: string | null
    descricao: string
    id: number
    id_reclamacao_marketplace: string | null
    id_venda_marketplace: string | null
    marketplace_id: number | null
    status: string
    tipo_atendimento: string
  }
  Insert: {
    cliente_id?: number | null
    data_atendimento?: string | null
    descricao: string
    id?: number
    id_reclamacao_marketplace?: string | null
    id_venda_marketplace?: string | null
    marketplace_id?: number | null
    status: string
    tipo_atendimento: string
  }
  Update: {
    cliente_id?: number | null
    data_atendimento?: string | null
    descricao?: string
    id?: number
    id_reclamacao_marketplace?: string | null
    id_venda_marketplace?: string | null
    marketplace_id?: number | null
    status?: string
    tipo_atendimento?: string
  }
  Relationships: [
    {
      foreignKeyName: "atendimentos_clientes_cliente_id_fkey"
      columns: ["cliente_id"]
      isOneToOne: false
      referencedRelation: "clientes"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "atendimentos_clientes_id_venda_marketplace_fkey"
      columns: ["id_venda_marketplace"]
      isOneToOne: false
      referencedRelation: "vendas"
      referencedColumns: ["marketplace_order_id"]
    },
    {
      foreignKeyName: "atendimentos_clientes_marketplace_id_fkey"
      columns: ["marketplace_id"]
      isOneToOne: false
      referencedRelation: "marketplaces"
      referencedColumns: ["id"]
    }
  ]
}
