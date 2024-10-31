export type AnunciosMarketplace = {
  Row: {
    descricao: string | null
    id: number
    marketplace_anuncio_id: string | null
    marketplace_id: number | null
    preco: number | null
    sku: string | null
    sku_produto: string | null
    status: string | null
  }
  Insert: {
    descricao?: string | null
    id?: never
    marketplace_anuncio_id?: string | null
    marketplace_id?: number | null
    preco?: number | null
    sku?: string | null
    sku_produto?: string | null
    status?: string | null
  }
  Update: {
    descricao?: string | null
    id?: never
    marketplace_anuncio_id?: string | null
    marketplace_id?: number | null
    preco?: number | null
    sku?: string | null
    sku_produto?: string | null
    status?: string | null
  }
  Relationships: [
    {
      foreignKeyName: "anuncios_marketplace_marketplace_id_fkey"
      columns: ["marketplace_id"]
      isOneToOne: false
      referencedRelation: "marketplaces"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "anuncios_marketplace_sku_produto_fkey"
      columns: ["sku_produto"]
      isOneToOne: false
      referencedRelation: "produtos"
      referencedColumns: ["sku"]
    }
  ]
}
