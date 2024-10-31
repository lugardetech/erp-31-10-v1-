export type Clientes = {
  Row: {
    bairro: string | null
    cep: string | null
    cidade: string | null
    cpf: string | null
    email: string | null
    estado: string | null
    id: number
    marketplace_cliente_id: string | null
    marketplace_id: number | null
    nome: string
    numero_rua: string | null
    rua: string | null
    telefone: string | null
  }
  Insert: {
    bairro?: string | null
    cep?: string | null
    cidade?: string | null
    cpf?: string | null
    email?: string | null
    estado?: string | null
    id?: number
    marketplace_cliente_id?: string | null
    marketplace_id?: number | null
    nome: string
    numero_rua?: string | null
    rua?: string | null
    telefone?: string | null
  }
  Update: {
    bairro?: string | null
    cep?: string | null
    cidade?: string | null
    cpf?: string | null
    email?: string | null
    estado?: string | null
    id?: number
    marketplace_cliente_id?: string | null
    marketplace_id?: number | null
    nome?: string
    numero_rua?: string | null
    rua?: string | null
    telefone?: string | null
  }
  Relationships: [
    {
      foreignKeyName: "clientes_marketplace_id_fkey"
      columns: ["marketplace_id"]
      isOneToOne: false
      referencedRelation: "marketplaces"
      referencedColumns: ["id"]
    }
  ]
}
