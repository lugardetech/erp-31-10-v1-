export type TaxasMarketplace = {
  Row: {
    descricao: string | null
    id: number
    tipo_taxa: string
    valor_taxa: number
    venda_id: number | null
  }
  Insert: {
    descricao?: string | null
    id?: number
    tipo_taxa: string
    valor_taxa: number
    venda_id?: number | null
  }
  Update: {
    descricao?: string | null
    id?: number
    tipo_taxa?: string
    valor_taxa?: number
    venda_id?: number | null
  }
  Relationships: []
}
