export type VendasMercadoLivre = {
  Row: {
    data: string | null
    frete: number | null
    id_anuncio: string | null
    order_id_ml: string
    receita_unitaria: number | null
    reembolso_frete: number | null
    reembolsos: number | null
    SKU: string | null
    status: string | null
    taxa_ml: number | null
    total: number | null
    unidades_vendidas: number | null
  }
  Insert: {
    data?: string | null
    frete?: number | null
    id_anuncio?: string | null
    order_id_ml: string
    receita_unitaria?: number | null
    reembolso_frete?: number | null
    reembolsos?: number | null
    SKU?: string | null
    status?: string | null
    taxa_ml?: number | null
    total?: number | null
    unidades_vendidas?: number | null
  }
  Update: {
    data?: string | null
    frete?: number | null
    id_anuncio?: string | null
    order_id_ml?: string
    receita_unitaria?: number | null
    reembolso_frete?: number | null
    reembolsos?: number | null
    SKU?: string | null
    status?: string | null
    taxa_ml?: number | null
    total?: number | null
    unidades_vendidas?: number | null
  }
  Relationships: []
}
