import { Json } from "../json"

export type ReclamacoesMercadoLivre = {
  Row: {
    acoes_disponiveis: Json | null
    cliente_id: number | null
    data_atendimento: string | null
    descricao: string | null
    etapa: string | null
    id: number
    id_reclamacao_marketplace: string | null
    id_venda_marketplace: string | null
    marketplace_id: number | null
    motivo_id: string | null
    resolucao: string | null
    status: string | null
    tipo: string | null
    tipo_atendimento: string | null
    tipo_quantidade: string | null
  }
  Insert: {
    acoes_disponiveis?: Json | null
    cliente_id?: number | null
    data_atendimento?: string | null
    descricao?: string | null
    etapa?: string | null
    id?: number
    id_reclamacao_marketplace?: string | null
    id_venda_marketplace?: string | null
    marketplace_id?: number | null
    motivo_id?: string | null
    resolucao?: string | null
    status?: string | null
    tipo?: string | null
    tipo_atendimento?: string | null
    tipo_quantidade?: string | null
  }
  Update: {
    acoes_disponiveis?: Json | null
    cliente_id?: number | null
    data_atendimento?: string | null
    descricao?: string | null
    etapa?: string | null
    id?: number
    id_reclamacao_marketplace?: string | null
    id_venda_marketplace?: string | null
    marketplace_id?: number | null
    motivo_id?: string | null
    resolucao?: string | null
    status?: string | null
    tipo?: string | null
    tipo_atendimento?: string | null
    tipo_quantidade?: string | null
  }
  Relationships: [
    {
      foreignKeyName: "reclamacoes_mercado_livre_cliente_id_fkey"
      columns: ["cliente_id"]
      isOneToOne: false
      referencedRelation: "clientes"
      referencedColumns: ["id"]
    }
  ]
}
