export type RastreioCompras = {
  Row: {
    codigo_rastreamento: string | null
    compra_id: number | null
    data_atualizacao: string
    data_estimada_entrega: string | null
    frete: number | null
    id: number
    imposto_importacao: number | null
    localizacao: string | null
    status_id: number | null
    transportadora_id: number | null
  }
  Insert: {
    codigo_rastreamento?: string | null
    compra_id?: number | null
    data_atualizacao: string
    data_estimada_entrega?: string | null
    frete?: number | null
    id?: number
    imposto_importacao?: number | null
    localizacao?: string | null
    status_id?: number | null
    transportadora_id?: number | null
  }
  Update: {
    codigo_rastreamento?: string | null
    compra_id?: number | null
    data_atualizacao?: string
    data_estimada_entrega?: string | null
    frete?: number | null
    id?: number
    imposto_importacao?: number | null
    localizacao?: string | null
    status_id?: number | null
    transportadora_id?: number | null
  }
  Relationships: [
    {
      foreignKeyName: "rastreio_compras_compra_id_fkey"
      columns: ["compra_id"]
      isOneToOne: false
      referencedRelation: "compras"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "rastreio_compras_transportadora_id_fkey"
      columns: ["transportadora_id"]
      isOneToOne: false
      referencedRelation: "transportadoras"
      referencedColumns: ["id"]
    }
  ]
}
