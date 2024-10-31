export type ItensCompras = {
  Row: {
    compra_id: number | null
    id: number
    preco_unitario: number
    produto_id: number | null
    quantidade: number
  }
  Insert: {
    compra_id?: number | null
    id?: number
    preco_unitario: number
    produto_id?: number | null
    quantidade: number
  }
  Update: {
    compra_id?: number | null
    id?: number
    preco_unitario?: number
    produto_id?: number | null
    quantidade?: number
  }
  Relationships: [
    {
      foreignKeyName: "itens_compras_compra_id_fkey"
      columns: ["compra_id"]
      isOneToOne: false
      referencedRelation: "compras"
      referencedColumns: ["id"]
    }
  ]
}
