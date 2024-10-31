export type RastreioDevolucoes = {
  Row: {
    codigo_rastreamento: string | null
    data_atualizacao: string
    data_estimada_entrega: string | null
    devolucao_id: number | null
    id: number
    localizacao: string | null
    status_id: number | null
    transportadora_id: number | null
  }
  Insert: {
    codigo_rastreamento?: string | null
    data_atualizacao: string
    data_estimada_entrega?: string | null
    devolucao_id?: number | null
    id?: number
    localizacao?: string | null
    status_id?: number | null
    transportadora_id?: number | null
  }
  Update: {
    codigo_rastreamento?: string | null
    data_atualizacao?: string
    data_estimada_entrega?: string | null
    devolucao_id?: number | null
    id?: number
    localizacao?: string | null
    status_id?: number | null
    transportadora_id?: number | null
  }
  Relationships: [
    {
      foreignKeyName: "rastreio_devolucoes_devolucao_id_fkey"
      columns: ["devolucao_id"]
      isOneToOne: false
      referencedRelation: "devolucoes_vendas"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "rastreio_devolucoes_transportadora_id_fkey"
      columns: ["transportadora_id"]
      isOneToOne: false
      referencedRelation: "transportadoras"
      referencedColumns: ["id"]
    }
  ]
}
