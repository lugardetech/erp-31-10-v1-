export type Produtos = {
  Row: {
    categoria: string | null
    data_atualizacao: string | null
    data_criacao: string | null
    descricao: string | null
    estoque: number | null
    fornecedor_id: number | null
    id: number
    imagem: string | null
    nome: string
    preco: number | null
    sku: string
  }
  Insert: {
    categoria?: string | null
    data_atualizacao?: string | null
    data_criacao?: string | null
    descricao?: string | null
    estoque?: number | null
    fornecedor_id?: number | null
    id?: number
    imagem?: string | null
    nome: string
    preco?: number | null
    sku: string
  }
  Update: {
    categoria?: string | null
    data_atualizacao?: string | null
    data_criacao?: string | null
    descricao?: string | null
    estoque?: number | null
    fornecedor_id?: number | null
    id?: number
    imagem?: string | null
    nome?: string
    preco?: number | null
    sku?: string
  }
  Relationships: [
    {
      foreignKeyName: "produtos_fornecedor_id_fkey"
      columns: ["fornecedor_id"]
      isOneToOne: false
      referencedRelation: "fornecedores"
      referencedColumns: ["id"]
    }
  ]
}
