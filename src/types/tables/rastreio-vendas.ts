export type RastreioVendas = {
  Row: {
    codigo_rastreamento: string | null
    data_atualizacao: string
    data_estimada_entrega: string | null
    id: number
    localizacao: string | null
    status_id: number | null
    transportadora_id: number | null
    venda_id: number | null
  }
  Insert: {
    codigo_rastreamento?: string | null
    data_atualizacao: string
    data_estimada_entrega?: string | null
    id?: number
    localizacao?: string | null
    status_id?: number | null
    transportadora_id?: number | null
    venda_id?: number | null
  }
  Update: {
    codigo_rastreamento?: string | null
    data_atualizacao?: string
    data_estimada_entrega?: string | null
    id?: number
    localizacao?: string | null
    status_id?: number | null
    transportadora_id?: number | null
    venda_id?: number | null
  }
  Relationships: [
    {
      foreignKeyName: "rastreio_vendas_transportadora_id_fkey"
      columns: ["transportadora_id"]
      isOneToOne: false
      referencedRelation: "transportadoras"
      referencedColumns: ["id"]
    }
  ]
}
